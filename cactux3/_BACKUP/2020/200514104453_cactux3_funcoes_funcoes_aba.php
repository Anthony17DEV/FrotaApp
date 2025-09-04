<?php

/*
exemplo:

function layout_teste() {		echo "teste";	}
function layout_quadro() {	echo "quadro";	}
function layout_exame() {	echo "exame";	}

function index() {

	cabecalho('Teste Abas');
	
	menu_aba(
		array('ABA DE TESTE','QUADRO CLÍNICO','EXAMES E MEDICAMENTOS'),
		array('layout_teste','layout_quadro','layout_exame')
	);
	
	rodape();

}
*/

/*************************************************************************\
|*
|*  Início do menu em abas
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

function cria_aba2($nome,$ativo) {
	global $ABAS_ARRAY, $ABAS_FOCO;
	
	if( $ABAS_FOCO == '' ) {
		$ABAS_FOCO = $nome;
	} // se nao tiver nenhuma aba no foco, seta a primeira aba como sendo o foco inicial
	
	$ABAS_ARRAY[] = $nome;
	// joga o nome da aba no array
	
	
	exibir_componente("\n<div class=\"tab-pane fade $ativo\" id=\"$nome\">\n");
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

function menu_aba($nome,$valor,$foco='',$js='') {

	
	$t_nome=count($nome);
	
	echo "\n<ul class='aba'>\n";
	for($i=0; $i!=$t_nome; $i++) {
		
		$vez = $nome[$i];
		
		if( $js != '' )
			$js_vez = "$js('$valor[$i]')";
		
		if( substr($vez,0,3) != "<a " ) {
			$link = "<a href=\"javascript:muda_aba('$valor[$i]');$js_vez\"><b>$vez</b></a>";
		} else {
			$link = $vez;
		} // pra permitir que se entre com o link exato e não apenas o nome da aba
		
		echo "<li id='aba_$valor[$i]'>$link</li>\n";
	}
	echo "</ul>\n";
	// cria o menu em abas
	
	for($i=0; $i!=$t_nome; $i++)
		cria_aba($valor[$i]);
	// chame a funcao de criar as abas para 
	
	controle_aba('',$foco);
}


function menu_aba2($nome,$valor,$foco='',$js='') {
/*
	?>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"/>
	<?*/
	
	$t_nome=count($nome);


	
	echo "<ul class=\"nav nav-tabs bordered\">";
	for($i=0; $i!=$t_nome; $i++) {
		
		$vez = $nome[$i];
		
		if( $js != '' )
			$js_vez = "$js('$valor[$i]')";

		if($foco == '' && $i == 0){
			$ativo = 'class="active"';
		}else{
			$ativo = '';
		}
		
		if( substr($vez,0,3) != "<a " ) {
			$link = "<a data-toggle=\"tab\" href=\"#$valor[$i]\"><b>$vez</b></a>";
		} else {
			$link = $vez;
		} // pra permitir que se entre com o link exato e não apenas o nome da aba
		
		echo "<li $ativo>$link</li>\n";
	}
	echo "</ul>\n";
	// cria o menu em abas
	
	echo '<div id="myTabContent1" class="tab-content padding-10">';
	for($i=0; $i!=$t_nome; $i++){
		if($foco == '' && $i == 0){
			$ativo = 'in active';
		}else{
			$ativo = '';
		}
		cria_aba2($valor[$i],$ativo);
	}
	echo '</div>';
	// chame a funcao de criar as abas para 
	
	// controle_aba2('',$foco);
}





/*************************************************************************\
|*
|*  Início do menu em etapas
|*
\*************************************************************************/

function menu_etapa($nome,$valor,$foco='') {

	$t_nome=count($nome);
	
	echo "\n<ul class='aba'>\n";
	for($i=0; $i!=$t_nome; $i++)
		echo "<li id='etapa_$valor[$i]'><a href='javascript:muda_etapa".$valor[$i].".submit()'><b>$nome[$i]</b></a></li>\n";
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