
var timeout	= 2000;
var closetimer	= 0;
var ddmenuitem	= 0;
var ddmenuitem_sub	= 0;
var closetimer_sub	= 0;


// ABRE O MENU
function mopen(id) {	

	// CANCELA A ACAO DE FECHAR O MENU
	mcancelclosetime();
	mclose_sub();
	
	// FECHA O MENU ANTIGO
	if(ddmenuitem) {
		ddmenuitem.style.visibility = 'hidden';
		var id_ativo = ddmenuitem.id;
		document.getElementById(id_ativo+'_menu').className='';
		// MUDA O ESTILO DO MENU PARA DESATIVADO
	}
	
	document.getElementById(id+'_menu').className='menu_ativo';
	// MUDA O ESTILO DO MENU PARA ATIVADO

	ddmenuitem = document.getElementById(id);

	if( !document.getElementById('frame_fundo_menu') ) {
		document.body.innerHTML=document.body.innerHTML+"<iframe src='about:blank' frameborder=no id=frame_fundo_menu width=1 height=1 style='display:block; z-index:20; position:absolute; left:1px; top:1px' ></iframe>";
	}	// CRIA UM IFRAME PARA O FUNDO DO MENU, CASO NAO EXISTA AINDA
	
	// CARREGA AS INFORMACOES DO NOVO MENU
	var top = ddmenuitem.offsetTop;
	var left = ddmenuitem.offsetLeft;
	var width = ddmenuitem.offsetWidth;
	var height = ddmenuitem.offsetHeight;
	
	// POSICIONA O IFRAME SOB O MENU RECEM ABERTO
	document.getElementById('frame_fundo_menu').style.top = top+'px';
	document.getElementById('frame_fundo_menu').style.left = left+'px';
	document.getElementById('frame_fundo_menu').style.width = width+'px';
	document.getElementById('frame_fundo_menu').style.height = height+'px';
	document.getElementById('frame_fundo_menu').style.display = 'block';
	

	// EXIBE O NOVO MENU
	ddmenuitem.style.visibility = 'visible';

}


// FECHA O MENU
function mclose() {
	
	if(ddmenuitem) { 
		
		var id_ativo = ddmenuitem.id;
		document.getElementById(id_ativo+'_menu').className='';
		// MUDA O ESTILO DO MENU PARA DESATIVADO
		
		ddmenuitem.style.visibility = 'hidden'; 
		
		document.getElementById('frame_fundo_menu').style.display = 'none';
		
		if( ddmenuitem_sub ) {
			
			ddmenuitem_sub.style.visibility = 'hidden';
			
			if( ddmenuitem_sub.style.visibility == 'visible' ) {
				ddmenuitem.style.visibility = 'visible'; 
				document.getElementById('frame_fundo_menu').style.display = 'block';
			}		
		}
	}
	
}

// PROGRAMA O FECHAMENTO DO MENU
function mclosetime() {

	closetimer = window.setTimeout(mclose, timeout);

}

// CANCELA A PROGRAMACAO DE FECHAMENTO DO MENU
function mcancelclosetime() {

	if(closetimer)	{
		window.clearTimeout(closetimer);
		closetimer = null;
	}
	
}



// ABRE O SUB MENU
function mopen_sub(id) {	

	// CANCELA A ACAO DE FECHAR O MENU
	mcancelclosetime_sub();
	mcancelclosetime();

	// FECHA O MENU ANTIGO
	if(ddmenuitem_sub) 
		ddmenuitem_sub.style.visibility = 'hidden';

	// EXIBE O NOVO MENU
	ddmenuitem_sub = document.getElementById(id);

	ddmenuitem_sub.style.left = (ddmenuitem.style.left+ddmenuitem.offsetWidth-2)+"px";
	
	if( !ddmenuitem_sub.style.top )
		ddmenuitem_sub.style.top = (ddmenuitem_sub.offsetTop-24)+"px";

	ddmenuitem_sub.style.visibility = 'visible';
	
}

// FECHA O MENU
function mclose_sub() {
	
	if(ddmenuitem_sub) {
		ddmenuitem_sub.style.visibility = 'hidden';
		document.getElementById('frame_fundo_menu').style.display = 'none';
		mcancelclosetime_sub();
	}

}

// PROGRAMA O FECHAMENTO DO MENU
function mclosetime_sub() {

	if(ddmenuitem_sub) {
		closetimer_sub = window.setTimeout(mclose_sub, timeout);
	}
	
}

// CANCELA A PROGRAMACAO DE FECHAMENTO DO MENU
function mcancelclosetime_sub() {

	if(closetimer_sub)	{
		window.clearTimeout(closetimer_sub);
		closetimer_sub = null;
	}
	
	
}


function menu_abre_item(nome) {

	janela_cria(nome);
	mclose();
	
}

