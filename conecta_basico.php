<?php
error_reporting(0);


include "configura.php";

$CACTUX_CONF['path'] = $CONFIGURA[PATH];
//include $_SERVER[DOCUMENT_ROOT]."/cactux25/cactux.php"; // CACTUX (c) 2006 CACTUS TI
//include $_SERVER[DOCUMENT_ROOT]."/cactux3/cactux.php"; // CACTUX (c) 2006 CACTUS TI



// include "$_SERVER[DOCUMENT_ROOT]/cactux3/funcoes/funcoes_pagina.php";
include $_SERVER[DOCUMENT_ROOT].$CONFIGURA[PATH]."/".$CONFIGURA[LAYOUT]."/funcoes_pagina.php";
include "$_SERVER[DOCUMENT_ROOT]/cactux3/funcoes/funcoes_bd.php";
// include "$_SERVER[DOCUMENT_ROOT]/cactux3/funcoes/funcoes_form.php";
include $_SERVER[DOCUMENT_ROOT].$CONFIGURA[PATH]."/".$CONFIGURA[LAYOUT]."/funcoes_form.php";
// include "$_SERVER[DOCUMENT_ROOT]/cactux3/funcoes/funcoes_diversas.php";
include $_SERVER[DOCUMENT_ROOT].$CONFIGURA[PATH]."/".$CONFIGURA[LAYOUT]."/funcoes_diversas.php";
include "$_SERVER[DOCUMENT_ROOT]/cactux3/funcoes/funcoes_ajax.php";
// include "$_SERVER[DOCUMENT_ROOT]/cactux3/funcoes/funcoes_aba.php";
include $_SERVER[DOCUMENT_ROOT].$CONFIGURA[PATH]."/".$CONFIGURA[LAYOUT]."/funcoes_aba.php";
// include "$_SERVER[DOCUMENT_ROOT]/cactux3/funcoes/funcoes_grid.php";
include $_SERVER[DOCUMENT_ROOT].$CONFIGURA[PATH]."/".$CONFIGURA[LAYOUT]."/funcoes_grid.php";
//	include "$_SERVER[DOCUMENT_ROOT]/cactux3/funcoes/funcoes_combo.php";
include $_SERVER[DOCUMENT_ROOT].$CONFIGURA[PATH]."/".$CONFIGURA[LAYOUT]."/funcoes_combo.php";


// include $_SERVER[DOCUMENT_ROOT].$CONFIGURA[PATH]."/".$CONFIGURA[LAYOUT]."/funcoes_layout.php";
setDestino('_top'); // faz com que os link sejam direcionados para a janela superior! caso tenha um frame entrar com onome do frame

$PHP_SELF = $_SERVER[SCRIPT_NAME]; 
// mudan? ocorrida no servidor que necessita substituir a variavel $PHP_SELF por essa outra superglobal



// include "pdv/pdv_funcoes_layout.php";

// set_destino_frame();
	
setlocale(LC_CTYPE,"pt_BR");	

date_default_timezone_set('America/Fortaleza');


// error_reporting(E_ALL && ~E_NOTICE);
// ---------------------------------------------------------------
//
// acho que o conecta deve ser iqual ao ver_sessao. apenas direcionar par ao da pasta do cliente
//
// ---------------------------------------------------------------
?>