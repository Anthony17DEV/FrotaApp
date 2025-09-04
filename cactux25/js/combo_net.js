/*
2017-03-28
	- NA FUNCAO FECHA_COMBO_NET EU ADICIONEI A LINHA QUE RETORNA O OVERLOW PARA AUTO
2017-05-31
	- na funcao combo_net alterei o if que criava o combo_net trava. agora ele cria usando 
	as funcoes padroes do js e nao via string
*/

var COMBO_ESCONDIDO = new Array();
var COMBO_NET_FOCO;


/*********************************\
|*  Função combo_net
|*
\*********************************/


function combo_net(nome, exibe_combo) {


//	var w=window;
//	var d=document;	
//	var y_atual = (w.pageYOffset ? w.pageYOffset : d.scrollTop ? d.scrollTop : d.body.scrollTop);

	var y_atual = 0;
//	alert(y_atual);

//	alert('entrou8');
	
	esconde_combo();
	
	$('html').style.overflow='hidden';
	// trava a janela para nao criar barra de rolagem
	
	e = window.document.getElementById('combo_net_trava_'+nome);
	if( e == null ) {
//		comp = "<div id=combo_net_trava_"+nome+" class=combo_net_trava>&nbsp;</div>";
//		document.body.innerHTML += comp;

		ifrm = document.createElement("DIV");
		ifrm.setAttribute("id", "combo_net_trava_"+(nome));
		ifrm.setAttribute("class", "combo_net_trava");
		document.body.appendChild(ifrm);
	} // cria o div que trava a janela ao fundo, caso nao exista

	
	$('combo_net_trava_'+nome).style.top=0+y_atual;
	$('combo_net_trava_'+nome).style.left=0;
	$('combo_net_trava_'+nome).style.zIndex=10;
	$('combo_net_trava_'+nome).style.display='block';
	$('combo_net_trava_'+nome).style.height=(screen.availHeight+y_atual)+'px';
//	$('combo_net_trava').style.height=(screen.availHeight)+'px';
	$('combo_net_trava_'+nome).style.width='150%';
	// seta o div atras para travar a janela

	COMBO_NET_FOCO = nome;


	tam_top = centraliza_janela('top',nome) // centraliza a janela do combo
	tam_left = centraliza_janela('left',nome) // centraliza a janela do combo
	
	$('div_'+nome).style.top=(tam_top+y_atual)+'px';
	$('div_'+nome).style.left=tam_left+'px';
	
	$('div_'+nome).style.display='block';
	$('div_'+nome).style.zIndex=100;
	
	
	foco_combo_net(nome);
	
//	setTimeout("window.frames['frame_"+nome+"'].document.forms[0].elements[3].focus()",400);
//	setTimeout("foco_combo_net('"+nome+"')",500);
	
	//alert("window.frames['frame_"+nome+"'].document.forms[0].elements[3].focus()");
}

function foco_combo_net(nome) {

// FUNCAO PARA DAR O FOCO NO FORMULARIO DENTRO DO IFRAME DO COMBO_NET
// TESTA SE O FORMULARIO JÁ ESTÁ ATIVADO, CASO NÃO ESTEJA, ESPERA 500 MS E TESTA NOVAMENTE


	if( window.frames['frame_'+nome].document.forms[0] ) {

		var t = window.frames['frame_'+nome].document.forms[0].elements.length;
		
		for(i=0; i!=t; i++) {
			
			if( window.frames['frame_'+nome].document.forms[0].elements[i].type == 'text' ) {
				window.frames['frame_'+nome].document.forms[0].elements[i].focus();
				break;
			}
		}	
	
	
	} else {
	
		setTimeout("foco_combo_net('"+nome+"')",500);
	
	}

	
}


function fecha_combo_net_teclado(event) {


	if(event.keyCode){
		key = event.keyCode;
	}else{
		if(event.which) key = event.which;
	} // resolve a tecla entrada


	if( key == 27 ) 
		fecha_combo_net();

/*
	var whichCode = (window.event) ? event.which : event.keyCode;

	if( whichCode == 27 ) 
		fecha_combo_net();
*/
}


function fecha_combo_net() {

	
	nome = window.parent.COMBO_NET_FOCO;
	// acha qual janela esta com o foco

	window.parent.$('html').style.overflow='auto';
	
	window.parent.$('combo_net_trava_'+nome).style.display='none';
	// esconde o div que trava a janela

	exibe_combo();
	// exibe os comos que estavam escondidos por causa do div que trava a janela
	
	window.parent.$('div_'+nome).style.display='none';
	// esconde a janela
	
	window.parent.$('nome_'+nome).focus();
	// da foco ao campo
	
}


function seleciona_combo_net(id,nome) {

	janela = window.parent.COMBO_NET_FOCO;
	// acha qual janela esta com o foco

	window.parent.$(janela).value=id;
	window.parent.$('nome_'+janela).value=nome;
	window.parent.$('orig_'+janela).value=nome;
	
	fecha_combo_net();
	
}


function combo_net_teclado(nome) {

	var whichCode = (window.Event) ? event.which : event.keyCode;

	
	$('nome_'+nome).value = $('orig_'+nome).value;
	if( whichCode == 32 ) 
		combo_net(nome);


}

function exibe_combo() {

	var t_campos = parent.COMBO_ESCONDIDO.length;

	if( t_campos > 0 ) {
		
		for(i=0; i!=t_campos; i++) {
			
			form = parent.COMBO_ESCONDIDO[i].form;
			id = parent.COMBO_ESCONDIDO[i].id;
			
			window.parent.document.forms[form].elements[id].style.visibility='';	
			
		}
	}
}

function esconde_combo() {

	t_form = document.forms.length;
	
	for(i=0; i!=t_form; i++) {
		
		t_elementos = document.forms[i].elements.length;
		
		for(j=0; j!=t_elementos; j++) {
			
			if(	document.forms[i].elements[j].type == 'select-one' ||  
				document.forms[i].elements[j].type == 'submit' 	) {
				
				document.forms[i].elements[j].style.visibility='hidden';
				COMBO_ESCONDIDO[COMBO_ESCONDIDO.length] = { form:i, id:j};
				
			} // se for um combo
		}
	} // varre os formularios procurando por combos para sumir
}


/**************************************************\
|* centraliza_janela()
|*
|* funcao para calcular a posicao centralizada da janela
|* tipo eh "top" ou "Left" e o nome eh o nome da janela (combo_net)
|*
\**************************************************/

function centraliza_janela(tipo,nome) {

	// iframe1 porque sempre sera aberto e todos os outros iframes terao o mesmo tamanho, assim da pra saber o tamanho total da janela

	if( tipo == 'left' ) {
		
		tam_total = window.parent.$('iframe1').style.width;
		t_tam = window.parent.$('iframe1').style.width.length-2;
		total_janela = window.parent.$('iframe1').style.width.substr(0,t_tam);
		
		$('frame_'+nome).width = (total_janela-80)+'px';
		// seta o tamanho da janela
		
//		total_combo = $('frame_'+nome).width;
		total_combo = (total_janela-80);
		tam_left = (total_janela/2) - (total_combo/2);
		// calcula o tamanho left
		
		return tam_left;
		
	} else {	
		
		tam_total = window.parent.$('iframe1').style.height;
		t_tam = window.parent.$('iframe1').style.height.length-2;
		total_janela = window.parent.$('iframe1').style.height.substr(0,t_tam);
		
		$('frame_'+nome).height = (total_janela-50)+'px';
		// seta o tamanho da janela
		
//		total_combo = $('frame_'+nome).height;
		total_combo = (total_janela-50);
		tam_top = (total_janela/2) - (total_combo/2);
		
		return tam_top;
	}
	
}

