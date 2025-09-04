<?php

/*
exemplo:

function layout_teste() {		echo "teste";	}
function layout_quadro() {	echo "quadro";	}
function layout_exame() {	echo "exame";	}

function index() {

	cabecalho('Teste Abas');
	
	menu_aba(
		array('ABA DE TESTE','QUADRO CL�NICO','EXAMES E MEDICAMENTOS'),
		array('layout_teste','layout_quadro','layout_exame')
	);
	
	rodape();

}
*/

/*************************************************************************\
|*
|*  In�cio do menu em abas
|*
\*************************************************************************/

function get_aba_foco() {
	global $ABAS_FOCO;
	
	return $ABAS_FOCO;
}

function set_aba_foco($foco) {
	global $ABAS_FOCO;
	
	$ABAS_FOCO = $foco;
}

function cria_aba($nome) {
	global $ABAS_ARRAY, $ABAS_FOCO;
	
	if( $ABAS_FOCO == '' ) {
		$ABAS_FOCO = $nome;
	} // se nao tiver nenhuma aba no foco, seta a primeira aba como sendo o foco inicial
	
	$ABAS_ARRAY[] = $nome;
	// joga o nome da aba no array
	
	
	exibir_componente("\n<div id='div_$nome' style=\"display:none\">\n");
	eval($nome."();");
	exibir_componente("\n</div>\n");
}

function controle_aba($nome='',$foco='') {
global $ABAS_ARRAY, $ABAS_FOCO;
	
	if( $nome=='' ) {
		$nome = $ABAS_ARRAY;
	} // se o nome for em branco, pegar do global
	if( $foco=='' ) {
		$foco = $ABAS_FOCO;
	} // se o foco estiver em branco, pegar do global
	
	
	$t_nome = count($nome);
	for($i=0; $i!=$t_nome; $i++) {
		$cmd .= "$('div_".$nome[$i]."').style.display='none';";
		$cmd .= "$('aba_".$nome[$i]."').className='';";
	} // torna todos os divs invisiveis

	
	javascript("
		function muda_aba(aba) {
			
			var funcao = 'foco_'+aba;
			
			$cmd 
			
			$('div_'+aba).style.display='block'; 
			$('aba_'+aba).className='current';
			
			if (typeof funcao == 'string' && eval('typeof ' + funcao) == 'function') {
				eval(funcao+'()');				
			} // testa se a funcao de foco existe
			
		} 
		muda_aba('$foco');
	");
}

function menu_aba($nome,$valor,$foco='') {

	
	$t_nome=count($nome);
	
	echo "\n<ul class='aba'>\n";
	for($i=0; $i!=$t_nome; $i++) {
		
		$vez = $nome[$i];
		
		if( substr($vez,0,3) != "<a " ) {
			$link = "<a href=# onclick=muda_aba('$valor[$i]')><b>$vez</b></a>";
		} else {
			$link = $vez;
		} // pra permitir que se entre com o link exato e n�o apenas o nome da aba
		
		echo "<li id='aba_$valor[$i]'>$link</li>\n";
	}
	echo "</ul>\n";
	// cria o menu em abas
	
	for($i=0; $i!=$t_nome; $i++)
		cria_aba($valor[$i]);
	// chame a funcao de criar as abas para 
	
	controle_aba('',$foco);
}





/*************************************************************************\
|*
|*  In�cio do menu em etapas
|*
\*************************************************************************/

function menu_etapa($nome,$valor,$foco='') {

	$t_nome=count($nome);
	
	echo "\n<ul class='aba'>\n";
	for($i=0; $i!=$t_nome; $i++)
		echo "<li id='etapa_$valor[$i]'><a href=# onclick='muda_etapa".$valor[$i].".submit()'><b>$nome[$i]</b></a></li>\n";
	echo "</ul>\n";
	// cria o menu em abas

	
	for($i=0; $i!=$t_nome; $i++) {
		acao_botao($valor[$i],$valor[$i]);
	} 

/*		
	javascript("
		function muda_etapa(aba) { 
			
			$('div_'+aba).style.display='block'; 
			$('aba_'+aba).className='active';
		} 
		muda_etapa('$valor[0]');
	");
*/
	
}

function controle_etapa($nome='',$foco='') {
global $ABAS_ARRAY, $ABAS_FOCO;
	
	if( $nome=='' ) {
		$nome = $ABAS_ARRAY;
	} // se o nome for em branco, pegar do global
	if( $foco=='' ) {
		$foco = $ABAS_FOCO;
	} // se o foco estiver em branco, pegar do global
	
	
	$t_nome = count($nome);
	for($i=0; $i!=$t_nome; $i++) {
		$cmd .= "$('div_".$nome[$i]."').style.display='none';";
		$cmd .= "$('aba_".$nome[$i]."').className='';";
	} // torna todos os divs invisiveis

	javascript("
		function muda_aba(aba) { 
			$cmd 
			$('div_'+aba).style.display='block'; 
			$('aba_'+aba).className='current';
		} 
		muda_aba('$foco');
	");
}




?>