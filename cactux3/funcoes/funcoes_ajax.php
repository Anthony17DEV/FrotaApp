<?php

/*


- OPERAÇÕES BÁSICAS DE CADASTRO
- CRIAR ABAS PARA CADASTROS COM VÁRIAS TELAS
- ATUALIZR APENAS UMA ÁREA DA PAGINA, UM DIV COMO NO REDE10




*/


function acaoX($acao,$form='') {

	if( $form == '' ) {
		global $NOME_FORM;
		$form = $NOME_FORM;
	}
	
	javascript("document.".$form.".acao.value='".$acao."'");
	
}

function frame_interno($debug=0) {
global $PHP_SELF;

	if( $debug == 0 )
		$comp ="<div id=div_interno style='width:1px; height:1px; visibility:hidden; '><iframe id=frame_interno name=frame_interno width=1 height=1 frameborder=no></iframe></div>";	
	else
		$comp ="<div id=div_interno ><iframe id=frame_interno name=frame_interno width=400 height=100 ></iframe></div>";	
	// cria o iframe oculto pra permitir a comunicacao assincrona
	
	exibir_componente($comp);

}



// ajax





function botao_excluirX($id, $acao='',$tabela='', $alt='',$img="imagens/excluir3.gif") {
global $PHP_SELF, $NOME_FORM; // para pegar a variavel do arquivo que a chama!

	if( $tabela=='' ) $tabela = 'tabelaX'; 		// pega o nome da tabela

	if( $acao == '' ) $acao = 'excluir';
	if( $alt == '' ) $alt='Excluir';

	$dir = explode("/",$PHP_SELF);
	$img = "/".$dir[1]."/".$img;
	// pega o nome do diretorio corretamente
	
	$comp .= "<a href=#>";
	exibir_componente($comp);
	imagem("$img",'','','',$alt,"onClick=\"javascript:excluirX('".basename($PHP_SELF)."','$tabela','$acao','$id')\"");
	$comp .= "</a>";
	exibir_componente($comp);
 return $comp;
}


function botao_modificarX($id, $acao='', $campos='', $valores='',$extra='', $alt='',$img="imagens/editar.png") {
global $PHP_SELF, $NOME_FORM; // para pegar a variavel do arquivo que a chama!

//	if( $form=='' ) $form = $NOME_FORM; // pega o nome do form
	if( $NOME_FORM == '' ) $NOME_FORM='cadastro';

	if( $acao == '' ) $acao = 'modificar';
	if( $alt == '' ) $alt='Modificar';

	$dir = explode("/",$PHP_SELF);
	$img = "/".$dir[1]."/".$img;
	// pega o nome do diretorio corretamente
	
	$comp .= "<a href=#>";
	exibir_componente($comp);
	imagem("$img",'','','',$alt,"onClick=\"javascript:modificarX('".basename($PHP_SELF)."','$NOME_FORM','$acao','$id','$campos','$valores')\"");
	$comp .= "</a>";
	exibir_componente($comp);
 return $comp;
}

function botao_submitX($submit,$valor1='',$valor2='', $campos='', $valores='', $tab=1, $lado='', $extra='') {
global $TABULACAO, $NOME_FORM, $PHP_SELF;
//if( $tab == '' ) $tab=1;


$CAMPO = explode(",",$campos);
$VALOR = explode(",",$valores);

$comp = "\r\n";

if( $tab == 1 ) {
    $comp .= "<TR><TD align=center colspan=2 > \r\n \r\n";
}
    $comp .= "<input $extra type=submit onClick=cadastrarX('".basename($PHP_SELF)."','$NOME_FORM') value=\"$submit\" id=submit  tabindex=".$TABULACAO++."> \r\n";
//    $comp .= "<input $extra type=button onClick=cadastrarX('".basename($PHP_SELF)."','$NOME_FORM') value=\"$submit\" id=submit  tabindex=".$TABULACAO++."> \r\n";

	$v = explode("/",$valor);
	$comp .= "<input type=hidden name=acao value=$valor1>\r\n";
	$comp .= "<input type=hidden name=acao1 value=$valor1>\r\n";
	$comp .= "<input type=hidden name=acao2 value=$valor2>\r\n";
	$comp .= "<input type=hidden name=id >\r\n";
	// funcao prapermitir que se chame 2 acoes em 1 soh, ex: cadastrar_pessoa/atualizar_pessoa
	
	
for($i=0; $i!=count($CAMPO)-1; $i++) 
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














function atualizarX($valores,$id='',$tabela='') {

$SEPARADOR="<*(xml)*>";

	if( $tabela=='' ) $tabela='tabelaX';
	if( $id=='' ) $id=$valores[0];
	
	unset($val);
	for($i=0; $i!=count($valores); $i++) {
		
		if( $valores[$i]{0} == '.' ) { 
			abre_painel();
			eval(substr($valores[$i],1).";");
			$v2 = fecha_painel();
			$v = str_replace("\"","%22",$v2);    // substitui o " por %22 pra decodificar depois com o javascript
		} else 
			$v = $valores[$i];
		
		$val .= $v.$SEPARADOR;
	} // percorre os valores passados e interpreta as funcoes caso existam
	
	javascript("parent.atualiza_tab(\"$val\",\"$tabela\",\"$id\");");
}



function inserirX($valores,$tabela='',$estilos='',$align='',$tamanho='',$valign='',$largura='') {

$SEPARADOR="<*(xml)*>";

	if( $tabela=='' ) $tabela='tabelaX';
	
	unset($val);
	for($i=0; $i!=count($valores); $i++) {
		
		if( $valores[$i]{0} == '.' ) { 
			abre_painel();
			eval(substr($valores[$i],1).";");
			$v2 = fecha_painel();
			$v = str_replace("\"","%22",$v2);    // substitui o " por %22 pra decodificar depois com o javascript
		} else 
			$v = $valores[$i];
		
		$val .= $v.$SEPARADOR;
	} // percorre os valores passados e interpreta as funcoes caso existam
	
	javascript("parent.insere_tab(\"$val\",\"$tabela\",\"$estilos\",\"$align\",\"$tamanho\");");
}



function modificarX($array) {

	if( $_POST[form] != '' ) $form=$_POST[form];
	if( $_GET[form] != '' ) $form=$_GET[form];

	reset($array);
	while( $atual = each($array) ) 
		$query .=  $atual[0]."=>".$atual[1]."<*(xml)*>";
	// cria a query no modelo campo=>valor<separador>
	javascript("carrega_modificarX('$form','$query');");
}

function removerX($id='',$tabela=''){

	if( $tabela=='' ) $tabela='tabelaX';
	if( $id=='' ) $id=$_POST[id];

	javascript("
	if( confirm('Deseja realmente excluir o registro?') ) 
		parent.remove_tab('$tabela','$id');
	");
}

?>