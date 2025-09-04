<?php
include "funcoes/funcoes_pagina.php";
include "funcoes/funcoes_bd.php";
include "funcoes/funcoes_form.php";
include "funcoes/funcoes_diversas.php";
include "funcoes/funcoes_ajax.php";
include "funcoes/funcoes_aba.php";
include "funcoes/funcoes_grid.php";
include "funcoes/funcoes_combo.php";



setDestino('_top'); // faz com que os link sejam direcionados para a janela superior! caso tenha um frame entrar com onome do frame

$PHP_SELF = $_SERVER[SCRIPT_NAME]; 
// mudança ocorrida no servidor que necessita substituir a variavel $PHP_SELF por essa outra superglobal
?>