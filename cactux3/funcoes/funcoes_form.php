<?php
@header("Content-Type: text/html;  charset=ISO-8859-1",true);

define('TAMANHO_CAMPO_FORM',9);

class cactux {



function separador($tamanho=1) {

	$comp = "\r\n";

	$nome_class = "tamanho_".$tamanho;
	
	$comp .= "<td class='$nome_class'>";
	$comp .= "<span style='width:100%'>&nbsp;<BR><BR>&nbsp;</span>";
	$comp .= "</td>\n";


	return $comp;
}


 
function msg_status($tamanho=4) {

	if( $mensagem=='') {
	    
		if( $_POST[msg_status] == '' )
			global $msg;
		else
			$msg = $_POST[msg_status];
		
	} else {
	    $msg = $mensagem;
	}

	//$comp = "<td class=msg_status id=msg_status>$msg</td>\n";

	$nome_class = "tamanho_".$tamanho;
	
	if( $_POST[cactux_tipo_form] == 'mobile' )
		$comp .= "\n<tr>";	
		
	$comp = "<td class='$nome_class' valign=top>";
	$comp .= "<span class=label>\n";
	$comp .= "<span class=msg_status>$msg</span> </span>\n";
	$comp .= "</td>\n";
	
	if( $_POST[cactux_tipo_form] == 'mobile' )
		$comp .= "\n</tr>";	
		
	return $comp;
	
}


function acao_botao($nome,$acao='',$campos='',$valores='',$action='',$metodo='',$extra='') {
	global $PHP_SELF;

	if( $action == '') $action=$PHP_SELF;
	if( $metodo == '') $metodo='post';

	
//	$campos .= grid::campos_busca().",";
//	$valores .= grid::valores_busca().",";
	
	$campos .= ",".grid::campos_busca().",";
	$valores .= ",".grid::valores_busca().",";
	

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
}


function botao_submit($submit, $tamanho=1,$acao='', $campos='', $valores='', $extra='') {
global $TABULACAO;

++$TABULACAO;

$campos .= ",".grid::campos_busca();
$valores .= ",".grid::valores_busca();


$CAMPO = explode(",",$campos);
$VALOR = explode(",",$valores);

$CAMPO[]='acao';
$VALOR[]=$acao;
// define o valor da acao principal

$comp = "\r\n";

    //$comp .= "<input $extra type=submit value=\"$submit\" id=submit  tabindex=".$TABULACAO++."> \r\n";
//	$comp .= "<button type='submit' tabindex=".$TABULACAO.">$submit</button>";

	$nome_class = "tamanho_".$tamanho;
	
	if( $_POST[cactux_tipo_form] == 'mobile' ) {
		
		$comp .= "<input  class='button_mobile'  style='' type='submit' value='".$submit."'  tabindex=".$TABULACAO.">";			
				
	} else {	
		$comp .= "<td class='$nome_class ".lblbutton ."'>";
		$comp .= "<input style='width:100%' type='submit'  value='".$submit."' class='button' tabindex='".$TABULACAO."' $extra >";
		$comp .= "</td>\n";
		
	}
	
	for($i=0; $i!=count($CAMPO); $i++) 
	    $comp .= "<input type=hidden name=\"".trim($CAMPO[$i])."\" value=\"".trim($VALOR[$i])."\"> \r\n";


		
	return $comp;
}

function botao_submit_busca($submit, $tamanho=1,$acao='', $campos='', $valores='', $tab=1, $lado='', $extra='') {
global $TABULACAO;

++$TABULACAO;


$CAMPO = explode(",",$campos);
$VALOR = explode(",",$valores);

$CAMPO[]='acao';
$VALOR[]=$acao;
// define o valor da acao principal

if( $_POST[sistemacactus] == '' )
	$_POST[sistemacactus] = $_GET[sistemacactus];

$CAMPO[]='sistemacactus';
$VALOR[]=$_POST[sistemacactus];
// define o valor do nome do sistema


$comp = "\r\n";


	$nome_class = "tamanho_".$tamanho;
	
	if( $_POST[cactux_tipo_form] == 'mobile' ) {
	
		$comp .= "<input  class='button_mobile'  style='' type='submit' value='".$submit."'  tabindex=".$TABULACAO.">";			
		
	} else {		
		$comp .= "<td class='$nome_class ".lblbutton ."'>";
		$comp .= "<input style='width:100%' type='submit'  value='".$submit."' class='button' tabindex='".$TABULACAO."'>";
		$comp .= "</td>\n";
	
	}
	
		for($i=0; $i!=count($CAMPO); $i++) 
			$comp .= "<input type=hidden name=\"".trim($CAMPO[$i])."\" value=\"".trim($VALOR[$i])."\"> \r\n";

	

	return $comp;
}


function botao($submit, $tamanho=1,$acao='', $extra='') {
global $TABULACAO;

++$TABULACAO;


	$comp = "\r\n";

	$nome_class = "tamanho_".$tamanho;

	if( $_POST[cactux_tipo_form] == 'mobile' ) {
	
		$comp .= "<input  class='button_mobile'  style='' type='button' value='".$submit."' $extra onclick=$acao.submit() tabindex=".$TABULACAO.">";		
		
	} else {
	
		$comp .= "<td class='$nome_class lblbutton '>";		
		$comp .= "<input  class='button'  style='width:100%' type='button' value='".$submit."' $extra onclick=$acao.submit() tabindex=".$TABULACAO.">";
		$comp .= "</td>\n";
	
	}


	return $comp;
}



function texto($item, $nome, $tamanho='') {
global $TABULACAO, $AJAX, $EXEMPLOS;
	
	validar($item,$nome);  
	$nome_class = "tamanho_".$tamanho;

	if( $_POST[cactux_tipo_form] == 'mobile' )
		$comp .= "\n<tr>";	
	$comp .= "<td class='$nome_class' valign=top align=left>";
	$comp .= "<span class=label>$item $EXEMPLOS<BR>\n";
	$comp .= "<span class=campo_texto>$nome</span> </span>\n";
	$comp .= "</td>\n";
	
	if( $_POST[cactux_tipo_form] == 'mobile' )
		$comp .= "\n</tr>";	
	
	return $comp;
}

function campo_hidden($nome, $valor='') {

	$comp = "<input type=hidden name=$nome value=\"".$valor."\" > \r\n";

	return $comp;
}


function campo_simples($nome, $valor='', $tamanho='', $extra='', $lado='') {
global $TABULACAO, $AJAX, $EXEMPLOS;
	
	++$TABULACAO;
	$nome_class = "tamanho_".$tamanho;
	
	$comp .= "\n<input autocomplete=off type=text name=$nome value=\"".$valor."\" class=campo_formulario $extra tabindex=".$TABULACAO.">";
	
	
	return $comp;
}

function campo($item, $nome, $valor='', $tamanho='', $extra='', $lado='') {
global $TABULACAO, $AJAX, $EXEMPLOS;
	
	validar($item,$nome);  
	++$TABULACAO;
	$nome_class = "tamanho_".$tamanho;
	
	// AQUI FUNCIONA DA SEGUINTE FORMA, SE O TIPO FOR MOBILE E PASSAR O EXTRA ENTAO O CAMPO ASSUME O TIPO NUMERICO E NAO MAS TEXTO
	// NO ARQUIVO FUNCOES_DIVERSOS ELE APONTA O TIPO QUE VAI USAR
	$tipo = "type=text";
	if( $_POST[cactux_tipo_form] == 'mobile' && $extra != '' )
		$tipo = '';
		
		
	if( $_POST[cactux_tipo_form] == 'mobile' ) 
		$comp .= "\n<tr>";
	
	$comp .= "\n<td class='$nome_class' valign=top>";
	$comp .= "\n$item $EXEMPLOS";
	$comp .= "\n<input autocomplete=off $tipo name=$nome value=\"".$valor."\" class=campo_formulario $extra tabindex=".$TABULACAO.">";
	$comp .= "\n$lado\n</td>\n";

	if( $_POST[cactux_tipo_form] == 'mobile' )
		$comp .= "\n</tr>";	
	
	
	return $comp;
}



function campo_arquivo($item, $nome, $tamanho='', $extra='') {
global $TABULACAO, $AJAX, $EXEMPLOS;
	
	validar($item,$nome);  
	++$TABULACAO;
	$nome_class = "tamanho_".$tamanho;

	if( $_POST[cactux_tipo_form] == 'mobile' )
		$comp .= "\n<tr>";
		
	$comp .= "\n<td class='$nome_class' valign=top >";
	$comp .= "\n$item $EXEMPLOS";
	$comp .= "\n<input type=file size=50% name=$nome value=\"".$valor."\" class=campo_formulario $extra tabindex=".$TABULACAO." >";
	$comp .= "\n</td>\n";

	if( $_POST[cactux_tipo_form] == 'mobile' )
		$comp .= "\n</tr>";	
	
	return $comp;
}

function campo_senha($item, $nome, $tamanho='', $extra='', $lado='') {
global $TABULACAO, $AJAX, $EXEMPLOS;
	
	validar($item,$nome);  
	++$TABULACAO;
	$nome_class = "tamanho_".$tamanho;
	
	if( $_POST[cactux_tipo_form] == 'mobile' )
		$comp .= "\n<tr>";
		
	$comp .= "\n<td class='$nome_class' valign=top>";
	$comp .= "\n$item $EXEMPLOS";
	$comp .= "\n<input autocomplete=off type=password name=$nome class=campo_formulario $extra tabindex=".$TABULACAO.">";
	$comp .= "\n</td>\n";

	if( $_POST[cactux_tipo_form] == 'mobile' )
		$comp .= "\n</tr>";	
	
	return $comp;
}


function combo($item, $nome, $valor, $modifica='', $tamanho='', $extra='') {
global $TABULACAO, $AJAX;

	validar($item,$nome);  
	++$TABULACAO;
	$nome_class = "tamanho_".$tamanho;

	if( !is_array($valor) ) {
		$valor = str_replace(", ",",",$valor);
		$valor_ok = explode(",",$valor);
	} else
		$valor_ok = $valor;

	if( $_POST[cactux_tipo_form] == 'mobile' )
		$comp .= "\n<tr>";
	
	$comp .= "<td class='$nome_class' valign=top>";
	$comp .= "$item<BR>\r\n";
	
	$comp .= "<select name=$nome $extra tabindex=".$TABULACAO." class=campo_formulario>\r\n";

	if( $item{0} == '!' ) {
		$comp .= "<option value=\"\"> </option> \r\n";
	}  // se o nome iniciar com ! coloca um campo em branco
	
	$t_valor = count($valor_ok);
	for($i=0; $i!=$t_valor; $i++) {

		if( $valor_ok[$i] == $modifica )
			$sel = "selected";
		else
			unset($sel);
		
		$comp .= "<option value=\"$valor_ok[$i]\" $sel> $valor_ok[$i] </option> \r\n";
	}

	$comp .= "</select>";
	$comp .= "</td>\r\n";
	
	if( $_POST[cactux_tipo_form] == 'mobile' )
		$comp .= "\n</tr>";
	
	return $comp;
}



function combo_bd($item, $nome, $valor1, $valor2, $tamanho, $tabela,  $extra='', $campos='1',$nome_campo='1',$lim_nome='200',$extrasql='') {
global $TABULACAO, $AJAX, $EXEMPLOS;

	validar($item,$nome);  
	++$TABULACAO;
	$nome_class = "tamanho_".$tamanho;
	
	
	if( $tam = strpos($tabela,":") ) {
		
		$tabela2 = explode(":",$tabela);
		$tabela = $tabela2[0];
		$TAB = $tabela2[1];
		
	} else {
		
		$TAB = substr($tabela,0,4);
	}
	
	if( $campos=='') $campos='1';

	if( $campos{0} == "." ) {
		
		$campos=substr($campos,1);
		$extrasql .= " ORDER BY ".$TAB."_tx_".$campos;
		$campos='1';
	} 
	
	if( $item{0} == '!' ) 
		$item_ok = substr($item,1);
	else
		$item_ok = $item;

	validar($item_ok,$nome);  

	if( $_POST[cactux_tipo_form] == 'mobile' )
		$comp .= "\n<tr>";

	$comp .= "<td class='$nome_class'  valign=top >";
	$comp .= "$item_ok<BR>\r\n";
	
	$comp .= "<select name=$nome $extra tabindex=".$TABULACAO." class=campo_formulario>\r\n";

	
	if( $item{0} == '!' )
		$comp .= "<option value=\"\">  </option> \r\n"; 
	
	
	
	$sql_combo = selecionar($tabela,$TAB."_tx_status",'ativo',' AND '.$campos.$extrasql);
	while( $array_combo = carrega_array($sql_combo) ) {  
		
		$mostra = substr($array_combo[$nome_campo],0,$lim_nome);
		
	    if( $valor1 == $array_combo[0] && $valor2 != ''  ) {  
			$selecionado = "selected";
	    } else {
			unset($selecionado);
		} // deixe selecionado o valor que foi entrado no campo modificar
		
		$comp .= "<option value=\"$array_combo[0]\" $selecionado>".$mostra." </option>\r\n"; 
	}
	
	$comp .= "</select>";
	$comp .= "</td>\r\n";

	if( $_POST[cactux_tipo_form] == 'mobile' )
		$comp .= "\n</tr>";
	
	return $comp;
}


function combo_bd_tributacao($item, $nome, $valor1, $valor2, $tamanho, $tabela,  $extra='', $campos='1',$nome_campo='1',$lim_nome='200',$extrasql='') {
global $TABULACAO, $AJAX, $EXEMPLOS;

	validar($item,$nome);  
	++$TABULACAO;
	$nome_class = "tamanho_".$tamanho;
	
	
	if( $tam = strpos($tabela,":") ) {
		
		$tabela2 = explode(":",$tabela);
		$tabela = $tabela2[0];
		$TAB = $tabela2[1];
		
	} else {
		
		$TAB = substr($tabela,0,4);
	}
	
	if( $campos=='') $campos='1';

	if( $campos{0} == "." ) {
		
		$campos=substr($campos,1);
		$extrasql .= " ORDER BY ".$TAB."_tx_".$campos;
		$campos='1';
	} 
	
	if( $item{0} == '!' ) 
		$item_ok = substr($item,1);
	else
		$item_ok = $item;

	validar($item_ok,$nome);  

	if( $_POST[cactux_tipo_form] == 'mobile' )
		$comp .= "\n<tr>";
		
	$comp .= "<td class='$nome_class'  valign=top>";
	$comp .= "$item_ok<BR>\r\n";
	
	$comp .= "<select name=$nome $extra tabindex=".$TABULACAO." class=campo_formulario>\r\n";

	
	if( $item{0} == '!' )
		$comp .= "<option value=\"\">  </option> \r\n"; 
	
	
	
	$sql_combo = selecionar($tabela,$TAB."_tx_status",'ativo',' AND '.$campos.$extrasql);
	while( $array_combo = carrega_array($sql_combo) ) {  
		
		$mostra = substr($array_combo[$nome_campo],0,$lim_nome);
		
	    if( $valor1 == $array_combo[0] && $valor2 != ''  ) {  
			$selecionado = "selected";
	    } else {
			unset($selecionado);
		} // deixe selecionado o valor que foi entrado no campo modificar
		
		$comp .= "<option value=\"$array_combo[0]\" $selecionado>"."$array_combo[impo_tx_codigo]-".$mostra." </option>\r\n"; 
	}
	
	$comp .= "</select>";
	$comp .= "</td>\r\n";

	if( $_POST[cactux_tipo_form] == 'mobile' )
		$comp .= "\n<tr>";
		
	return $comp;
}


function combo_net_simples($nome, $valor1, $valor2, $arquivo, $extra='') {
global $TABULACAO, $PHP_SELF, $AJAX;

	$tamanho=10;
	$nome_campo_form = $nome;
	
	$nome = rand(0,999).$nome;
	
	//validar($item,$nome);  
	++$TABULACAO;
	
	if( is_array($tamanho) ) {
		$direcao_div = $tamanho[1];
		$tamanho = $tamanho[0];
	} else
		$direcao_div = 0;
	
	
	$nome_class = "tamanho_".$tamanho;


	if( is_array($arquivo) ) {
		
		$arquivo_novo = $arquivo[0];
		$arquivo_net = $arquivo[1];
		$arquivo_net .= ( strpos($arquivo,"?") )? "&campo=$nome": "?campo=$nome";
		
		
		$js_combo = " onkeyup=\"combo_novo('$nome',this.value,'$arquivo_novo')\" onFocus=\"combo_novo_abre('$nome')\" onBlur=\"combo_novo_fecha('$nome',0)\" ";
	} else {
		
		$arquivo_net = $arquivo;
		$arquivo_net .= ( strpos($arquivo,"?") )? "&campo=$nome": "?campo=$nome";
		// envia o nome do campo para o iframe, para ser usado ao fechar
		
		$js_combo = " onkeyup=combo_net_teclado('".$nome."')";
		// variavel para manter o versao antiga, se nao for passado o arquivo do combo_novo entao funciona apenas como combo_net normal (clickando na lupa)
	}
	
	$dir = explode("/",$PHP_SELF);
	$diretorio='';
	// acha o diretorio raiz do sistema

	
	$form = $NOME_FORM;

/*	$comp = "<table border=0 width=100%></tr><td class='$nome_class' valign=top  >";
*/
	$comp = "<div class='$nome_class'>";

	if( $direcao_div == 1 ) {
		$comp .= "<div class=combo_novo id=nova_div_".$nome."></div>";
	} // se o flag de direcao do div estiver setado acima
	
	$comp .= "<input class=campo_formulario type=text name=nome_".$nome." id=nome_".$nome."  value=\"".$valor2."\" autocomplete=off style='width:100%;' $extra $js_combo  tabindex=".$TABULACAO." > \n";

	if( $direcao_div == 0 ) {
		$comp .= "<div class=combo_novo id=nova_div_".$nome."></div>";
	} // se o flag de direcao do div estiver setado abaixo
	
	
//	$comp .=  "<a href=#>";
//	$comp .=  "<img border=0 src=$diretorio/cactus/imagens/visualizar.png onClick=combo_net('".$nome."')>";
//	$comp .=  "</a> \r\n";
	
	$comp .= "<input type=hidden id=$nome name=$nome_campo_form value=\"$valor1\">\r\n";
	$comp .= "<input type=hidden id=orig_".$nome." name=orig_".$nome_campo_form." value=\"$valor2\">\r\n";

	


	$comp .= "<div class=combo_net id=div_".$nome.">";
	$comp .= "<iframe name=frame_".$nome." id=frame_".$nome."  src=\"$arquivo_net\"  frameborder=\"yes\" width='700px' height='400' ></iframe>";
	$comp .= "</div>";

//	$comp .= "</td></tr></table>\n";
	$comp .= "</div>\n";
	
	
return $comp;
}


function combo_net($item, $nome, $valor1, $valor2,  $tamanho=10, $arquivo, $extra='') {
global $TABULACAO, $PHP_SELF, $AJAX, $CACTUX_CONF, $CONFIGURA;

	

	validar($item,$nome);  
	++$TABULACAO;
	
	if( is_array($tamanho) ) {
		$tamanho = $tamanho[0];
		$direcao_div = $tamanho[1];
	} else
		$direcao_div = 0;

	if( $CACTUX_CONF['path'] == '' ) {
		$diretorio='';
		// acha o diretorio raiz do sistema caso o cactux esteja na mesma pasta da do sistema
	} else {
		$diretorio=$CACTUX_CONF['path'];
		// acha o diretorio raiz do sistema caso o catux esteja uma pasta acima da do sistema
	} // nessa variavel path fica o caminho do sistema, se for em branco entao ele esta na propria raiz
	  // com isso o cactux ira buscar as imagens de modificar e excluir no diretorio correto
	
	
	

	$nome_class = "tamanho_".$tamanho;


	// DEFINE O NOME DO SISTEMA PARA SER ENVIADO AO COMBO_NET
	if( $_POST[sistemacactus] == '' )
		$_POST[sistemacactus] = $_GET[sistemacactus];
	$sistemacactus = "sistemacactus=$_POST[sistemacactus]";

	$nome_sistema = cactux_cookie::prefixo_cookie($CONFIGURA[NOME_SISTEMA]);
	
	$controle = $_SERVER[DOCUMENT_ROOT].$_COOKIE[$nome_sistema.'_sistema']."controle.php?arq=";
	
	
	if( is_array($arquivo) ) {
		
		$arquivo_novo = $arquivo[0];
		$arquivo_net = $arquivo[1];
		
		// VERIFICA SE JAH EXISTE O ? OU & PARA PODER ENCAMINHAR O NOME DO SISTEMASCACTUS AUTOMATICAMENTE
		$arquivo_novo .= ( strpos($arquivo_novo,"?") )? "&".$sistemacactus: "?".$sistemacactus;		
		$arquivo_net .= ( strpos($arquivo_net,"?") )? "&".$sistemacactus: "?".$sistemacactus;		
		
//		$arquivo_novo = $controle.dirname($PHP_SELF)."/".$arquivo_novo;
//		echo $arquivo_novo;
		
		$js_combo = " onkeyup=\"combo_novo('$nome',this.value,'$arquivo_novo',event)\" onFocus=\"combo_novo_abre('$nome')\" onBlur=\"combo_novo_fecha('$nome',0)\" ";
		
	} else {
		
		$arquivo_net = $arquivo;
		$arquivo_net .= ( strpos($arquivo,"?") )? "&campo=$nome": "?campo=$nome";
		// envia o nome do campo para o iframe, para ser usado ao fechar
		
		$js_combo = " onkeyup=combo_net_teclado('".$nome."')";
		// variavel para manter o versao antiga, se nao for passado o arquivo do combo_novo entao funciona apenas como combo_net normal (clickando na lupa)
	}
	

	if( trim($item{0}) == '!' )
		$item=substr($item,1);

	else
		if( trim($item{0}) != '*' ) // pra validar o combo_net por default
			$item = '* '.$item;
		
	validar($item,"nome_".$nome);  

	$form = $NOME_FORM;


	if( $_POST[cactux_tipo_form] == 'mobile' )
		$comp .= "\n<tr>";

	$comp .= "<td class='$nome_class' valign=top   style='position:relative;'>";
	
	$comp .= "$item $EXEMPLOS\n";

	if( $direcao_div == 1 ) {
		$comp .= "<div class=combo_novo id=nova_div_".$nome."></div>";
	} // se o flag de direcao do div estiver setado acima
	

	$comp .= "<table border=0 width=100% topmargin=0 leftmargin=0 rightmargin=0 bottommargin=0 cellpadding=0 cellspacing=0><tr><td><input class=campo_formulario type=text name=nome_".$nome." id=nome_".$nome."  value=\"".$valor2."\" autocomplete=off style='width:100%;'  $extra $js_combo  tabindex=".$TABULACAO." > \n";
	$comp .=  "</td><td align=right width='20px'>";
	$comp .=  "<a href=\"javascript:onClick=combo_net('".$nome."')\">";
	$comp .=  "<img border=0 src=$diretorio/cactus/imagens/visualizar.png >";
	$comp .=  "</a> \r\n";
	
	$comp .= "<input type=hidden id=$nome name=$nome value=\"$valor1\">\r\n";
	$comp .= "<input type=hidden id=orig_".$nome." name=orig_".$nome." value=\"$valor2\">\r\n";

	


	
	

	$comp .= "</td> </tr>  \n";
	$comp .= "<tr><td colspan=2>";

		if( $direcao_div == 0 ) {
//			$comp .= "<div class=combo_novo id=nova_div_".$nome."></div>";
			$comp .= "<div class=combo_novo_float id=nova_div_".$nome." style='z-index:999;'></div>";
			
			
		} // se o flag de direcao do div estiver setado abaixo
	
	$comp .= "</td> </tr> </table> \n";
	$comp .= "</td>\n";

	if( $_POST[cactux_tipo_form] == 'mobile' )
		$comp .= "\n</tr>";


	$comp .= "<div class=combo_net id=div_".$nome.">";
	$comp .= "<iframe name=frame_".$nome." id=frame_".$nome."  src=\"$arquivo_net\"  frameborder=\"yes\" width='700px' height='400' ></iframe>";
	$comp .= "</div>\r\n";
	$comp .= "<div id=combo_net_trava_".$nome." class=combo_net_trava>&nbsp;</div>";
	
	
return $comp;
}





function combo_net_antigo($item, $nome, $valor1, $valor2, $tamanho, $arquivo, $x=600, $y=400, $extra='') {
global $NOME_FORM, $TABULACAO, $PHP_SELF, $AJAX;


	validar($item,$nome);  
	++$TABULACAO;
	$nome_class = "tamanho_".$tamanho;


	$dir = explode("/",$PHP_SELF);
	$diretorio="/".$dir[1]."/";
	// acha o diretorio raiz do sistema

	if( trim($item{0}) == '!' )
		$item{0}='';
	else
		if( trim($item{0}) != '*' ) // pra validar o combo_net por default
			$item = '* '.$item;
		
	validar($item,"nome_".$nome);  

	$form = $NOME_FORM;

	$comp = "<td class='$nome_class'>";
	$comp .= "$item $EXEMPLOS\n";
	$comp .= "<input class=campo_formulario type=text name=nome_".$nome." value=\"".$valor2."\" style='width:90%' $extra tabindex=".$TABULACAO." onkeyup=combo_net('".$nome."','".$arquivo."',".$x.",".$y.",'".$form."')> \n";

	$comp .=  "<a href=#>";
	$comp .=  "<img border=0 src=$diretorio/cactus/imagens/localizar_net.gif onClick=buscar('".$nome."','".$arquivo."',".$x.",".$y.",'".$form."')>";
	$comp .=  "</a> \r\n";
	
	$comp .= "<input type=hidden name=$nome value=\"$valor1\">\r\n";
	$comp .= "<input type=hidden name=orig_".$nome." value=\"$valor2\">\r\n";
	
	$comp .= "</td>\n";
	
return $comp;
}


function textarea($item, $nome, $valor='', $tamanho='10', $rows='5', $extra='') {
	global $TABULACAO, $AJAX, $EXEMPLOS;
	
	validar($item,$nome);  
	++$TABULACAO;
	$nome_class = "tamanho_".$tamanho;

	if( $_POST[cactux_tipo_form] == 'mobile' )
		$comp .= "\n<tr>";
		
	$comp .= "<td class='$nome_class' valign=top>";
	$comp .= "$item $EXEMPLOS\n";
    $comp .= "<textarea name=$nome class=campo_formulario rows=$rows $extra tabindex=".$TABULACAO.">$valor</textarea> $EXEMPLOS\r\n";
    $comp .= "</td> \r\n";

	if( $_POST[cactux_tipo_form] == 'mobile' )
		$comp .= "\n</tr>";

return $comp;
}


function abre_fieldset($label='',$extra1='',$extra2='') {
	
	//$label = strtoupper($label);
	$label = formata_nome($label);
	if( $label != '' ) {
	
		if( $_POST[cactux_tipo_form] == 'mobile' ) 
			exibir_componente("<fieldset class=field $extra1 ><legend $extra2>$label</legend>");
		else
			exibir_componente("<fieldset class=field $extra1 ><legend class=relatorio $extra2>$label</legend>");
	} else
		exibir_componente("<fieldset class=field $extra1 >");

}

function fecha_fieldset() {	

	exibir_componente("</fieldset>");
	
}


function linha_fieldset() {

	// argumentos variaveis
	$arg = func_get_args();

	$t_arg = count($arg);
	for($i=0; $i!=$t_arg; $i++)
		$comp2[] = $arg[$i];

	
	if( $_POST[cactux_tipo_form] == 'mobile' ) {
		
		$comp = "<table border=0 width=100% topmargin=0 leftmargin=0 rightmargin=0 bottommargin=0>";
		$comp .= @implode($divisor,$comp2);
		$comp .= "</table>";
		
	} else {

		$divisor = "<td class='divisor'>&nbsp;</td>";
		
		$comp = "<table border=0 width=100% topmargin=0 leftmargin=0 rightmargin=0 bottommargin=0><TR>";
		$comp .= @implode($divisor,$comp2);
		$comp .= "<TD></TD></TR></table>";

	}
	
//	$divisor = "<td class='divisor'>&nbsp;</td>";
	
	
//	$comp = "<table border=1 width=100% topmargin=0 leftmargin=0 rightmargin=0 bottommargin=0>";
//	$comp .= @implode($divisor,$comp2);
//	$comp .= "</table>";
	

	
	
	exibir_componente($comp);
}
	
	
	
	
function abre_form($nome='',$acao='',$metodo='',$extra='') {
global $NOME_FORM, $PHP_SELF, $TABULACAO,$AJAX;

//$TABULACAO=1;


if( $nome == 'upload' ) {
	$nome='cadastro';
	$extra="enctype=multipart/form-data";
}
if( $nome == 'blank' ) {
	$nome='cadastro';
	$extra=' target=_blank';
}
if( $nome == 'get' ) {
	$nome = 'cadastro';
	$metodo = 'get';
}

$NOME_FORM = $nome;

if( $NOME_FORM == '') $NOME_FORM='cadastro';
if( $acao == '') $acao=$PHP_SELF;
if( $metodo == '') $metodo='post';


$valida = "$NOME_FORM.validar.value"; // os campos a validar estao em um hidden chamado 'validar'

$comp = "\r\n";
if( $AJAX != 'ativo' )
	$comp .= "<form style='margin: 0px;' id=$NOME_FORM name=\"$NOME_FORM\" method=\"$metodo\" action=\"$acao\" OnSubmit=\"return validaForm('$NOME_FORM','$valida')\"  $extra  >\r\n";
else
	$comp .= "<form style='margin: 0px;' name=\"$NOME_FORM\" method=\"$metodo\" action=\"$acao\" $extra OnSubmit=\"return false\" >\r\n";
//  OnSubmit=\"return validaForm('$NOME_FORM',$valida)\" 

$comp .= "<input type=hidden name=validar  >\r\n";
$comp .= "<input type=hidden name=foco value=1>\r\n";

exibir_componente($comp);

}

function fecha_form() {


	$comp = "\r\n";
	$comp .= "</form>\r\n";
	
	frame_interno();	
	exibir_componente($comp);

}

	
	
	
	// bd
	
function acao_modificar($tabela='',$id='',$layout='',$acao='modificar',$campos='',$valores='') {
	global $array2, $a_mod;

		if( $id == '' ) 
			$id = $_POST[id];

		if( $tabela=='') {
			global $TABELA;
			$tabela=$TABELA;
		}	
		if( $layout=='') {
			global $LAYOUT;
			$layout=$LAYOUT;
		}	
		
		
	if( acao() == $acao ) {
		
	    $array2 = carregar($tabela,$id,$campos,$valores);
		$a_mod = $array2;
		
		if (function_exists($layout)) {
			$layout();
			exit;
		}
		
	    return $array2;
		
		
	}

}
	
	
	
	/*** CACTUX ************************************************************************\
	DESCRICAO:NOVA FUNCAO QUE VAI PERTIR INCLUIR ARQUIVOS SEM CHAMAR O INDEX. VAI SERVIR
	PARA SE CHAMAR FUNCOES DE DENTRO DE ARQUIVOS QUE JÁ EXISTME SEM PRECISAR CRIAR NOVOS
	\***********************************************************************************/
	
	function incluir_arquivo($arq='') {
	global $CONFIGURA, $CACTUX_CONF;

		if( $arq == '' )
			return -1;
	
		$tela_out = file_get_contents($arq);

		$str_in = array("function index()", "controle()","CONTROLE()",'include "',"include '",'require "','require "');
		$str_out = array("function index_incluido()","//controle()","//CONTROLE()",'include_once "',"include_once '",'require_once "',"require_once '");
		
		$tela_out = str_replace($str_in,$str_out,$tela_out);
		
		// O EVAL() JAH COMECA COM O <? ABERTO. ENTAO SE O CODIGO QUE FOR INCLUIR COMECAR COM <? TB
		// VAI DAR UM ERRO. ENTAO SE FOR UM ARQUIVO PHP PRECISA PRIMEIRO FECHAR O PHP PARA QUE FUNCIONE
		if( $tela_out{0} == '<' && $tela_out{1} == '?' ) 
			$prefixo = '?>';
		
		echo eval( $prefixo . $tela_out);	
	
	}
	
	
}

function linha_form() {

	// argumentos variaveis
	$arg = func_get_args();

	$t_arg = count($arg);
	for($i=0; $i!=$t_arg; $i++)
		$comp2[] = $arg[$i];
	
	$divisor = "<td class=divisor>&nbsp;</td>";
	$comp = implode($divisor,$comp2);
	
	
	exibir_componente($comp."<BR>");
}


function campo_hidden($nome, $valor='') {

	$comp = "<input type=hidden name=$nome value=\"".$valor."\" > \r\n";

	exibir_componente($comp);
}

?>