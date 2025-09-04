	var POSICAO_FOCO_DIV=0; // variavel que ira controlar a posicao de foco dentro do div
	var COMBO_NOVO_ID; // variavel que ira conter os id carregados no div
	var COMBO_NOVO_NOME; // variavel que ira conter os nomes carregados no div




	function combo_novo(campo,valor,arq,event) {
		
		// alert('asdf2');
		var ENTROU=0;
		var linha = window.document.getElementById('nova_div_'+campo).innerHTML.split('<br>');
		//var linha = conteudo da div
		
			
//		var e = window.event;
		if(event.keyCode){
			key = event.keyCode;
		}else{
			if(event.which) key = event.which;
		} // resolve a tecla entrada
//alert(key);
		switch( key ) {
			case 40: 
				if( POSICAO_FOCO_DIV < linha.length-2 ) {
					POSICAO_FOCO_DIV++; 
				}
				ENTROU=1; 
			break;
			case 38: 
				if( POSICAO_FOCO_DIV > 0 ) {
					POSICAO_FOCO_DIV--; 
				}
				ENTROU=1; 
			break;
			case 119: 
				combo_novo_fecha(campo,1);
				combo_net(campo);
			break; 	// SE APERTAR O F8 ENTÃO CHAMA A JANELA DO COMBO_NET
			case 127:
			case 8:
			
				if( valor == '' ) {
					combo_novo_sel(campo,'','');
				} 
			break;// SE APERTAR O BACKSPACE OU O DELETE E O CMAPO ESTIVER EM BRANCO ENTAO APAGA O QUE TIVER
			case 27:
					combo_novo_sel(campo,'','');
			break; // SE APERTAR ESC LIMPA A BUSCA. SE APERTAR NOVAMENTE ZERA A BUSCA
			
		}

		if (ENTROU==1) {
			
			combo_novo_seta_teclado(campo);
			
		} else {
			arq += ( arq.indexOf('?') == -1 )?'?':'&'; 
			// caso já houve um argumento usa &  senao usa ? mesmo	
			//alert(arq+'campo='+campo+'&busca='+valor);		
			frame_interno(arq+'campo='+campo+'&busca='+valor);

		}
		
		
	}
	
	function combo_novo_fecha(nome,confirma) {
		
		if( confirma == 0 ) {
			
			setTimeout("combo_novo_fecha('"+nome+"',1)",300);
			
		} else {
			
			window.document.getElementById('nova_div_'+nome).style.display='none';
			window.document.getElementById('nome_'+nome).value=window.document.getElementById('orig_'+nome).value;
			
		}
		
	}
	
	function combo_novo_abre(nome) {
		
		window.document.getElementById('nova_div_'+nome).style.display='block';
		
		
	}
	
		
	function combo_novo_sel(campo,id,nome) {
		
		window.document.getElementById(campo).value=id;
		window.document.getElementById('nome_'+campo).value=str_replace("%20"," ",nome);
		window.document.getElementById('orig_'+campo).value=str_replace("%20"," ",nome);
		window.document.getElementById('nome_'+campo).focus();
	}

	function combo_novo_sel_auto(campo,id,nome) {
		
		window.document.getElementById('orig_'+campo).value=str_replace("%20"," ",nome);
		window.document.getElementById(campo).value=id;
		
	}
	

	function combo_novo_seta_teclado(nome) {
		
		var IDS = COMBO_NOVO_ID.split('<cactux>');
		var NOMES = COMBO_NOVO_NOME.split('<cactux>');
		
		var conteudo = window.document.getElementById('nova_div_'+nome).innerHTML;
		var linha = conteudo.split('<br>');
		var ret='';
		
		for(i=0; i<linha.length-1; i++) {
//			alert(linha[i].substr(0,26) + ' -> '+ '<a class="combo_novo_ativo');
			if( linha[i].substr(0,26) == '<a class="combo_novo_ativo' ) {		
//			alert('entrou!');
				linha[i] = linha[i].replace('<a class="combo_novo_ativo','<a class="combo_novo_normal');
			} // se a linha estiver com ativo entao muda para o normal
			
			if( i == POSICAO_FOCO_DIV ) {		
				
				linha[i] = linha[i].replace('<a class="combo_novo_normal','<a class="combo_novo_ativo');
				combo_novo_sel(nome,IDS[i],NOMES[i]); // seleciona a nova linha ao passo que ativa a mesma
				
			} // se for a linha de foco, altera de normal para ativo
			
			
			ret += linha[i] + "<br>";
		} // percorre todas as linhas do retorno
		
		window.document.getElementById('nova_div_'+nome).innerHTML = ret;
	}

