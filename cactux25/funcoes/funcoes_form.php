<?php
@header("Content-Type: text/html;  charset=ISO-8859-1",true);
/*
?>
    <script type="text/javascript" src="/recrut/combo/javascripts/prototype.js"></script>
    <script type="text/javascript" src="/recrut/combo/javascripts/capxous.js"></script>
    <link rel="stylesheet" type="text/css" href="/recrut/combo/styles/capxous.css" /> 
<?
*/


function abre_fieldset($label='',$width='100%',$height='10') {
	
	$label = strtoupper($label);

	exibir_componente("<fieldset style=\"width=$width; height=$height\"><legend class=relatorio>$label</legend>");

}

function fecha_fieldset() {	

	exibir_componente("</fieldset>");
	
}


function textarea($item, $nome, $valor='', $cols='50', $rows='5', $extra='') {
	global $TABULACAO, $AJAX, $EXEMPLOS;
	

    $comp .= "<TR> \r\n";
    $comp .= "<TD class=item width=160> $item </TD> \r\n";
    $comp .= "<TD class=campo width=335> \r\n";

	if( $AJAX != 'ativo' )
    $comp .= "<textarea name=$nome cols=$cols rows=$rows $extra tabindex=".$TABULACAO++.">$valor</textarea> $EXEMPLOS\r\n";
    else
	$comp .= "<textarea name=$nome cols=$cols rows=$rows $extra tabindex=".$TABULACAO++." id=$valor></textarea>  $EXEMPLOS\r\n";

    $comp .= "</TD> \r\n";
    $comp .= "</TR> \r\n";

exibir_componente($comp);	

}


function combo_sugere($item, $nome, $valor='', $tamanho='', $campo='',$tabela='', $extra='', $lado='',$tam1='160',$tam2='335') {

if( $tabela=='' ) 	$tabela=$nome;
if( $campo=='') 	$campo=1;
if( $valor!='')		$a = modificar($tabela,$valor);
	
	
campo($item, $nome, $a[$campo], $tamanho, $extra, $lado,$tam1,$tam2);

?>

<script type="text/javascript">
   
    new CAPXOUS.AutoComplete("<?= $nome?>", function() {
        return "combo.php?acao=<?= $nome?>&t=" + this.text.value;
    });

</script>
<?




}



/**************************************************************************\
texto():                       

 Insere um  texto na pagina

 $item - Nome do item que aparecerá na tela  (Ex: Endereço:)
 $valor - Valor que aparecerá na tela  (Ex: $array2[ende_tx_nome])
 
 \**************************************************************************/

function texto($item, $valor='',$tab=1) {
    
if( $tab == 1 ) {


tabela(array($item,$valor),",item,texto",'d,e','155,335');
/*
    $comp .= "<TR> \r\n";
    $comp .= "<TD class=item width=155> $item </TD> \r\n";
    $comp .= "<TD class=texto width=335> \r\n";
    $comp .= $valor."\r\n";
    $comp .= "</TD> \r\n";
    $comp .= "</TR> \r\n";
    $comp .= "\r\n";
	*/
} else {
	$comp .= "<span class=texto>$valor</span> \r\n";
}

exibir_componente($comp);	
    
}

function texto_box($item, $valor='',$tab=1) {

	return array('texto', $item, $valor,$tab);
	
}

function campo_simples($nome, $valor='', $tamanho='', $extra='') {
global $TABULACAO;

	validar($item,$nome);  

    if( $tamanho != '' )
        $tam = " size=$tamanho ";

	$comp .= "<input type=text name=$nome value=\"".$valor."\" $tam $extra tabindex=".$TABULACAO++."> \r\n";

	exibir_componente($comp);
	
	//return $comp;
	
}




function campo_hidden($nome, $valor='') {

	$comp = "<input type=hidden name=$nome value=\"".$valor."\" > \r\n";

	exibir_componente($comp);
}


function campo_simples_ret($nome, $valor='', $tamanho='', $extra='', $lado='') {
global $TABULACAO, $AJAX, $EXEMPLOS;


    if( $tamanho != '' )
        $tam = " size=$tamanho ";

	if( $AJAX != 'ativo' )
		$comp .= "<input type=text name=$nome value=\"".$valor."\" $tam $extra tabindex=".$TABULACAO++."> $EXEMPLOS\r\n";
	else
		$comp .= "<input type=text name=$nome id=\"".$valor."\" $tam $extra tabindex=".$TABULACAO++."> $EXEMPLOS\r\n";

	
	return $comp;
}

function campo_ret($item, $nome, $valor='', $tamanho='', $extra='', $lado='',$tam1='160',$tam2='335') {
global $TABULACAO, $AJAX, $EXEMPLOS;

	validar($item,$nome);  
	

	if( $tam1 != '' ) $tam1='width='.$tam1;
	if( $tam2 != '' ) $tam2='width='.$tam2;
	

	$comp = "\r\n";
    //$comp .= "<TR> \r\n";
    $comp .= "<TD class=item $tam1> $item </TD> \r\n";
    $comp .= "<TD class=campo $tam2> \r\n";

	
	$comp .= campo_simples_ret($nome,$valor,$tamanho,$extra);
	
	if( $lado != '' ) {
		
		exibir_componente($comp);	$comp='';
		
		if( $lado{0} == '!' ) {		
		
			$comp .= substr($lado,1);
		
		} else		
		if( $lado{0} != '.' ) {

			$func1 = $lado[0];
			unset($lado[0]);
			
			call_user_func_array($func1,$lado);
		} else {

			eval(substr($lado,1).";");
		}
	}


    $comp .= "</TD> \r\n";
    //$comp .= "</TR> \r\n";
    $comp .= "\r\n";
	
	return $comp;
	


}


/**************************************************************************\
campo():                       

 Insere um campo de texto na pagina

 $item - Nome do item que aparecerá na tela  (Ex: Endereço:)
 $nome - Nome do campo de texto (Ex: endereco);
 $valor - Valor que aparecerá na tela em caso de atualização (Ex: $array2[ende_tx_nome])
 $tamanho - Define o tamanho do campo de texto (Ex: 40)  _OPCIONAL_
 $extra - Argumentos extras que poderam conter no campo (Ex: Javascripts) _OPCIONAL_
 
 \**************************************************************************/


function campo($item, $nome, $valor='', $tamanho='', $extra='', $lado='',$tam1='160',$tam2='335') {
global $TABULACAO, $AJAX, $EXEMPLOS;

	validar($item,$nome);  
	

	if( $tam1 != '' ) $tam1='width='.$tam1;
	if( $tam2 != '' ) $tam2='width='.$tam2;
	

	//if( $tab == 1 )		echo "<table border=0 cellSpacing=0 cellPadding=0>";
	$comp = "\r\n";
    $comp .= "<TR> \r\n";
    $comp .= "<TD class=item $tam1> $item </TD> \r\n";
    $comp .= "<TD class=campo $tam2> \r\n";

	
	$comp .= campo_simples_ret($nome,$valor,$tamanho,$extra);
	
	if( $lado != '' ) {
		
		exibir_componente($comp);	$comp='';
		
		if( $lado{0} == '!' ) {		
		
			$comp .= substr($lado,1);
		
		} else		
		if( $lado{0} != '.' ) {

			$func1 = $lado[0];
			unset($lado[0]);
			
			call_user_func_array($func1,$lado);
		} else {

			eval(substr($lado,1).";");
		}
	}


    $comp .= "</TD> \r\n";
    $comp .= "</TR> \r\n";
    $comp .= "\r\n";
   	//if( $tab == 1 )		echo "</table>";
	
	exibir_componente($comp);
	

	
}


function campo_box($item, $nome, $valor='', $tamanho=-1, $extra='') {

	return array('campo', $item, $nome, $valor, $tamanho, $extra,'','','');
	
}


function check_simples($nome, $valor, $marcar='', $extra='') {

	global $TABULACAO;
	if( $marcar == $valor ) $marcar = 'CHECKED';
	

    $comp .= " <input type=checkbox name=$nome value=\"".$valor."\" $extra $marcar style=\"border: 0px\"  tabindex=".$TABULACAO++."> \r\n";
	exibir_componente($comp);	

}


function check($item, $nome, $valor, $marcar='', $extra='', $tab='',$class='') {
	global $TABULACAO;
	if( $marcar == $valor ) $marcar = 'CHECKED';
	if( $tab=='' ) $tab=1;
	if( $class == '' ) $class='texto';
	

if( $tab==1 ) {
    $comp .= "<TR> \r\n";
    $comp .= "<TD class=item width=160> $item </TD> \r\n";
    $comp .= "<TD class=campo width=335> \r\n";
    $comp .= " <input type=checkbox name=$nome value=\"".$valor."\" $extra $marcar style=\"border: 0px\"  tabindex=".$TABULACAO++."> \r\n";
    $comp .= "</TD> \r\n";
    $comp .= "</TR> \r\n";
} else {

   $comp .= "<span class=$class> <input type=checkbox name=$nome $extra value=\"".$valor."\" $marcar  tabindex=".$TABULACAO++."> $item </span>\r\n";
}//style=\"border: 0px\" 

exibir_componente($comp);	

}

function check_box($item, $nome, $valor, $marcar='', $extra='', $tab=1) {
	
    return array("check",$item, $nome, $valor, $marcar, $extra, $tab);
}

function radio($item, $nome, $valor, $marcar='', $extra='', $tab=1) {
	global $TABULACAO;
	if( $marcar == $valor ) $marcar = 'CHECKED';
	

if( $tab==1 ) {
    $comp .= "<TR> \r\n";
    $comp .= "<TD class=item width=160> $item </TD> \r\n";
    $comp .= "<TD class=campo width=335> \r\n";
    $comp .= " <input type=radio name=$nome value=\"".$valor."\" $extra $marcar style=\"border: 0px\"  tabindex=".$TABULACAO++."> \r\n";
    $comp .= "</TD> \r\n";
    $comp .= "</TR> \r\n";
} else {

   $comp .= "<span class=texto> <input type=radio name=$nome $extra value=\"".$valor."\" $marcar tabindex=".$TABULACAO++."> $item </span>\r\n";
}//style=\"border: 0px\" 

exibir_componente($comp);	

}

function radio_box($item, $nome, $valor, $marcar='', $extra='', $tab=1) {
	
    return array("check",$item, $nome, $valor, $marcar, $extra, $tab);
}


function box($item1, $item2) {

$func1 = $item1[0];
unset($item1[0]);


$func2 = $item2[0];
unset($item2[0]);

//call_user_func_array($func1,$item1);

$comp .= "<TR><TD colspan=2>";
$comp .= "<table border=0 cellSpacing=0 cellPadding=0 width=100%>";
$comp .= "<TR>";
$comp .= "<TD width=50%> <TABLE border=0 cellSpacing=0 cellPadding=0>\r\n\r\n";
call_user_func_array($func1,$item1);
$comp .= "\r\n\r\n </table> </TD>";
$comp .= "<TD > <TABLE border=0 cellSpacing=0 cellPadding=0>";
call_user_func_array($func2,$item2);
$comp .= " </table> </TD>";
$comp .= "</TR>";
$comp .= "</table>";
$comp .= "</TD></TR>";

exibir_componente($comp);	

 
}

/**************************************************************************\
campo_senha():                       

 Insere um campo de senha na pagina

 $item - Nome do item que aparecerá na tela  (Ex: Endereço:)
 $nome - Nome do campo de texto (Ex: endereco);
 $valor - Valor que aparecerá na tela em caso de atualização (Ex: $array2[ende_tx_nome])
 $tamanho - Define o tamanho do campo de texto (Ex: 40)  _OPCIONAL_
 $extra - Argumentos extras que poderam conter no campo (Ex: Javascripts) _OPCIONAL_
 
 \**************************************************************************/

function campo_senha($item, $nome, $valor='', $tamanho=-1, $extra='') {
global $TABULACAO, $AJAX;
	validar($item,$nome);  


    if( $tamanho != -1 )
        $tam = " size=$tamanho ";
    
    $comp .= "<TR> \r\n";
    $comp .= "<TD class=item width=155> $item </TD> \r\n";
    $comp .= "<TD class=campo width=335> \r\n";

	if( $AJAX != 'ativo' )
    $comp .= "<input type=password name=$nome value=\"".$valor."\" $tam $extra  tabindex=".$TABULACAO++."> \r\n";
	else
    $comp .= "<input type=password name=$nome id=\"".$valor."\"  $tam $extra  tabindex=".$TABULACAO++."> \r\n";


    $comp .= "</TD> \r\n";
    $comp .= "</TR> \r\n";
    $comp .= "\r\n";
	exibir_componente($comp);	
    
}


/**************************************************************************\
campo_senha():                       

 Insere um campo de senha na pagina

 $item - Nome do item que aparecerá na tela  (Ex: Endereço:)
 $nome - Nome do campo de texto (Ex: endereco);
 $valor - Valor que aparecerá na tela em caso de atualização (Ex: $array2[ende_tx_nome])
 $tamanho - Define o tamanho do campo de texto (Ex: 40)  _OPCIONAL_
 $extra - Argumentos extras que poderam conter no campo (Ex: Javascripts) _OPCIONAL_
 
 \**************************************************************************/

function campo_arquivo($item, $nome, $valor, $tamanho=-1, $extra='') {
global $TABULACAO;
	validar($item,$nome);  

    if( $tamanho != -1 )
        $tam = " size=$tamanho ";
    
    $comp .= "<TR> \r\n";
    $comp .= "<TD class=item width=155> $item </TD> \r\n";
    $comp .= "<TD class=campo width=335> \r\n";
    $comp .= "    <input type=file name=$nome value=\"".$valor."\" $tam $extra  tabindex=".$TABULACAO++."> \r\n";
    $comp .= "</TD> \r\n";
    $comp .=  "</TR> \r\n";
    $comp .= "\r\n";
	
	exibir_componente($comp);
    
}


function combo_bd_ret($item, $nome, $valor1, $valor2, $tabela, $extra='', $campos='1',$nome_campo='1',$exibe='',$extrasql='') {
global $TABULACAO, $AJAX, $EXEMPLOS;



if( $tam = strpos($tabela,":") ) {

	$tabela2 = explode(":",$tabela);
	$tabela = $tabela2[0];
	$TAB = $tabela2[1];
} else
	$TAB = substr($tabela,0,4);

	
// campos, se comecar com um . ele joga pra o order by, senao trata como um campo normal na consulta sql	
if( $campos=='') $campos='1';

if( $campos{0} == "." ) {

	$campos=substr($campos,1);
	$extrasql .= " ORDER BY ".$TAB."_tx_".$campos;
	$campos='1';

} 
	
if( $item{0} == '@' ) {
	$SIMPLES=1;
	$item = substr($item,1);
}

if( $item{0} == '!' ) 
	$item2 = substr($item,1);
else
	$item2 = $item;

	validar($item2,$nome);  

	
	
if( $SIMPLES != 1 ) {	
	$comp .= "<TD class=item width=155> $item2 </TD> \r\n";
	$comp .= "<TD class=campo width=335> \r\n";
	$comp .= " \r\n";

}

if( $AJAX != 'ativo' ) {

	$comp .= "<select name=$nome $extra   tabindex=".$TABULACAO++."> \r\n";
	
} else
	$comp .= "<select name=$nome $extra  id=$valor1 tabindex=".$TABULACAO++."> \r\n";

	//if( $valor1 != '' && $valor2 != '' ) 
	//	$comp .= "<option id=\"$valor1\"> $valor2 </option>"; 

$comp .= " \r\n";

if( $item{0} == '!' )
	$comp .= "<option value=\"\">  </option> \r\n"; 


$sql_combo = selecionar($tabela,$TAB."_tx_status",'ativo',' AND '.$campos.$extrasql);

while( $array_combo = fetch_array($sql_combo) ) {  
	
	if( $exibe == '' )
		$mostra = substr($array_combo[$nome_campo],0,30);
	else {
		unset($mostra);
		for($j=0; $j!=count($exibe); $j++) {
		
			if( $exibe[$j]{0} != '.' ) 
				$mostra .= $exibe[$j];
			else 
				$mostra .= substr($array_combo[substr($exibe[$j],1)],0,30);
		}

	}
	

    if( $valor1 == $array_combo[0] && $valor2 != ''  ) {  
		$selecionado = "selected";
    } else {
		unset($selecionado);
	} // deixe selecionado o valor que foi entrado no campo modificar

	
	$comp .= "<option value=\"$array_combo[0]\" $selecionado>".$mostra." </option>\r\n"; 
} 
$comp .= "</select> $EXEMPLOS \r\n";

if( $SIMPLES != 1 ) {
	$comp .= "</TD> \r\n";
}

return $comp;



}

/**************************************************************************\
combo_bd():                       

 Insere um combo com consulta ao Banco de Dados SEM opção de edição

 $item - Nome do item que aparecerá na tela  (Ex: Endereço:)
 $nome - Nome do combo box (Ex: endereco);
 $valor1 - Valor que aparecerá na tela em caso de atualização (ID) (Ex: $array2[ende_nb_id])
 $valor2 - Valor que aparecerá na tela em caso de atualização (NOME) (Ex: $array2[ende_tx_nome])
 $tabela - Tabela contendo as infomrações para carregar no combo (Ex: endereco)  
 $campos
  $extra - Argumentos extras que poderam conter no campo (Ex: Javascripts) _OPCIONAL_
 
 \**************************************************************************/

function combo_bd($item, $nome, $valor1, $valor2, $tabela, $extra='', $campos='1',$nome_campo='1',$exibe='',$extrasql='') {
global $TABULACAO, $AJAX, $EXEMPLOS;

		
	if( $SIMPLES != 1 ) {	
		$comp .= "<TR> \r\n";
	}

		$comp .= combo_bd_ret($item, $nome, $valor1, $valor2, $tabela, $extra, $campos,$nome_campo,$exibe,$extrasql);


	if( $SIMPLES != 1 ) {
		$comp .= "</TR> \r\n";
	}

	exibir_componente($comp);
}



/**************************************************************************\
combo():                       

 Insere um combo simples passando os valores

 $item - Nome do item que aparecerá na tela  (Ex: Endereço:)
 $nome - Nome do combo box (Ex: endereco);
 $valor - Valores para o combo box (ID) (Ex: Masculino,Feminino)
 $modifica - Valor a ser exibido em caso de atualização (Ex: $array2[pess_tx_sexo])
 $extra - Argumentos extras que poderam conter no campo (Ex: Javascripts) _OPCIONAL_
 
 \**************************************************************************/
 
 
    
function combo($item, $nome, $valor, $modifica='', $extra='',$mostraValor=1, $lado='') {
global $TABULACAO, $AJAX;
	validar($item,$nome);  

if( !is_array($valor) ) {
	$valor = str_replace(", ",",",$valor);
	$valor2 = explode(",",$valor);
} else
	$valor2 = $valor;

	if( $item{0} == '!' )
		$item2 = substr($item,1);
	else
		$item2 = $item;
	
$comp = "<TR> \r\r";
$comp .= "<TD class=item width=155> $item2 </TD> \r\r";
$comp .= "<TD class=campo width=335> \r\r";
$comp .= " \r\r";

if( $AJAX != 'ativo' )
	$comp .= "<select name=$nome $extra tabindex=".$TABULACAO++."> \r\r";
else 
	$comp .= "<select id=$modifica name=$nome $extra tabindex=".$TABULACAO++."> \r\r";
	
//if( $_POST[acao] == 'modificar' || $mostraValor==0) { 
/*
if( $AJAX != 'ativo' )
	if( $modifica !='') { 
		$comp .= "<option value=\"$modifica\"> $modifica </option> \r\n";
}
*/ 

if( $item{0} == '!' ) {
	$comp .= "<option value=\"\"> </option> \r\n";
} 

for($i=0; $i!=count($valor2); $i++) {

	if( $valor2[$i] == $modifica )
		$sel = "selected";
	else
		unset($sel);

	$comp .= "<option value=\"$valor2[$i]\" $sel> $valor2[$i] </option> \r\n";
 /*   
    if( $modifica!=''  )  {
		
		if( $valor2[$i]!=$modifica ) {
			
			$comp .= "<option value=\"$valor2[$i]\"> $valor2[$i] </option> \r\n";
		}
		
	} else	{
		
		$comp .= "<option value=\"$valor2[$i]\"> $valor2[$i] </option> \r\n";
		
	} // faz com que o elemento escolhido nao se repita novamente
*/	
}

$comp .= "</select> \r\r";

if( $lado != '' ) {
	//eval(substr($lado,1).";");
	$comp .= "  $lado \r\r";
}

$comp .= "  \r\r";
$comp .= "</TD> \r\r";
$comp .= "</TR> \r\r";

exibir_componente($comp);
     
    }

function combo_box($item, $nome, $valor, $modifica, $extra='') {

	return array("combo",$item, $nome, $valor, $modifica, $extra);
}




/**************************************************************************\
combo_net():                       

 Insere um combo box para ser usado na internet 

 $item - Nome do item que aparecerá na tela  (Ex: Endereço:)
 $nome - Nome do combo box (Ex: endereco);
 $valor1 - Valor que aparecerá na tela em caso de atualização (ID) (Ex: $array2[ende_nb_id])
 $valor2 - Valor que aparecerá na tela em caso de atualização (NOME) (Ex: $array2[ende_tx_nome])
 $arquivo - Arquivo a ser chamado para edição do combo (Ex: cidade.php )
 $x - define a largura que tera a janela
 $y - define a altura que tera a janela
 
 \**************************************************************************/
    
function combo_net_ret($item, $nome, $valor1, $valor2, $arquivo, $x=550, $y=350, $extra='') {
global $NOME_FORM, $TABULACAO, $PHP_SELF, $AJAX;

//$diretorio=dirname($PHP_SELF);
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
	
$comp .= "<TD class=item width=155> $item </TD> \r\n";
$comp .= "<TD class=campo width=335> \r\n";

if( $AJAX != 'ativo' ) {
	$comp .= "<input type=text name=nome_".$nome." value=\"$valor2\" $extra onkeyup=combo_net('".$nome."','".$arquivo."',".$x.",".$y.",'".$form."') tabindex=".$TABULACAO++.">  \r\n";
	$comp .= "<input type=hidden name=orig_".$nome." value=\"$valor2\" > \r\n";
} else {
	$comp .= "<input type=text id=$valor2 name=nome_".$nome." $extra onkeyup=combo_net('".$nome."','".$arquivo."',".$x.",".$y.",'".$form."') tabindex=".$TABULACAO++.">  \r\n";
	$comp .= "<input type=hidden id=$valor2 name=orig_".$nome." > \r\n";
}
$comp .=  "<a href=#>";

$comp .=  "<img border=0 src=$diretorio/imagens/localizar.gif onClick=buscar('".$nome."','".$arquivo."',".$x.",".$y.",'".$form."')>";
$comp .=  "</a> \r\n";

if( $AJAX != 'ativo' )
	$comp .=  "<input type=hidden name=$nome value=\"$valor1\" > \r\n";
else
	$comp .=  "<input type=hidden name=$nome id=\"".$valor1."\" > \r\n";

$comp .=  "</TD> \r\n";


return $comp;

}

function combo_net($item, $nome, $valor1, $valor2, $arquivo, $x=550, $y=350, $extra='') {

	$comp  = "<TR> \r\n";
	$comp .= combo_net_ret($item, $nome, $valor1, $valor2, $arquivo, $x, $y, $extra);
	$comp .= "</TR> \r\n";
	
	exibir_componente($comp);	
}


function combo_div($item, $nome, $valor1, $valor2, $arquivo, $tamanho=20, $extra='') {
global $NOME_FORM, $TABULACAO, $PHP_SELF, $AJAX, $EXEMPLOS;

    if( $tamanho != '' )
        $tam = " size=$tamanho ";

if( is_array($arquivo) ) {
	
	$arq_orig = $arquivo[0];
	$arq_fig = $arquivo[1];
} else {
	
	$arq_orig = $arquivo;
	$arq_fig = "cadastros.php?c=$nome";
}

/*
$ar = explode(".",$arquivo);
$arquivo = $ar[0];

$arquivo = $arquivo.$TABULACAO;
*/

//$diretorio=dirname($PHP_SELF);
$dir = explode("/",$PHP_SELF);
//$diretorio="/".$dir[1]."/";
$diretorio='';

// acha o diretorio raiz do sistema

	if( trim($item{0}) == '!' )
		$item{0}='';
	else
		if( trim($item{0}) != '*' ) // pra validar o combo_net por default
			$item = '* '.$item;
		
	validar($item,"@".$nome);  


	$form = $NOME_FORM;
	
$comp .= "<TR> \r\n";
$comp .= "<TD class=item width=155> $item </TD> \r\n";
$comp .= "<TD class=campo width=335 valign=top> \r\n";

if( $AJAX != 'ativo' ) {
	$comp .= "<input type=text autocomplete=off id=nome_".$nome." name=nome_".$nome." value=\"$valor2\" $tam $extra onKeyUp=\"envia_div('$arq_orig','$NOME_FORM','$nome')\" onKeyDown=\"return envia_div_sel('$arq_orig','$NOME_FORM','$nome')\" onFocus=abre_div('$NOME_FORM','$nome') onBlur=fecha_div('$NOME_FORM','$nome',0) tabindex=".$TABULACAO++.">  \r\n";
	//$comp .= "<input type=text autocomplete=off id=nome_".$nome." name=nome_".$nome." value=\"$valor2\" $tam $extra onKeyUp=\"envia_div2('$arq_orig','$NOME_FORM','$nome')\" onKeyDown=\"return envia_div_sel2('$arq_orig','$NOME_FORM','$nome')\" onFocus=abre_div2('$NOME_FORM','$nome') onBlur=fecha_div2('$NOME_FORM','$nome',0) tabindex=".$TABULACAO++.">  \r\n";
	$comp .=  "<input type=hidden name=$nome value=\"$valor1\" > \r\n";
	$comp .= "<input type=hidden name=orig_".$nome." value=\"$valor2\" > \r\n";
} else {
	$comp .= "<input type=text autocomplete=off id=".$valor2." name=nome_".$nome."  $tam $extra onKeyUp=\"envia_div('$arq_orig','$NOME_FORM','$nome')\" onKeyDown=\"return envia_div_sel('$arq_orig','$NOME_FORM','$nome')\" onFocus=abre_div('$NOME_FORM','$nome') onBlur=fecha_div('$NOME_FORM','$nome',0) tabindex=".$TABULACAO++.">  \r\n";
	$comp .= "<input type=hidden id=$valor1 name=$nome > \r\n";
	$comp .= "<input type=hidden name=orig_".$nome." id=orig_".$nome."  > \r\n";
}
//$comp .= "<input type=text autocomplete=off id=nome_".$nome." name=nome_".$nome." value=\"$valor2\" $tam $extra onKeyUp=\"envia_div('$arq_orig','$NOME_FORM','$nome')\" onKeyDown=\"return makeFrame2()\" onFocus=abre_div('$NOME_FORM','$nome') onBlur=fecha_div('$NOME_FORM','$nome',0) tabindex=".$TABULACAO++.">  \r\n";
$comp .= "<a href=#>";


//$comp .=  "<img onClick=abre_div('$NOME_FORM','$nome') id=img_".$nome." border=0 src=$diretorio/imagens/localizar.gif >";
//$comp .=  "<img border=0 src=$diretorio/imagens/localizar.gif onClick=buscar('".$nome."','".$arquivo."',300,300,'".$form."')>";
$comp .=  "<img border=0 src=$diretorio/imagens/localizar.gif onClick=buscar('$nome','$arq_fig',530,400,'".$form."')>";

$comp .=  "</a> $EXEMPLOS\r\n";


$comp .= "<div style=display:none id=div_".$nome.">";
$comp .= "<iframe name=frame_".$nome." id=frame_".$nome." src=\"$arq_orig\" height=0 scrolling=\"no\" frameborder=\"no\"></iframe>";
$comp .= "</div>";




$comp .=  "</TD> \r\n";
$comp .= "</TR> \r\n";

exibir_componente($comp);



}



function combo_flex($item, $nome, $valor, $modifica='', $extra='',$mostraValor=1, $lado='') {
global $TABULACAO, $AJAX;
	validar($item,$nome);  

if( !is_array($valor) ) {
	$valor = str_replace(", ",",",$valor);
	$valor2 = explode(",",$valor);
} else
	$valor2 = $valor;

if( $item{0} == '@' ) {
	$SIMPLES=1;
	$item = substr($item,1);
} // faz com que ele seja criado fora da tabela
	
if( $item{0} == '!' )
	$item2 = substr($item,1);
else
	$item2 = $item;

	
if( $SIMPLES != 1 ) {	
	$comp = "<TR> \r\r";
	$comp .= "<TD class=item width=155> $item2 </TD> \r\r";
	$comp .= "<TD class=campo width=335> \r\r";
	$comp .= " \r\r";
}

if( $AJAX != 'ativo' )
	$comp .= "<select name=$nome $extra tabindex=".$TABULACAO++."> \r\r";
else 
	$comp .= "<select id=$modifica name=$nome $extra tabindex=".$TABULACAO++."> \r\r";
	
//if( $_POST[acao] == 'modificar' || $mostraValor==0) { 
if( $modifica !='') { 

	if( strpos($modifica,":") ) {
	
		$m = explode(":",$modifica);
		$comp .= "<option value=\"$m[0]\"> $m[1] </option> \r\n";
	} else
		$comp .= "<option value=\"$modifica\"> $modifica </option> \r\n";
}
 

if( $item{0} == '!' )
	$comp .= "<option value=\"\"> </option> \r\n";
	 
for($i=0; $i!=count($valor2); $i++) {

	if( strpos($valor2[$i],":") ) {
		
		$m = explode(":",$valor2[$i]);
	} else
		$m[1] = $valor2[$i];

    //if( ($_POST[acao] == 'modificar' || $mostraValor==0)  )  {
    if( $modifica!=''  )  {
		if( $m[1]!=$modifica )
			//printf("<option value=\"%s\"> %s </option>\r\n",$valor2[$i],$valor2[$i]);
			$comp .= "<option value=\"$m[0]\"> $m[1] </option> \r\n";
	} else	{
		//printf("<option value=\"%s\"> %s </option>\r\n",$valor2[$i],$valor2[$i]);
		$comp .= "<option value=\"$m[0]\"> $m[1] </option> \r\n";
	} // faz com que o elemento escolhido nao se repita novamente
}

$comp .= "</select> \r\r";

if( $lado != '' ) {
	//eval(substr($lado,1).";");
	$comp .= "  $lado \r\r";
}

if( $SIMPLES != 1 ) {	
	$comp .= "  \r\r";
	$comp .= "</TD> \r\r";
	$comp .= "</TR> \r\r";
}

exibir_componente($comp);
     
    }

  
function combo_simples($nome, $valor, $modifica='', $extra='',$mostraValor=1, $lado='') {
global $TABULACAO, $AJAX;
	
	

if( !is_array($valor) ) {
	$valor = str_replace(", ",",",$valor);
	$valor2 = explode(",",$valor);
} else
	$valor2 = $valor;


if( $AJAX != 'ativo' )
	$comp .= "<select name=$nome $extra tabindex=".$TABULACAO++."> \r\r";
else 
	$comp .= "<select id=$modifica name=$nome $extra tabindex=".$TABULACAO++."> \r\r";
	
//if( $_POST[acao] == 'modificar' || $mostraValor==0) { 
if( $modifica !='') { 

	if( strpos($modifica,":") ) {
	
		$m = explode(":",$modifica);
		$comp .= "<option value=\"$m[0]\"> $m[1] </option> \r\n";
	} else
		$comp .= "<option value=\"$modifica\"> $modifica </option> \r\n";
}
 

if( $item{0} == '!' )
	$comp .= "<option value=\"\"> </option> \r\n";
	 
for($i=0; $i!=count($valor2); $i++) {

	if( strpos($valor2[$i],":") ) {
		
		$m = explode(":",$valor2[$i]);
	} else
		$m[1] = $valor2[$i];

    //if( ($_POST[acao] == 'modificar' || $mostraValor==0)  )  {
    if( $modifica!=''  )  {
		if( $m[1]!=$modifica )
			//printf("<option value=\"%s\"> %s </option>\r\n",$valor2[$i],$valor2[$i]);
			$comp .= "<option value=\"$m[0]\"> $m[1] </option> \r\n";
	} else	{
		//printf("<option value=\"%s\"> %s </option>\r\n",$valor2[$i],$valor2[$i]);
		$comp .= "<option value=\"$m[0]\"> $m[1] </option> \r\n";
	} // faz com que o elemento escolhido nao se repita novamente
}

$comp .= "</select> \r\r";

if( $lado != '' ) {
	//eval(substr($lado,1).";");
	$comp .= "  $lado \r\r";
}


exibir_componente($comp);
     
    }
  
    
    
?>