var JANELA_CONT=0;       		 // contador de janelas
var JANELA_VEZ;          		 // define a janela da vez
var JANELA_C = new Array();      // estrutura principal com os estados das janelas

window.onresize = ajusta_tamanho;

function ajusta_tamanho() {

	for(i=1; i<=JANELA_CONT; i++) {
		
		janela_max(i);
		
	}
	

}

function janela_foco(j) {

	for(i=0; i!=JANELA_C.length; i++) {
		
		vez = i+1; // +1 pq comeca de 0
		
		if( JANELA_C[i].id == j ) {
			$('janela'+vez).style.display='block';
			$('janela'+vez).focus();
		} else {
			$('janela'+vez).style.display='none';
		}
		
	} // varre o array em busca da janela certa
	
}

function janela_cria(src,op_index) {

	++JANELA_CONT;

	// cria o botao que sera exibido quando minimizar esa janela
	atual  = "<span id='minijanela"+JANELA_CONT+"' class='sidenav'>";
	atual += "<a onclick='janela_foco("+JANELA_CONT+")' href='#' id=minititulo_"+JANELA_CONT+">Abrindo Janela...</a>";
	atual += "</span>";
	$('barra_janelas').innerHTML+=atual;


		
	if( op_index == 1 ) {
		
		atual = "<div id='janela"+JANELA_CONT+"' style='position:absolute; left:0'></div>";
		$('barra_janelas').innerHTML+=atual;
		// se for a primeira janela (index) criar a div nao dentro de body, mas dentro da div barra janelas pois gera o erro ao carregar automaticamente a janela
		
	} else {
		
		// cria a janela principal
		ifrm = document.createElement("DIV");
		ifrm.setAttribute("id", "janela"+(JANELA_CONT));
		ifrm.style.position = "absolute";
		ifrm.style.top = 60;
		ifrm.style.left = 0;
		document.body.appendChild(ifrm);
	}
	

atual="";

atual+="	<div class='bluebox' id='janela_box"+(JANELA_CONT)+"' style='border:10px; position:absolute; '>";

atual+="				<div class='catbox'>";				
					
atual+="						<table border='0' width='100%' cellpadding='0' cellspacing='0'>";
atual+="							<tr>";
atual+="								<td width='13' height='32' align='left'><img src='cactus/imagens/catbar_l.jpg' border='0'></td>";
atual+="								<td align='left' width='28'><img src='cactus/imagens/cadastro.png' border='0'></td>";
atual+="								<td class='titulo'><div style=\'float:left\' id=titulo_"+JANELA_CONT+">&nbsp;</div></td>";

if( op_index != 0 ) {

	atual+="								<td align='right' width='25'><a><img src='cactus/imagens/ajuda.png' border='0' alt='Ajuda'></a></td>";
	atual+="								<td align='right' width='25'><a href=# onclick='janela_fecha("+JANELA_CONT+")'><img src='cactus/imagens/fechar.png' border='0' alt='Fechar'></a></td>";

}
atual+="								<td align='right' width='12' height='32'><img src='cactus/imagens/catbar_r.jpg' border='0'></td>";
atual+="							</tr>";
atual+="						</table>";

atual+="				</div>";


atual+="	    		<div style='display: block; height: 100%;'  id='streamsbox_2397760' class='streamsbox'>";
atual+="					<div class='st1'>";
atual+="						<div class='st2'>";
atual+="							<div class='st3'>";
atual+="								<div class='st4'>";
atual+="									<div class='st5'>";
atual+="										<div class='st6'>";
atual+="											<div class='st7'>";
atual+="												<div class='st8' align='center' style='padding-top: 3px;'>";



atual += "&nbsp;<iframe id=iframe"+(JANELA_CONT)+" frameborder=0 src=\""+src+"\" width='300' height=300 allowTransparency></iframe>";


atual+="												</div>";
atual+="											</div>";
atual+="										</div>";
atual+="									</div>";
atual+="								</div>";
atual+="							</div>";
atual+="						</div>";
atual+="					</div>";
atual+="				</div>";
atual+="			</div>";


	
	$('janela'+JANELA_CONT).innerHTML=atual;
	
	JANELA_VEZ = JANELA_CONT;

	JANELA_C[JANELA_C.length] = {
					id:JANELA_CONT,		estado: 'Normal',
					top: 200,		left:200,
					tam_x:450,		tam_y:300,
					pos_mini:0,		titulo:''	
	}; // estrutura principal da janela

	janela_foco(JANELA_CONT);
	janela_max(JANELA_CONT);
	
}

function janela_fecha(j) {

	if( confirm("Deseja realmente fechar esta janela?") ) {
		$('janela'+j).style.display='none';
		$('minijanela'+j).style.display='none';
	}
	
}

function janela_max(j) {

	var janela,x,y;

	x = document.body.offsetWidth-230;		// 230 EH A LARGURA DA BARRA LATERAL
	y = document.body.offsetHeight-125;		

	$('janela'+j).style.display='';
	$('janela'+j).style.top=45+"px";
	
	$('iframe'+j).style.width=(x-5)+"px";
	$('iframe'+j).style.height=y+"px";
	

	$('janela_box'+j).style.width=(x+60)+"px";
	$('janela_box'+j).style.left=(-15)+"px";
	
}

function janela_titulo(titulo2) {

	var janela_vez2 = window.parent.JANELA_CONT;

	if(window.parent.document.getElementById('minititulo_'+janela_vez2).innerHTML != 'Abrindo Janela...') {
		return;
	} // SE O TITULO DA JANELA NAO ESTIVER EM BRANCO, NAO ALTERA, PARA EVITAR QUE SE ALTERE O TITULO DA JANELA ERRADA
	
	mini2 = ( titulo2.length > 35 )? titulo2.substr(0,32)+'...': titulo2;
	
	window.parent.document.getElementById('titulo_'+janela_vez2).innerHTML=titulo2;
	window.parent.document.getElementById('minititulo_'+janela_vez2).innerHTML=mini2;
	
}
