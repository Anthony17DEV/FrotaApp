var var_arrasta = false; 	 // variavel que define se o botao do mouse esta pressionado dentro da area da janela
var x_pos, j_posx;       	 // posicao do mouse e posicao da janela
var JANELA_CONT=0;       	 // contador de janelas
var JANELA_VEZ;          	 // define a janela da vez
var JANELA_FOCO=1;       	 // define o foco da janela
var JANELA_C = new Array();      // estrutura principal com os estados das janelas


function janela_mover() {


	var x = event.clientX;
	var y = event.clientY;
	var j = $('janela'+JANELA_VEZ);
	var x_limite = screen.width;
	var y_limite = screen.availHeight;
	//window.status=y_limite;
	
	
	if( var_arrasta == true )  {
		var tw = $('iframe'+JANELA_VEZ).offsetWidth;
		var th = $('iframe'+JANELA_VEZ).offsetHeight;
		// altura e largura da janela
		var x_atual=((x-x_pos)+j_posx);
		var y_atual=((y-y_pos)+j_posy);
		
		
		if( x_atual >= 0 && x_atual+tw+25 <= x_limite )
			j.style.left = x_atual;
		// evita que passe da janela pela horizontal	
		if( y_atual >= 50 && y_atual+th+200 <= y_limite )	
			j.style.top = y_atual;
		// evita que passe da janela pela vertical

	}
	
}

function janela_foco(j) {

	$('janela'+j).style.zIndex=JANELA_FOCO++;
	
}

function janela_arrasta(janela) {

	JANELA_VEZ = janela;

	janela_foco(janela);

	if( var_arrasta == false ) {
		
		var j = $('janela'+janela);
		x_pos=event.clientX;
		j_posx = j.offsetLeft;
		y_pos=event.clientY;
		j_posy = j.offsetTop;
		
	}
	var_arrasta=true;
	
	//window.status='arrastando';
	janela_mover();
}

function janela_solta() {
	//window.status='solto';
	var_arrasta=false;
	janela_mover();
}

function janela_cria(src) {

	// cria o botao que sera exibido quando minimizar esa janela
	ifrm = document.createElement("DIV");
	ifrm.setAttribute("id", "minijanela"+(++JANELA_CONT));
	ifrm.style.position = "absolute";
	ifrm.style.top = 400;
	ifrm.style.left = 0;
	ifrm.style.zIndex = JANELA_FOCO*10;
	ifrm.style.display = "none";
	
	document.body.appendChild(ifrm);


	
	// cria uma tabela que sera o titulo da janela
	atual = "<table border=1 width=180 cellpadding=0 cellspacing=0  bordercolor=#000000 style=\"border-collapse: collapse;  position:absolute;top:0; left:0; z-Index:2\" >";
	atual += "<TR><TD > TITULO </TD><TD width=70 align=right><a href=# onClick=janela_mini("+JANELA_CONT+") >[-]</a><a href=# onClick=janela_max("+JANELA_CONT+")>[D]</a><a href=# onClick=janela_fecha("+JANELA_CONT+")>[x]</a></TD></TR>";
	atual += "</TABLE>";

	$('minijanela'+JANELA_CONT).innerHTML=atual;
	
	
	// cria a janela principal
	ifrm = document.createElement("DIV");
	ifrm.setAttribute("id", "janela"+(JANELA_CONT));
	ifrm.style.position = "absolute";
	ifrm.style.top = 60;
	ifrm.style.left = 0;
	ifrm.style.zIndex = JANELA_FOCO*10;
	document.body.appendChild(ifrm);
	
	
	//cria um iframe para o titulo da janela
atual = "<iframe id=ijanela"+(JANELA_CONT)+" frameborder=0 width=400 height=30 scrolling=no style=\"position:absolute;top:0; left:0; z-Index:1\"></iframe>";
	

atual="";
atual+="	<div class='bluebox' id='janela_box"+(JANELA_CONT)+"' style='border:10px; position:absolute; '>";

atual+="		<div class='catbox'>";				
					
atual+="						<table border='0' width='100%' cellpadding='0' cellspacing='0'>";
atual+="							<tr>";
atual+="								<td width='13' height='32' align='left'><img src='cactus/imagens/catbar_l.jpg' border='0'></td>";
atual+="								<td align='left' width='28'><img src='cactus/imagens/cadastro.png' border='0' alt='Cadastro de Pacientes'></td>";
atual+="								<td class='titulo'><div style=\'float:left\' id=titulo_'+JANELA_CONT+'>&nbsp;</div></td>";
atual+="								<td align='right' width='25'><a href='#'><img src='cactus/imagens/ajuda.png' border='0' alt='Ajuda'></a></td>";
atual+="								<td align='right' width='25'><a href='#'><img src='cactus/imagens/fechar.png' border='0' alt='Fechar'></a></td>";
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

atual += "&nbsp;<iframe onFocus=janela_foco("+JANELA_CONT+") id=iframe"+(JANELA_CONT)+" frameborder=0 src=\""+src+"\" width='300' height=300 allowTransparency></iframe>";


atual+="												</div>";
atual+="											</div>";
atual+="										</div>";
atual+="									</div>";
atual+="								</div>";
atual+="							</div>";
atual+="						</div>";
atual+="					</div>";
atual+="				</div>";
				

atual+="				<div class='streamsbox' ></div>";
atual+="					<div class='combar'>";
atual+="						<div class='cb1'><div class='cb2'></div></div>";
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

	janela_max(JANELA_CONT);

}

function janela_fecha(j) {

/*
if( j == 'this' )
	j = JANELA_VEZ;
// fecha a janela atual
*/	

	$('janela'+j).style.display='none';
	$('minijanela'+j).style.display='none';
	for(i=0; i!=JANELA_C.length; i++) {
		
		if( JANELA_C[i].id == j ) {
			
			for(l=i; l!=JANELA_C.length-1; l++) {
				JANELA_C[l]=JANELA_C[l+1];
			}
			
			JANELA_C.pop();
			break;
		} // remove um elemento de um array e traz os outros pra frente
		
	} // varre o array em busca da janela certa
	
}

function janela_mini(j) {

	var tam_x=580,tam_y=180, cont_j=1,achou;
	
	for(cont_j=1;;cont_j++) {
		
		for(i=0; i!=JANELA_C.length; i++) {
			if( JANELA_C[i].pos_mini == cont_j ) 
				achou=1;
			
		} // varre o array em busca da menor posicao para minimizar a janela
		
		if( achou != 1 ) {
			
			for(i=0; i!=JANELA_C.length; i++) {
				
				if( JANELA_C[i].id == j ) {
					
					JANELA_C[i].pos_mini=cont_j;
					JANELA_C[i].estado='Minimizado';
				}
			} // varre o array em busca da janela certa e seta o estado da janela como Minimizado e a posicaoem que minimizou
			
			break;
		} // se achou a posicao certa
		achou=0;
		
	} // procura por um espaco vago para minimizaar a janela
	
	
	$('minijanela'+j).style.top=572;
	$('minijanela'+j).style.left=(cont_j*181)-181;

	$('janela'+j).style.display='none';
	$('minijanela'+j).style.display='';	
	
}

function janela_restaura(j) {

	$('janela'+j).style.display='';
	$('minijanela'+j).style.display='none';

	for(i=0; i!=JANELA_C.length; i++) {
		
		if( JANELA_C[i].id == j ) {
			
			JANELA_C[i].estado='Normal';
			JANELA_C[i].pos_mini=0;
		} // seta o estado da janela como Minimizado
		
	} // varre o array em busca da janela certa
	
}


function janela_max(j) {

var janela,x,y;

	x = screen.width-230;
	y = screen.availHeight-400;
	

	for(i=0; i!=JANELA_C.length; i++) {
		
		if( JANELA_C[i].id == j ) 
			janela=i;
		
	} // varre o array em busca da janela certa

	if( JANELA_C[janela].estado=='Maximizado' ) {
		
		$('janela'+j).style.display='';
		$('iframe'+j).style.width=JANELA_C[janela].tam_x;
		$('iframe'+j).style.height=JANELA_C[janela].tam_y;
		
		$('janela'+j).style.top=80;
		$('janela'+j).style.left=JANELA_C[janela].left;
		
		JANELA_C[janela].estado='Normal';
	} else {
		
		if( JANELA_C[janela].estado=='Minimizado' ) {
			
			$('minijanela'+j).style.display='none';
			JANELA_C[janela].pos_mini=0;
			
		} // trata se a janela estiver minimizada
		
		$('janela'+j).style.display='';
		
		$('iframe'+j).style.width=(x-5)+"px";
		$('iframe'+j).style.height=y+"px";
		
		//$('iframe'+j).style.top=200+"px";
		
		$('janela'+j).style.top=95+"px";
				
		$('janela_box'+j).style.width=(x+60)+"px";
		$('janela_box'+j).style.left=(-15)+"px";
		
		JANELA_C[janela].estado='Maximizado';
		
	}
}


/*

FUNCOES REFERENTES A ABERTURA DO MENU DO LAYOUT ORIGINAL DO CACTUX2


*/

/*
function abre_menu(menu) {
 
	document.getElementById("menu_lateral").style.display="block";
	
	for(i=1; ; i++) {
		
		if( document.getElementById("menu"+i) != null ) 
			document.getElementById("menu"+i).style.display="none";
		else 
			break;
		
	} // percorre os elementos do menu e seta tudo como invisivel
	
	document.getElementById("menu"+menu).style.display="block";

	var x = screen.width-205;

	for(i=1; i<=JANELA_CONT; i++) {
		
		$('iframe'+i).style.width=x;
		$('ijanela'+i).style.width=x;
		$('janela'+i).style.left=180;
		
	} // varre o array em busca da janela certa

	//window.status = JANELA_C.length + " "+JANELA_VEZ+" "+JANELA_FOCO+" "+JANELA_CONT;
	
 }

function fecha_menu() {
 
	document.getElementById("menu_lateral").style.display="none";

	for(i=1;; i++) {
		
		if( document.getElementById("menu"+i) != null ) 
			document.getElementById("menu"+i).style.display="none";
		else 
			break;
		
	} // percorre os elementos do menu e seta tudo como invisivel

	
	var x = screen.width-35;

	for(i=1; i<=JANELA_CONT; i++) {
		
		$('iframe'+i).style.width=x;
		$('ijanela'+i).style.width=x;
		$('janela'+i).style.left=10;
		
	} // varre o array em busca da janela certa
	
}

*/

//document.onmousemove = function() { janela_mover(); }


/*

- FAZER FUNCAO PRA VERIFICAR SE A JANELA FOI FECHADA E REABRILA PRA NAO PRECISAR CARREGA-LA NOVAMENTE
- RENOMEAR AS VARIAVEIS
- TENTAR ENCAPSULAR ISSO TUDO
- PENSAR EM COMO FAZER A BARRA DE STATUS DA JANELA
- COLOCAR O LAYOUT NOVO NO FORMATO DE POPUP FECHANDO A JANELA ANTERIOR
- FAZER ANIMACAO DE ABRIR E FECHAR A JANELA, USANDO UM FOR PRA IR AUMENTANDO E DIMINUINDO GRADUALMENTE A JANELA
- VER COMO POSICIONAR AS AO ABRIR PRA NOA FICAREM UMAS EM CIMA DAS OUTRAS
- fazer barra de status com css bottom, uma imagem que ficaria sempre no cnato infeiror como o site do php do cara lah


*/


/*

// JS OO

function classeMaster() {

	var var1, var2;
	
	this.funcao1 = function() {
		
		var1 = 'funcao1';
		
	}
	
	this.funcao2 = function() {
	
		alert('lala '+var1);
	}

}

var lala = new classeMaster();

lala.funcao2();
lala.funcao1();
lala.funcao2();

function funcao2() {

alert('lele '+var1);
}

funcao2();

*/