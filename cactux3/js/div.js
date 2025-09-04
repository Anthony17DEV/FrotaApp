var POSICAO_FOCO_DIV=0;


// colocar um <B> na frente da linha que esta ativa
function trata_seta(nome) {

	var conteudo = $('div_'+nome).innerHTML;
	var ret='';
	var linha = conteudo.split('<BR>');
	
	for(i=0; i<linha.length-1; i++) {
		
		if( linha[i].substr(0,3) == '<B>' ) {		
			
			t = linha[i].length;
			linha[i] = linha[i].substr(3,t-3-4); // retira o <B> e o </B>
		} // se a linha já tiver um <B> então remove
		
		cod_i = linha[i].indexOf(':');		
		
		if( i == POSICAO_FOCO_DIV )
			ret = ret + "<B>"+linha[i].substr(cod_i)+"</B><BR>";
		else 
			ret = ret + linha[i] +"<BR>";
		
	} // percorre todas as linhas do retorno
	
	$('div_'+nome).innerHTML = ret;
}
	
// combo_div

function abre_div2(form, nome) {

	document.getElementById('div_'+nome).style.display='block';	
	$('frame_interno').onreadystatechange=teste_div2;
	// exibe o div
	
	
	
}

function fecha_div2(form, nome,fecha) {

	if( fecha==0)
		setTimeout("fecha_div2('"+form+"','"+nome+"',1)",300);
	else {
		document.getElementById('div_'+nome).style.display='none';
		
		POSICAO_FOCO_DIV = 0; // zera a posicao do div
		
		// não precisa mais conferir se o registor existe porque essa verificação é feita no validaForm
	} // espera 200 milesegundos e fecha o div

}

function envia_div2(arq, form, nome) {

	var ENTROU=0;

	abre_div2(form,nome);

	var linha = $('div_'+nome).innerHTML.split('<BR>');
	//var linha = conteudo

	
	var e = window.event;

	if(e.keyCode){
		key = e.keyCode;
	}else{
		if(e.which) key = e.which;
	}
	
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
	}
	
	if (ENTROU==1) {
		
		trata_seta(nome);
		
	} else {
		
		var v = eval('document.'+form+'.nome_'+nome+'.value');
		//pega o valor digitado no text
		arq += ( arq.indexOf('?') == -1 )?'?':'&'; 	//if( arq.indexOf('?') == -1 ) arq += '?'; else arq += '&';
		// caso já houve um argumento usa &  senao usa ? mesmo
		$('frame_interno').src=arq+'busca='+v+'&form='+form+'&campo='+nome;
		//document.getElementById('frame_interno').src=arq+'?busca='+v+'&form='+form+'&campo='+nome;
		
		// metodo GET
		
	}
	
	
}

function teste_div2() {

	
//window.status = $('frame_interno').readyState;

	if( $('frame_interno').readyState == 'complete' ) {
		var nome = window.frames['frame_interno'].document.getElementById('lala').innerHTML;
		var form = 'cadastro';
		var campo = 'div_lele';
		var ret='';
		
		var linha = nome.split('<BR>');
			
		for(i=0; i<linha.length-1; i++) {
		
		
		if( i == 0 )
			ret = ret + "<B>"+linha[i]+"</B><BR>";
		else
			ret = ret +linha[i]+"<BR>";
		}
		
		eval("window.parent.document.getElementById('"+campo+"').innerHTML='"+ret+"'");
		//eval("$('"+campo+"').innerHTML='"+nome+"'");
	}
	
	
}

function envia_div_sel2(arq, form, nome) {

	var e = window.event;

	if(e.keyCode) {
		key = e.keyCode;
	} else {
		if(e.which) key = e.which;
	}

	if( key == 13 ) {
		
		var conteudo = $('div_'+nome).innerHTML;
		var ret_nome='';
		var ret_cod='';
		var ret='';
		var linha = conteudo.split('<BR>');
		
		for(i=0; i<linha.length-1; i++) {
			
			if( i == POSICAO_FOCO_DIV ) {
				
				t = linha[i].length;
				ret = linha[i].substr(3,t-3-4); // retira o <B> e o </B>
				
				t = ret.length;
				cod_i = ret.indexOf(':');
				
				cod = ret.substr(0,cod_i);
				ret_nome = ret.substr(cod_i+1,t); // +1 por causa dos :
				
				break;
			} 
			
		} // acha a linha correta
		
		eval('window.parent.document.'+form+'.'+nome+'.value='+cod);
		eval('window.parent.document.'+form+'.nome_'+nome+'.value=\''+ret_nome+'\'');
		eval('window.parent.document.'+form+'.orig_'+nome+'.value=\''+ret_nome+'\'');
		
		fecha_div2(form, nome,1);
		
		return false;
	} else
		return true;
	

}





// combo_div

function abre_div(form, nome) {


	var tam = eval('document.'+form+'.nome_'+nome+'.offsetWidth');

	document.getElementById('frame_'+nome).width=tam;	
	// ajusta o tamanho do div pra o mesmo do text que chamou

	document.getElementById('div_'+nome).style.display='block';	
	// exibe o div
	
	//frame_interno();
	
	
	//alert(eval('window.parent.document.'+form+'.valor.focus()');

}

function fecha_div(form, nome,fecha) {

	
	var c1 = eval('document.'+form+'.nome_'+nome+'.value');
	var c2 = eval('document.'+form+'.orig_'+nome+'.value');


	if( fecha==0)
		setTimeout("fecha_div('"+form+"','"+nome+"',1)",200);
	else {
		document.getElementById('div_'+nome).style.display='none';
		
		// não precisa mais conferir se o registor existe porque essa verificação é feita no validaForm
	} // espera 200 milesegundos e fecha o div

}

function envia_div(arq, form, nome) {

//	abre_div(form,nome);


	var v = eval('document.'+form+'.nome_'+nome+'.value');
	//pega o valor digitado no text
	
	arq += ( arq.indexOf('?') == -1 )?'?':'&'; 	//if( arq.indexOf('?') == -1 ) arq += '?'; else arq += '&';
	// caso já houve um argumento usa &  senao usa ? mesmo

	
	document.getElementById('frame_'+nome).src=arq+'busca='+v+'&form='+form+'&campo='+nome;
	//document.getElementById('frame_interno').src=arq+'?busca='+v+'&form='+form+'&campo='+nome;
	
	//document.getElementById('div_teste').innerHTML='lalalalala';
	// metodo GET


	
}

function sel_texto(nome,form,campo) {

	eval("window.parent.document."+form+"."+campo+".value='"+nome+"'");

	//alert(nome+' '+form+' '+campo+' - '+'window.parent.document.'+form+'.'+campo+'.value='+nome);
	
} // funcao para retornar um valor para uma caixa de texto

function sel_combo(nome,form,campo) {

	eval("var combo = window.parent.document."+form+"."+campo);
	
	var tam = combo.options.length;
	for(i=0; i!=tam; i++) {
		
		if( combo.options[i].text == nome ) {
			combo.selectedIndex = i;
            break;
		}
	}
	//combo.options[tam+1] = new Option(nome,id);
	
	
} // funcao para retornar um valor para uma caixa de texto


function sel_div(id,nome,form,campo) {

	eval('window.parent.document.'+form+'.'+campo+'.value='+id);
	eval('window.parent.document.'+form+'.nome_'+campo+'.value=\''+nome+'\'');
	eval('window.parent.document.'+form+'.orig_'+campo+'.value=\''+nome+'\'');
	eval('window.parent.document.'+form+'.nome_'+campo+'.select()');
//	eval('window.parent.document.'+form+'.valor.focus()');
//	eval('window.parent.document.'+form+'.nome_'+campo+'.focus()');
	
/*
	e = eval('window.parent.document.'+form+'.elements');
	for(i=0; i!=e.length; i++) {
		if( e[i].name == campo ) {
			
			for(j=1; j!=e.length; j++) {
				if( e[i+j].type != 'hidden' ) {
					p = i+j;
					break;
				}
				
			} // procura pelo proximo elemento pra dar foco
			
			if( p )
				break;
			
		} //procura o elemento atual
		
	} // varre o formulario a procura do proximo elemento
*/	
	//e[p].focus();
	
	//this.focus();
	
	//alert('aaa');
	
	// isso tudo eh pra mudar o foco pra o proximo elemento pq se o foco permanecer nesse text depois do usuario ter clickado no iframe o div nao abre mais
	
	

}

	
function set_tamanho_div(nome,tam) {

	document.getElementById('frame_'+nome).height=(tam);
	// ajusta o tamanho do iframe
}


function tamanho_div(nome) {

	var t = document.getElementById('tab_interna').offsetHeight;
	window.parent.set_tamanho_div(nome,t);
}



function envia_div_sel(arq, form, nome) {

	var e = window.event;

	if(e.keyCode){
		key = e.keyCode;
	}else{
		if(e.which) key = e.which;
	}

	if( key == 13 ) {

		var v = eval('document.'+form+'.nome_'+nome+'.value');
		arq += ( arq.indexOf('?') == -1 )?'?':'&'; 	//if( arq.indexOf('?') == -1 ) arq += '?'; else arq += '&';
		document.getElementById('frame_'+nome).src=arq+'busca='+v+'&form='+form+'&campo='+nome+'&sel=1';
		// faz a requisicao e passa a variavel sel=1 pra selecionar o primeiro registro que encontrar!
		return false;
	} else
		return true;
	

}
