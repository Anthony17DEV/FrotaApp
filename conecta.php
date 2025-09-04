<? 	@session_start(); ?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pt-br">

<?php

include "configura.php";
error_reporting(E_ALL && ~E_NOTICE);


$CACTUX_CONF['path'] = $CONFIGURA[PATH];
//include $_SERVER[DOCUMENT_ROOT]."/cactux25/cactux.php"; // CACTUX (c) 2006 CACTUS TI
// include $_SERVER[DOCUMENT_ROOT]."/cactux3/cactux.php"; // CACTUX (c) 2006 CACTUS TI


if( $CONFIGURA[LAYOUT] != 'layout' ) {
	
	// CACTUX (c) 2006 CACTUS TI
	if( fopen($_SERVER[DOCUMENT_ROOT].$_SESSION[sistema]."/cactux3/cactux.php",'r')  ) {
		include $_SERVER[DOCUMENT_ROOT].$_SESSION[sistema]."/cactux3/cactux.php";
	} else {
		include $_SERVER[DOCUMENT_ROOT]."/cactux3/cactux.php";
	}

	// O FUNCOES_FORM FOI LEVADO PAR AO CACTUX3
	//include "funcoes_form.php";

	// O FUNCOES_PAGINA DEVE FICAR DENTRO DA PASTA DO CLIENTE

	include $_SERVER[DOCUMENT_ROOT].$CONFIGURA[PATH]."funcoes_pagina.php";

?>
<script src="/cactux3/js/funcoes.js"></SCRIPT>
<script src="/cactux3/js/ajax.js"></SCRIPT>
<script src="/cactux3/js/div.js"></SCRIPT>
<script src="/cactux3/js/mascaras.js"></SCRIPT>
<script src="/cactux3/js/combo_net.js"></SCRIPT>
<script src="/cactux3/js/combo_novo.js"></SCRIPT>
<?

}else{
	

	include $_SERVER[DOCUMENT_ROOT].$CONFIGURA[PATH]."/".$CONFIGURA[LAYOUT]."/funcoes_diversas.php";
	
	// include "$_SERVER[DOCUMENT_ROOT]/cactux3/funcoes/funcoes_pagina.php";
	include $_SERVER[DOCUMENT_ROOT].$CONFIGURA[PATH]."/".$CONFIGURA[LAYOUT]."/funcoes_pagina.php";
	include "$_SERVER[DOCUMENT_ROOT]/cactux3/funcoes/funcoes_bd.php";
	// include "$_SERVER[DOCUMENT_ROOT]/cactux3/funcoes/funcoes_form.php";
	include $_SERVER[DOCUMENT_ROOT].$CONFIGURA[PATH]."/".$CONFIGURA[LAYOUT]."/funcoes_form.php";
	// include "$_SERVER[DOCUMENT_ROOT]/cactux3/funcoes/funcoes_diversas.php";
	include "$_SERVER[DOCUMENT_ROOT]/cactux3/funcoes/funcoes_ajax.php";
	// include "$_SERVER[DOCUMENT_ROOT]/cactux3/funcoes/funcoes_aba.php";
	include $_SERVER[DOCUMENT_ROOT].$CONFIGURA[PATH]."/".$CONFIGURA[LAYOUT]."/funcoes_aba.php";
	// include "$_SERVER[DOCUMENT_ROOT]/cactux3/funcoes/funcoes_grid.php";
	include $_SERVER[DOCUMENT_ROOT].$CONFIGURA[PATH]."/".$CONFIGURA[LAYOUT]."/funcoes_grid.php";
	//include "$_SERVER[DOCUMENT_ROOT]/cactux3/funcoes/funcoes_combo.php";
	include $_SERVER[DOCUMENT_ROOT].$CONFIGURA[PATH]."/".$CONFIGURA[LAYOUT]."/funcoes_combo.php";
	

	include $_SERVER[DOCUMENT_ROOT].$CONFIGURA[PATH]."/".$CONFIGURA[LAYOUT]."/funcoes_layout.php";
	// setDestino('_top'); // faz com que os link sejam direcionados para a janela superior! caso tenha um frame entrar com onome do frame

	include $_SERVER[DOCUMENT_ROOT].$CONFIGURA[PATH]."funcoes_pagina.php";
	//echo "	include ".$_SERVER[DOCUMENT_ROOT].$CONFIGURA[PATH]."funcoes_pagina.php";
	//exit;


	$PHP_SELF = $_SERVER[SCRIPT_NAME]; 
	// mudan? ocorrida no servidor que necessita substituir a variavel $PHP_SELF por essa outra superglobal


?>
<script src="/cactux3/js/funcoes.js"></SCRIPT>
<script src="/cactux3/js/ajax.js"></SCRIPT>
<script src="<?= $_SESSION[sistema].$CONFIGURA[LAYOUT]?>/div.js"></SCRIPT>
<script src="../cactux3/js/mascaras.js"></SCRIPT>
<script src="<?= $_SESSION[sistema].$CONFIGURA[LAYOUT]?>/combo_net.js"></SCRIPT>
<script src="<?= $_SESSION[sistema].$CONFIGURA[LAYOUT]?>/combo_novo.js"></SCRIPT>
<?
?>


<script src="<?=$_SESSION[sistema].$CONFIGURA[LAYOUT]?>/js/janela.js?1"></SCRIPT>
<?
}





$url_include = "$CONFIGURA[HOST_SISTEMA]/$CONFIGURA[PATH]/../$CONFIGURA[MODULO]";


echo "<script src='$url_include/impressao_websocket.js?".time()."'></script>\r\n";
echo "<script src='$url_include/funcoes_diversas.js?".time()."'></script>\r\n";




javascript("

	function valida_cpf_cnpj(cnpj) {

		frame_interno('".$url_include."/valida_cpf_cnpj.php?".cactux_cookie::url_sistema()."&cpf_cnpj='+encodeURI(cnpj));
	}
");



// O FUNCOES_FORM AGORA FOI INCORPORADO AO CACTUX3
//include "funcoes_form.php";


// include "$_SERVER[DOCUMENT_ROOT]/modulo/pdv/pdv_funcoes.php";
// echo "<script src='../modulo/pdv/pdv.js?".time()."'></script>\r\n";

//  set_destino_frame();
	
setlocale(LC_CTYPE,"pt_BR");	

date_default_timezone_set('America/Fortaleza');


// $fp_log = fopen("log_sessao.txt","a");

// $linha = date("[Y-m-d H:i:s]")." -> conecta_semiarido1 ->";
// $linha .= "IP=!".$_SERVER['REMOTE_ADDR']." -> ".$_SERVER['HTTP_USER_AGENT']."! -> " ;
// $linha .= "URL=!".$_SERVER['SCRIPT_URI']."! -> " ;
// $linha .= "Sistema=!".$_SESSION[sistema]."! -> " ;
// $linha .= "nome_sistema=!".$_SESSION[nome_sistema]."! -> " ;
// $linha .= "user_tx_login=!".$_SESSION[user_tx_login]."! -> <br>\r\n" ;


// fputs($fp_log,$linha);

// fclose($fp_log);

?>

