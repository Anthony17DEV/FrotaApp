/*
2017-03-28
	- NA FUNCAO FECHA_COMBO_NET EU ADICIONEI A LINHA QUE RETORNA O OVERLOW PARA AUTO
2017-05-31
	- na funcao combo_net alterei o if que criava o combo_net trava. agora ele cria usando 
	as funcoes padroes do js e nao via string
2020-03-13
	- na funcao centraliza_janela alterei as variaveis e agora esta pegando o tamanho da tela
	- usei try catch em algumas funcoes que travavam. agora nao travam mais
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
	
	try{
		window.document.getElementById('html').style.overflow='hidden';
	} catch(err) {
  		console.log('ERRO AO CARREGAR COMBONET '+err.message);
	}
	// trava a janela para nao criar barra de rolagem
	
	e = window.document.getElementById('combo_net_trava_'+nome);
	if( e == null ) {
//		comp = "<div id=combo_net_trava_"+nome+" class=combo_net_trava>&nbsp;</div>";
//		document.body.innerHTML += comp;

		ifrm = document.createElement("DIV");
		ifrm.setAttribute("id", "combo_net_trava_"+(nome));
		ifrm.setAttribute("class", "combo_net_trava");
		window.document.body.appendChild(ifrm);
	} // cria o div que trava a janela ao fundo, caso nao exista

	
	window.document.getElementById('combo_net_trava_'+nome).style.top=0+y_atual;
	window.document.getElementById('combo_net_trava_'+nome).style.left=0;
	window.document.getElementById('combo_net_trava_'+nome).style.zIndex=10;
	window.document.getElementById('combo_net_trava_'+nome).style.display='block';
	window.document.getElementById('combo_net_trava_'+nome).style.height=(screen.availHeight+y_atual)+'px';
//	window.document.getElementById('combo_net_trava').style.height=(screen.availHeight)+'px';
	window.document.getElementById('combo_net_trava_'+nome).style.width='150%';
	// seta o div atras para travar a janela

	COMBO_NET_FOCO = nome;


	tam_top = centraliza_janela('top',nome) // centraliza a janela do combo
	tam_left = centraliza_janela('left',nome) // centraliza a janela do combo
	
	window.document.getElementById('div_'+nome).style.top=(tam_top+y_atual)+'px';
	window.document.getElementById('div_'+nome).style.left=tam_left+'px';
	
	window.document.getElementById('div_'+nome).style.display='block';
	window.document.getElementById('div_'+nome).style.zIndex=100;
	
	
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

	try{ 
	window.parent.window.document.getElementById('html').style.overflow='auto';
	} catch(err) {
  		console.log('ERRO AO CARREGAR COMBONET '+err.message);
	}

	
	window.parent.window.document.getElementById('combo_net_trava_'+nome).style.display='none';
	// esconde o div que trava a janela

	exibe_combo();
	// exibe os comos que estavam escondidos por causa do div que trava a janela
	
	window.parent.window.document.getElementById('div_'+nome).style.display='none';
	// esconde a janela
	
	window.parent.window.document.getElementById('nome_'+nome).focus();
	// da foco ao campo
	
}


function seleciona_combo_net(id,nome) {

	janela = window.parent.COMBO_NET_FOCO;
	// acha qual janela esta com o foco

	window.parent.window.document.getElementById(janela).value=id;
	window.parent.window.document.getElementById('nome_'+janela).value=nome;
	window.parent.window.document.getElementById('orig_'+janela).value=nome;
	
	fecha_combo_net();
	
}


function combo_net_teclado(nome) {

	var whichCode = (window.Event) ? event.which : event.keyCode;

	
	window.document.getElementById('nome_'+nome).value = window.document.getElementById('orig_'+nome).value;
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
		
		//tam_total = window.parent.window.document.getElementById('iframe1').style.width;
		
	
		//t_tam = window.parent.window.document.getElementById('iframe1').style.width.length-2;
		//total_janela = window.parent.window.document.getElementById('iframe1').style.width.substr(0,t_tam);
	
		//console.log(t_tam+' -> '+total_janela+' -> '+screen.width);

		//total_janela = screen.width - 335;
		total_janela = window.innerWidth;
		window.document.getElementById('frame_'+nome).width = (total_janela-80)+'px';
		// seta o tamanho da janela
		
//		total_combo = window.document.getElementById('frame_'+nome).width;
		total_combo = (total_janela-80);
		tam_left = (total_janela/2) - (total_combo/2);
		// calcula o tamanho left
		
		return tam_left;
		
	} else {	
		
		//tam_total = window.parent.window.document.getElementById('iframe1').style.height;
		//t_tam = window.parent.window.document.getElementById('iframe1').style.height.length-2;
		//total_janela = window.parent.window.document.getElementById('iframe1').style.height.substr(0,t_tam);
		
		//console.log(total_janela +' -> '+screen.height);
		//alert( window.innerHeight +' ->  '+ screen.height);
		total_janela = window.innerHeight;
		
		window.document.getElementById('frame_'+nome).height = (total_janela-25)+'px';
		// seta o tamanho da janela
		
//		total_combo = window.document.getElementById('frame_'+nome).height;
		total_combo = (total_janela-25);
		tam_top = (total_janela/2) - (total_combo/2);
		
		//tam_top = 5;
		
		return tam_top;
	}
	
}

