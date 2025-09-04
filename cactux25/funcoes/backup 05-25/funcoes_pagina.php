<?php


function set_tabulacao($tab,$volta_tab=1) {
global $TABULACAO,$VOLTA_TABULACAO,$ANTIGA_TABULACAO;

	$ANTIGA_TABULACAO = $TABULACAO; // guarda o valor atual da tabulacao
	$VOLTA_TABULACAO = $volta_tab;  // flag para saber se eh pra voltar a tabulacao original depois de usar
	
	$TABULACAO = $tab;		// seta a nova tabulacao 
}

function exibe_historico($doc) {

	
	$sql_hist = selecionar('encaminha,user.perfil,disciplina',
		'enca_nb_documento,user_nb_perfil,perf_nb_disciplina',
		"$doc,.perf_nb_id,.disc_nb_id"," ORDER BY enca_nb_id DESC");
	
	
	if( num_linhas($sql_hist) != 0 ) {
		
		abre_tabela('98%');
		
		$v = array('DATA','USUÁRIO','AÇÃO','COMENTÁRIO');
		tabela($v,'tabela','','10%,15%,10%');
		
		while( $a_hist = carrega_array($sql_hist) ) {
			
			//if( $a_hist[enca_tx_tipo] == 'Reassinado' || $a_hist[enca_tx_tipo] == 'Selecionado' ) 
			//	continue;
			
			$obs = str_replace("\n","<BR>",$a_hist[enca_tx_obs]);
			
			$v = array(data($a_hist[enca_tx_data],1),$a_hist[perf_tx_nome],$a_hist[enca_tx_tipo],$obs);
			tabela($v,'ZEBRAR','e,e,e,e','','top');
			/*
			$cont[] = "Responsável: $a_hist[perf_tx_nome]";
			$cont[] = "Disciplina: $a_hist[disc_tx_nome]";
			$cont[] = "Data de Encaminhamento: ".data($a_hist[enca_tx_data],1);
			$cont[] = "Situação: $a_hist[enca_tx_tipo]";
			$cont[] = "Comentário: $a_hist[enca_tx_obs]";
			$cont[]='';
			*/
			
		}
		
		fecha_tabela();
		
	}
	

}

function set_titulo_janela($titulo) {

	javascript("

	
	janela_c = window.parent.JANELA_CONT;
	//alert(window.parent.JANELA_CONT+'$titulo');
	eval(\"window.parent.titulo_\"+window.parent.JANELA_CONT+\".innerHTML='$titulo'\");

	");


} // seta o titulo da janela do cactux


function set_destino_frame($dest='_self') {
global $TARGET_DESTINO;

	$TARGET_DESTINO=$dest;

}

function exibir_exemplo($msg,$estilo='') {
	global $EXEMPLOS;
	
	if( $estilo == '' ) 
		$estilo='exemplos';

	$EXEMPLOS="<span class=$estilo ><i>$msg</span>";

	
}


function titulo($titulo,$img='',$class='') {

	echo "<img src=\"$img\"> <span id=$class>$titulo</span>";
}


function cria_menu($nomes,$links, $num_espacos=0) {

	for($i=0; $i!=$num_espacos; $i++)
		$espacos .= "&nbsp;";

	echo "<!-- MENU CACTUX --> \r\n";
	echo "<iframe id=f_menu style=\"display:none; position:absolute; top:0px; left:0px\"></iframe>";
	echo "<UL class=mainNavList id=lineage:0>";
	
	for($i=0; $i!=count($nomes); $i++)
		echo "<LI id=lineage:0.$i> <A href=\"$links[$i]\" >$espacos $nomes[$i] $espacos</A> </LI>";

	echo "</UL> \r\n";

}

function menu_item($menu,$nomes,$links) {

$menu--;

echo "<DIV class=subNavContainer style=\"VISIBILITY: hidden\" align=left id=menu:$menu.0>";
echo "<UL class=subNavList id=lineage:0.$menu.0>";

for($i=0; $i!=count($nomes); $i++) {
	echo "<LI id=lineage:0.$menu.0.$i>";
	if( $nomes[$i]!='<HR>' )
		echo "<A href=\"$links[$i]\"  target=FRAME_PRINCIPAL  onclick=\"document.getElementById('menu:$menu.0').style.visibility='hidden';frame_menu(0,0)\">$nomes[$i]</A>";
	else
		echo $nomes[$i];
	echo "</LI>";
}
echo "</UL></DIV> \r\n";


}


function exibir_componente($comp) {
	global $PAINEL, $CORPO_PAINEL;
	global $TABULACAO,$VOLTA_TABULACAO,$ANTIGA_TABULACAO;

	if( $PAINEL != 'aberto' )
		echo $comp;
	else {
		$CORPO_PAINEL .= $comp;
	} // resolve se a variavel deve ser exibida dentro de um painel ou na saida padrao
	
	if( $VOLTA_TABULACAO == 1 ) {
		
		$TABULACAO=$ANTIGA_TABULACAO;
		$ANTIGA_TABULACAO='';
		$VOLTA_TABULACAO=0;
		
	} // resolve se volta a tabulacao pro estado original

}

function imagem($src,$border='',$tam='',$larg='',$alt='',$extra='') {

	if( $border=='' ) $border='0';
	if( $alt!='') $alt = "alt='$alt'";
	if( $tam!='') $tam = "width='$tam'";
	if( $larg!='') $larg = "height='$larg'";
	
	
	
	$comp .= "<img src='$src' border=$border $tam $larg $alt $extra >";
	
	
	exibir_componente($comp);
}

function mostra_painel($painel) {

	echo $painel;
}

function abre_painel() {

	global $PAINEL, $CORPO_PAINEL;
	
	$PAINEL='aberto';
	
}

function fecha_painel() {
	
	global $PAINEL, $CORPO_PAINEL;
	
	$PAINEL='fechado';
	$painel = $CORPO_PAINEL;
	$CORPO_PAINEL='';
	
	return $painel;
}

function auto_seleciona($valores) {

	$valor = "'".implode("','",$valores)."'"; 
	$comp .= "<script> Select($valor); </script>";
	
	exibir_componente($comp);

}

function auto_seleciona_div($id,$nome,$campo) {

	$valor = "'".implode("','",$valores)."'"; 
	$comp .= "<script> seleciona_div('$id','$nome','".$_SESSION["campo_".$campo]."','".$_SESSION["frame_".$campo]."','".$_SESSION["form_".$campo]."'); </script>";
	
	exibir_componente($comp);

}

function seleciona_div($id,$nome,$campo) {

	$comp .= "&nbsp;<a class=texto href=\"javascript:seleciona_div('$id','$nome','".$_SESSION["campo_".$campo]."','".$_SESSION["frame_".$campo]."','".$_SESSION["form_".$campo]."')\">$nome</a>";
	//$comp .= "&nbsp;<a class=texto href=\"javascript:void(0)\" onclick=\"seleciona_div('$id','$nome','".$_SESSION["campo_".$campo]."','".$_SESSION["frame_".$campo]."','".$_SESSION["form_".$campo]."')\">$nome</a>";
	exibir_componente($comp);

}

function fecha_div() {

	$comp .= "&nbsp;<a tabindex=10 class=texto href=\"javascript:fecha_div_link('".$_SESSION["frame_".$_GET[t]]."','".$_SESSION["campo_".$_GET[t]]."','".$_SESSION["form_".$_GET[t]]."')\">X</a>";
	
	exibir_componente($comp);

}

function link_seleciona($valores,$nome) {

	$valor = "'".implode("','",$valores)."'"; 

	$comp .= "&nbsp;<a class=texto href=\"javascript:onclick=Select($valor)\">$nome </a> ";
	
	exibir_componente($comp);

}


function hr($tam='100%') {

	$comp .= "<HR width=$tam>";
	
	exibir_componente($comp);
}


function cria_tabela($VALOR,$estilos='',$align='',$tamanho='',$tamTab='',$borda='',$x='',$y='',$valign='',$larg='') {

abre_tabela($tamTab,$borda,$x,$y);
tabela($VALOR,$estilos,$align,$tamanho,$valign,$larg);
fecha_tabela();

}

function tabela($VALOR,$estilos='',$align='',$tamanho='',$valign='',$largura='',$cols='') {


$ESTILO = explode(",",$estilos);
$ALIGN = explode(",",$align);
$TAM = explode(",",$tamanho);
$COLS = explode(",",$cols);

if( $ESTILO[0] == 'VARIAR' || $ESTILO[0] == 'ZEBRAR' ) {
global $cor_tabela;
   if( $cor_tabela++%2 == 0 ) 
      $ESTILO[0]= "item_tabela";
   else
      $ESTILO[0]= "item_tabela2";
}

if( $valign!='') $valign=" valign=$valign";
if( $largura!='') $largura=" height=$largura";

	  
if( $ESTILO[0] != '' ) $ESTILO[0] = "class=$ESTILO[0]";
$comp .= "<TR $ESTILO[0]  $valign $largura> \r\n";

for($i=0, $j=1; $i!=count($VALOR); $i++,$j++) {

	
	if( $COLS[$i] != ''  ) $cols = "colspan=$COLS[$i]"; else $cols='';
	if( $TAM[$i] != ''  ) $tam = "width=$TAM[$i]"; else $tam='';
	if( $ESTILO[$j] != '' ) $estilo = "class=$ESTILO[$j]";
	if( $ALIGN[$i] != ''  ) {
		$alinha = "align="; 
		switch( $ALIGN[$i] ) {
		case 'e': $alinha.="left"; break;
		case 'd': $alinha.="right"; break;
		case 'c': $alinha.="center"; break;
		case 'j': $alinha.="justify"; break;
		}
	} else
		$alinha = "align=center"; 
	
	
	//if( $ALIGN[$i] != '' ) $alinha = "align=$ALIGN[$i]"; else $alinha = "align=center"; 
if( $VALOR[$i]{0} == '.' ) 	{
	
	$comp .= "<TD $estilo $alinha $tam $extra> ";

	exibir_componente($comp);	$comp=''; // tem que limpar o $comp pra nao repetir o que jah foi exibido
	
	eval(substr($VALOR[$i],1).";");

	$comp .= " </TD> \r\n";
} else
	$comp .= "<TD $estilo $alinha $tam $cols> $VALOR[$i] </TD> \r\n";
	
	
}
	
$comp .= "</TR> \r\n";

exibir_componente($comp);


}



function enter() {

    $comp .= "<TR> \r\n";
    $comp .= "<TD colspan=2> &nbsp; </TD> \r\n";
    $comp .= "</TR> \r\n";
    $comp .= "\r\n";

	exibir_componente($comp);	

//	texto("","&nbsp;");
}


function frame_busca($destino='',$extra='') {
global $PHP_SELF;


if( $destino == '' ) $destino=$PHP_SELF;
if( $extra != '' ) $extra="&extra=".$extra;
if( $_POST[n] != 0 ) $extra.="&n=".$_POST[n];
// para manter a paginação




$comp .= "<BR>";
$comp .= "<iframe src=\"buscar.php?destino=".$destino.$extra."\" width=100% height=450 scrolling=\"auto\" frameborder=\"no\">";
$comp .= "</iframe>\r\n";

exibir_componente($comp);

}

function frame_buscaX($destino='',$acao='',$extra='') {
global $PHP_SELF;

if( $destino == '' ) $destino=$PHP_SELF;
if( $acao == '' ) $acao='frame';
//if( $extra != '' ) $extra="&extra=".$extra;
//if( $_POST[n] != 0 ) $extra.="&n=".$_POST[n];
// para manter a paginação




$comp .= "<BR>";
$comp .= "<iframe src=\"$destino?acao=".$acao."\" width=100% height=450 scrolling=\"auto\" frameborder=\"no\">";
//$comp .= "<iframe src=\"buscar.php?destino=".$destino.$extra."\" width=100% height=450 scrolling=\"auto\" frameborder=\"no\">";
$comp .= "</iframe>\r\n";

exibir_componente($comp);

}

function botao($nome,$acao,$tabela=1,$lado='',$extra='') {

//if( $tabela=='' ) $tabela=1; else $tabela=0;

if($tabela==1)
	$comp .= "<TR><TD colspan=2 align=center>\r\n";

$comp .= "<input type=button value=\"$nome\" $extra onclick=$acao.submit()>\r\n";

if( $lado != '' ) {
	exibir_componente($comp);	$comp='';

	eval($lado.";");
}


if($tabela==1)
	$comp .= "</TD></TR>\r\n";

exibir_componente($comp);

}

function acao_botao($nome,$acao='',$campos='',$valores='',$action='',$metodo='',$extra='') {
	global $PHP_SELF;

	if( $action == '') $action=$PHP_SELF;
	if( $metodo == '') $metodo='post';


	if( !is_array($campos) ) {
		$c = explode(",",$campos);
		$CAMPO = array_merge(array('acao'),$c);
	} else 
		$CAMPO = array_merge(array('acao'),$campos);
	
	if( !is_array($valores) ) {
		$c = explode(",",$valores);
		$VALOR = array_merge(array($acao),$c);
		
	} else {
		$VALOR = array_merge(array($acao),$valores);
	}

	

	$comp .= "<form name=$nome method=$metodo action=$action  $extra >\r\n";

	$t_campos=count($CAMPO);

	for($i=0;$i!=$t_campos;$i++)
		$comp .= "<input type=hidden name=\"$CAMPO[$i]\" value=\"$VALOR[$i]\"> \r\n";
	
	$comp .= "</form>\r\n";

	exibir_componente($comp);


/*
	// versao antiga
	$campos = "acao,".$campos;
	$valores = $acao.",".$valores;
	
	cria_form($nome,$campos,$valores,$action,$metodo, $extra);
*/	
}

function cria_form($nome,$campos='',$valores='',$acao='',$metodo='', $extra='') {
global $PHP_SELF;

if( $acao == '') $acao=$PHP_SELF;
if( $metodo == '') $metodo='post';


$CAMPO = explode(",",$campos);
$VALOR = explode(",",$valores);

$comp .= "<form name=$nome method=$metodo action=$acao  $extra >\r\n";

	for($i=0;$i!=count($CAMPO);$i++)
		$comp .= "<input type=hidden name=\"$CAMPO[$i]\" value=\"$VALOR[$i]\"> \r\n";
		
$comp .= "</form>";

exibir_componente($comp);

}


function abre_form($nome='',$acao='',$metodo='',$extra='') {
global $NOME_FORM, $PHP_SELF, $TABULACAO,$AJAX;

$NOME_FORM = $nome;
$TABULACAO=1;

if( $nome == 'upload' ) {
	$nome='cadastro';
	$extra="enctype=multipart/form-data";
}

if( $nome == 'blank' ) {
	$nome='cadastro';
	$extra=' target=_blank';
}

if( $NOME_FORM == '') $NOME_FORM='cadastro';
if( $acao == '') $acao=$PHP_SELF;
if( $metodo == '') $metodo='post';


$valida = "$NOME_FORM.validar.value"; // os campos a validar estao em um hidden chamado 'validar'

$comp = "\r\n";
if( $AJAX != 'ativo' )
	$comp .= "<form id=$NOME_FORM name=\"$NOME_FORM\" method=\"$metodo\" action=\"$acao\" OnSubmit=\"return validaForm('$NOME_FORM',$valida)\"  $extra  >\r\n";
else
	$comp .= "<form name=\"$NOME_FORM\" method=\"$metodo\" action=\"$acao\" $extra OnSubmit=\"return false\" >\r\n";
//  OnSubmit=\"return validaForm('$NOME_FORM',$valida)\" 

$comp .= "<input type=hidden name=validar  >\r\n";
$comp .= "<input type=hidden name=foco value=1>\r\n";

exibir_componente($comp);

}

function fecha_form() {


	$comp = "\r\n";
	$comp .= "</form>\r\n";
	exibir_componente($comp);

}

function abre_tabelaX($tamanho='',$id='',$borda='',$x='',$y='',$extra='') {

	if( $id == '' ) $id='tabelaX';

	abre_tabela($tamanho,$borda,$x,$y,"id=$id ".$extra);

}

function abre_tabela($tamanho='',$borda='',$x='',$y='',$extra='') {

if( $tamanho == '') $tamanho='500';
if( $borda == '') $borda='0';
if( $x == '' ) $x=2;
if( $y == '' ) $y=1;


	$comp = "\r\n";
	$comp .= "<TABLE class=tab width=\"$tamanho\" border=\"$borda\"   cellSpacing=$x cellPadding=$y $extra >";
    $comp .= "\r\n";
	
	exibir_componente($comp);

    
}

function fecha_tabela() {
global $cor_tabela;
$cor_tabela=0;

	$comp = "\r\n";
	$comp .= "</TABLE>\r\n";

	exibir_componente($comp);

}


/*
funcao para definir os campos que precisam ser validados

*/
function validar($item,$nome) {
global $NOME_FORM;

	$item = trim($item);
	if( $item{0} == '*' ) {	

	$VALIDAR .= $nome.",";
	$comp .= "<script>validarCampos('$NOME_FORM','$VALIDAR');</script>\r\n";

//	$comp = "<script> ".$NOME_FORM.".validar.value = ".$NOME_FORM.".validar.value+'".$nome.",' </script>\r\n";
	exibir_componente($comp);
	
	
	
	
	
	
	}


}




/**************************************************************************\
divide():                       

 Insere uma delimitação na tabela

 $msg - Mensagem a ser exibida no divisor
  
 \**************************************************************************/
    
function divide($msg) {

$comp = "\r\n";

$comp .= "<TR ><TD colspan=2> \r\n";
$comp .=  "<TABLE class=tab height=21 cellSpacing=0 cellPadding=0 border=0 width=100%> \r\n";
$comp .=  "<TR> \r\n";
$comp .=  "<TD class=secao  colSpan=2 style=\"text-transform: uppercase\">&nbsp; $msg </TD> \r\n";
//echo"<TD  colSpan=2 background=funcoes/divide.jpg style=font-family: Arial; color: #FFFFFF; font-size: 12px; font-weight: bold; text-transform: uppercase>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $msg </TD> \r\n";
$comp .=  "</TR> \r\n";
$comp .=  "</TABLE> \r\n";
$comp .=  "</TD></TR>     \r\n";

exibir_componente($comp);

}



function botao_geral($campos='', $valores='',$acao='', $alt='Modificar', $img="imagens/editar.png",$extra='') {
global $PHP_SELF, $TARGET_DESTINO; // para pegar a variavel do arquivo que a chama!


if( !$TARGET_DESTINO ) $TARGET_DESTINO='_top';


if( $acao == '' ) $acao = $PHP_SELF;


$dir = explode("/",$PHP_SELF);
//$img = "/".$dir[1]."/".$img;
$img = "/".$img;
// pega o nome do diretorio corretamente



$VALORES = explode(",",$valores);

cria_form("g".$VALORES[0],$campos,$valores,$acao,'',' target='.$TARGET_DESTINO);

$comp .= "\r\n <a href=\"javascript:g$VALORES[0].submit()\">";
exibir_componente($comp);
imagem("$img",'','','',$alt,"$extra ");
//imagem("$img",'','','',$alt,"$extra onClick=\"g$VALORES[0].submit()\" "); 
$comp .= "</a>";

exibir_componente($comp);

}




function icone_modificar($id, $acao, $campos='', $valores='', $action='', $extra='', $alt='',$img="imagens/editar.png") {

	$campos='acao,'.$campos;
	$valores=$acao.",".$valores;
	botao_modificar($id,$campos,$valores,$action,$extra,$alt,$img);
}

/**************************************************************************\
botao_modificar():                       

 Insere um botao com a açao de modificar

 $id - ID do registro a ser modificado
 $img - imagem a ser exibida no botao _OPCIONAL_
  
 \**************************************************************************/
    
function botao_modificar($id, $campos='', $valores='',$acao='', $extra='', $alt='',$img="imagens/editar.png") {
global $PHP_SELF; // para pegar a variavel do arquivo que a chama!

if( $acao == '' ) $acao = $PHP_SELF;
if( $alt == '' ) $alt='Modificar';

$dir = explode("/",$PHP_SELF);
//$img = "/".$dir[1]."/".$img;
$img = "/".$img;
// pega o nome do diretorio corretamente

$CAMPOS = explode(",", $campos);
$VALORES = explode(",",$valores);

cria_form("m".$id,"acao,id,".$campos,"modificar,$id,".$valores,$acao,'',$extra);

$comp .= "\r\n <a href=\"javascript:m$id.submit()\">";
//$comp .= "\r\n <a href=javascript:void(0)>";
exibir_componente($comp);
imagem("$img",'','','',$alt," ");
//imagem("$img",'','','',$alt,"onClick=\"m$id.submit()\" ");
$comp .= "</a>";

exibir_componente($comp);

}

/**************************************************************************\
botao_pagar():                       

 Insere um botao com a açao de pagamento

 $id - ID do movimento a ser pago
 $img - imagem a ser exibida no botao _OPCIONAL_
  
 \**************************************************************************/
    
function botao_pagar($id, $img="imagens/pagar.png") {
global $PHP_SELF; // para pegar a variavel do arquivo que a chama!

$dir = explode("/",$PHP_SELF);
//$img = "/".$dir[1]."/".$img;
$img = "/".$img;
// pega o nome do diretorio corretamente

cria_form("m".$id,"mov","$id","pagamento.php");

$comp .= "\r\n<a href=\"javascript:eval('m$id.submit()')\">";

exibir_componente($comp);
imagem("$img",'','','','Pagar',"");

$comp .= "</a>";

exibir_componente($comp);


}








function icone_excluir($id, $acao, $campos='', $valores='', $action='', $extra='', $alt='',$img="") {

	$campos='acao,'.$campos;
	$valores=$acao.",".$valores;
	botao_excluir($id,$campos,$valores,$action,$extra,$alt,$img);
}



/**************************************************************************\
botao_excluir():                       

 Insere um botao com a açao de excluir

 $id - ID do registro a ser modificado
 $img - imagem a ser exibida no botao _OPCIONAL_
  
 \**************************************************************************/
    

function botao_excluir($id, $campos='', $valores='', $nome='', $acao='', $act='',$extra='', $img="imagens/excluir3.gif") {
global $PHP_SELF; // para pegar a variavel do arquivo que a chama!

if( $nome == '' ) $nome = 'id';
if( $acao == '' ) $acao = 'excluir';
if( $act == '' ) $act = $PHP_SELF;

$dir = explode("/",$PHP_SELF);
//$img = "/".$dir[1]."/".$img;
$img = "/".$img;
// pega o nome do diretorio corretamente

$CAMPOS = explode(",", $campos);
$VALORES = explode(",",$valores);


cria_form("e".$id,"acao,$nome,".$campos,"$acao,$id,".$valores,$act,'',$extra);

$comp .= "\r\n <a href=\"javascript:excluir('e$id')\">";
//$comp .= "\r\n <a href=javascript:void(0)>";
exibir_componente($comp);
imagem("$img",'','','','Excluir',"");
$comp .= "</a>";

exibir_componente($comp);


}


function botao_form($submit, $acao='', $campos='', $valores='', $tab=1, $lado='', $extra='') {
global $TABULACAO;
//if( $tab == '' ) $tab=1;

$CAMPO = explode(",",$campos);
$VALOR = explode(",",$valores);

$CAMPO[]='acao';
$VALOR[]=$acao;
// define o valor da acao principal

$comp = "\r\n";

if( $tab == 1 ) {
    $comp .= "<TR><TD align=center colspan=2 > \r\n \r\n";
}
    $comp .= "<input $extra type=submit value=\"$submit\" id=submit  tabindex=".$TABULACAO++."> \r\n";
for($i=0; $i!=count($CAMPO); $i++) 
    $comp .= "<input type=hidden name=\"".trim($CAMPO[$i])."\" value=\"".trim($VALOR[$i])."\"> \r\n";


if( $lado != '' ) {
	exibir_componente($comp);	$comp='';

	eval($lado.";");
}

	
if( $tab == 1 ) {
    $comp .= "</TD></TR> \r\n";
}

	exibir_componente($comp);
}


/**************************************************************************\
botao_submit():                       

 Insere um botao com a açao submit

 $submit - Nome que aparecera no botao
$campos - nome dos campos, separados por virgula, a serem enviados por hidden
$valores - valores a serem enviados por submit
 
 \**************************************************************************/


function botao_submit($submit, $campos='', $valores='', $tab=1, $lado='', $extra='') {
global $TABULACAO;
//if( $tab == '' ) $tab=1;

$CAMPO = explode(",",$campos);
$VALOR = explode(",",$valores);

$comp = "\r\n";

if( $tab == 1 ) {
    $comp .= "<TR><TD align=center colspan=2 > \r\n \r\n";
}
    $comp .= "<input $extra type=submit value=\"$submit\" id=submit  tabindex=".$TABULACAO++."> \r\n";
for($i=0; $i!=count($CAMPO); $i++) 
    $comp .= "<input type=hidden name=\"".trim($CAMPO[$i])."\" value=\"".trim($VALOR[$i])."\"> \r\n";


if( $lado != '' ) {
	exibir_componente($comp);	$comp='';

	eval($lado.";");
}

	
if( $tab == 1 ) {
    $comp .= "</TD></TR> \r\n";
}

	exibir_componente($comp);
}



function botao_reset($valor='Limpar',$tab=1) {
global $TABULACAO;
//if( $tab == '' ) $tab=1;


$comp = "\r\n";

if( $tab == 1 ) {
    $comp .= "<TR><TD align=center colspan=2> \r\n \r\n";
}
    $comp .= "<input type=\"reset\" value=\"$valor\" id=submit tabindex=".$TABULACAO++."> \r\n";

if( $tab == 1 ) {
    $comp .= "</TD></TR> \r\n";
}

	exibir_componente($comp);
}




/**************************************************************************\
msg_status():                       

 Insere um campo de status na pagina

 $mensagem - mensagem a ser exibida, se for omitida sera mostrada a variavel  $msg do arquivo
 \**************************************************************************/

 
function msg_status($mensagem='',$tab=1) {

if( $mensagem=='') {
    
	if( $_POST[msg_status] == '' )
		global $msg;
	else
		$msg = $_POST[msg_status];
	
} else
    $msg = $mensagem;

if( $tab==1)
	$comp = "<TR><TD colspan=2 align=center> \r\n";

	$comp .= "<dir class=texto1 id=msg_status>  $msg </dir> \r\n";

if( $tab==1)
	$comp .= "</TD></TR> \r\n";

	exibir_componente($comp);
}



function botao_cadastro($h1='',$h2='') {

	if( $h1 != '' ) $h1 = ",".$h1;
	if( $h2 != '' ) $h2 = ",".$h2;

	//if( !$_POST[acao] )
	if( $_POST[acao] != 'modificar' )
		botao_submit("&nbsp;&nbsp; Cadastrar &nbsp;&nbsp;","acao$h1","cadastrar$h2");
	else
		botao_submit("&nbsp;&nbsp; Atualizar &nbsp;&nbsp;","acao,id$h1","atualizar,$_POST[id]".$h2);

}

function botao_cadastrar($acao='',$h1='',$h2='') {

	if( $h1 != '' ) $h1 = ",".$h1;
	if( $h2 != '' ) $h2 = ",".$h2;

	if( $_POST[acao] != 'modificar' && $_POST[acao] != 'modificar_'.$acao )
		botao_submit("&nbsp;&nbsp; Cadastrar &nbsp;&nbsp;","acao$h1","cadastra_".$acao.$h2);
	else
		botao_submit("&nbsp;&nbsp; Atualizar &nbsp;&nbsp;","acao,id$h1","atualiza_".$acao.",$_POST[id]".$h2);

}



function busca_div() {

	$comp .= "<input type=text name=busca value='$_POST[busca]' onkeyup=fecha_div('".$_SESSION["frame_".$_GET[t]]."','".$_SESSION["campo_".$_GET[t]]."','".$_SESSION["form_".$_GET[t]]."')>";
//	$comp .= "<input type=submit value=BOTAO style=display:none>";
	$comp .= "<input type=submit value=Ir>";
	$comp .= "<input type=hidden name=t value=$_GET[t]>";

	exibir_componente($comp);

}



function sel_div($id,$nome) {


//	echo "<a href=# onClick=\"sel_div($id,'".addslashes($nome)."','$_GET[form]','$_GET[campo]');\">$nome</a><BR>\n";
//	echo "<a href=# onClick=\"sel_div($id,'".addslashes($nome)."','$_GET[form]','$_GET[campo]');\">$nome</a><BR>\n";
	echo "<a href=\"javascript:sel_div($id,'".addslashes($nome)."','$_GET[form]','$_GET[campo]');\">$nome</a><BR>\n";
}

function auto_sel_div($id,$nome) {

	if( $_GET[form] ) $_POST[form] = $_GET[form];
	if( $_GET[campo] ) $_POST[campo] = $_GET[campo];
	
	javascript("sel_div($id,'".addslashes($nome)."','$_POST[form]','$_POST[campo]')");
	javascript("window.parent.document.getElementById('div_".$_POST[campo]."').style.display='none'");
	
/*
	echo "<script>
	sel_div($id,'".addslashes($nome)."','$_POST[form]','$_POST[campo]');
	window.parent.document.getElementById('div_".$_POST[campo]."').style.display='none';
	</script>";
*/
}



?>