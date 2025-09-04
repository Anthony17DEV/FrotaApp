

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

function sel_div(id,nome,form,campo) {

	eval('window.parent.document.'+form+'.'+campo+'.value='+id);
	eval('window.parent.document.'+form+'.nome_'+campo+'.value=\''+nome+'\'');
	eval('window.parent.document.'+form+'.orig_'+campo+'.value=\''+nome+'\'');
//	eval('window.parent.document.'+form+'.valor.focus()');
//	eval('window.parent.document.'+form+'.nome_'+campo+'.focus()');
	

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
	
	e[p].focus();
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
