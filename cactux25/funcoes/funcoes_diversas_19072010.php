<?php

//$MASCARA_VALOR = "maxlenght=14 onkeyUP=formataValor(this,11,3,event)";
$MASCARA_VALOR = "onkeypress=reais(this,event) onkeydown=backspace(this,event) ";
$MASCARA_CPF = "maxlenght=11 onkeyUP=formataCPF(this,11,2,event)";
$MASCARA_CNPJ = "maxlenght=14 onkeyUP=formataCPF(this,14,2,event)";
$MASCARA_CEP = "maxlength=9 onkeyUP=formataDado(this,9,3,event)";
$MASCARA_FONE = "maxlength=12 onkeyUP=formatatel(this,10,3,event)";
$MASCARA_DATA = "maxlength=10  onkeyUP=formataData(this,10,2,event)";
$MASCARA_PLACA = "maxlength=9 onkeyUP=formataPlaca(this,7,4,event)";
//$MASCARA_NUMERO = " onkeypress='return SomenteNumero(event)'";
$MASCARA_NUMERO = "maxlength=9 onkeyUP=validaDigitos(this)";

define('MASCARA_VALOR',$MASCARA_VALOR);
define('MASCARA_CPF',$MASCARA_CPF);
define('MASCARA_CNPJ',$MASCARA_CNPJ);
define('MASCARA_CEP',$MASCARA_CEP);
define('MASCARA_FONE',$MASCARA_FONE);
define('MASCARA_DATA',$MASCARA_DATA);
define('MASCARA_PLACA',$MASCARA_PLACA);
define('MASCARA_NUMERO',$MASCARA_NUMERO);




function javascript($cmd) {

	echo "<script>".$cmd."</script>";
}



/**************************************************************************\
CONTROLE():                    

Função que faz a intermediação entre as ações dos formularios atravez da variavel $_POST[acao]
com as respectivas funções evitando assim o uso de if's

$acoes - 
$funcoes - 
 
 \**************************************************************************/

function CONTROLE($acoes='',$funcoes='') {
	
	if( !$_POST[acao] && $_GET[acao] ) $_POST[acao] = $_GET[acao];
	// se nao existir o post mas existir o get!

	if( $_POST[acao] ) {
		
		if( $acoes ) {
			if( $_POST[acao] == $acoes && function_exists($_POST[acao]) )
				if( acao() != 'modificar' && acao() != 'excluir' )				
					$funcoes();
		} else {
			if( acao() != 'modificar' && acao() != 'excluir' ) 
				$_POST[acao]();
				
		} // se tiver sido definida as acoes execulta, senao execulta a funcao com o nome da ação
		
	} // se tiver alguma ação

			

	if( $_POST[acao] == 'modificar' ||  $_POST[acao] == 'excluir' || !$_POST[acao] ) {
		if (function_exists('index')) 
			index();
		if (function_exists('layout')) 
			layout();
	} // se nao tiver nenhuma acao execulta a funcao padrão layout() ou index()

}		



function setDestino($destino) {
global $TARGET;

	$TARGET=$destino;
}

function mesExtenso($mes='') {

	if( $mes == '' ) $mes = date("m");
	
	switch( $mes ) {
	case 1:		$mes = "Janeiro"; break;
	case 2:		$mes = "Fevereiro"; break;
	case 3:		$mes = "Março"; break;
	case 4:		$mes = "Abril"; break;
	case 5:		$mes = "Maio"; break;
	case 6:		$mes = "Junho"; break;
	case 7:		$mes = "Julho"; break;
	case 8:		$mes = "Agosto"; break;
	case 9:		$mes = "Setembro"; break;
	case 10:	$mes = "Outubro"; break;
	case 11:	$mes = "Novembro"; break;
	case 12:	$mes = "Dezembro"; break;
	}

	return $mes;
}

function mesNum($mes='',$zero=0) {


	switch($mes) {
	case 'Janeiro': 	$mes=1; break;
	case 'Fevereiro': 	$mes=2; break;
	case 'Março': 		$mes=3; break;
	case 'Abril': 		$mes=4; break;
	case 'Maio': 		$mes=5; break;
	case 'Junho': 		$mes=6; break;
	case 'Julho': 		$mes=7; break;
	case 'Agosto': 		$mes=8; break;
	case 'Setembro': 	$mes=9; break;
	case 'Outubro': 	$mes=10; break;
	case 'Novembro': 	$mes=11; break;
	case 'Dezembro': 	$mes=12; break;
	}

	
	if( $zero == 1 ) {
		
		if( $mes < 10 )
			$mes = "0".$mes;
		
	}
	
	return $mes;
}




function valorExtenso($valor=0) {
	$singular = array("centavo", "real", "mil", "milhão", "bilhão", "trilhão", "quatrilhão");
	$plural = array("centavos", "reais", "mil", "milhões", "bilhões", "trilhões",
"quatrilhões");

	$c = array("", "cem", "duzentos", "trezentos", "quatrocentos",
"quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos");
	$d = array("", "dez", "vinte", "trinta", "quarenta", "cinquenta",
"sessenta", "setenta", "oitenta", "noventa");
	$d10 = array("dez", "onze", "doze", "treze", "quatorze", "quinze",
"dezesseis", "dezesete", "dezoito", "dezenove");
	$u = array("", "um", "dois", "três", "quatro", "cinco", "seis",
"sete", "oito", "nove");

	$z=0;

	$valor = number_format($valor, 2, ".", ".");
	$inteiro = explode(".", $valor);
	for($i=0;$i<count($inteiro);$i++)
		for($ii=strlen($inteiro[$i]);$ii<3;$ii++)
			$inteiro[$i] = "0".$inteiro[$i];

	// $fim identifica onde que deve se dar junção de centenas por "e" ou por "," ;)
	$fim = count($inteiro) - ($inteiro[count($inteiro)-1] > 0 ? 1 : 2);
	for ($i=0;$i<count($inteiro);$i++) {
		$valor = $inteiro[$i];
		$rc = (($valor > 100) && ($valor < 200)) ? "cento" : $c[$valor[0]];
		$rd = ($valor[1] < 2) ? "" : $d[$valor[1]];
		$ru = ($valor > 0) ? (($valor[1] == 1) ? $d10[$valor[2]] : $u[$valor[2]]) : "";
	
		$r = $rc.(($rc && ($rd || $ru)) ? " e " : "").$rd.(($rd &&
$ru) ? " e " : "").$ru;
		$t = count($inteiro)-1-$i;
		$r .= $r ? " ".($valor > 1 ? $plural[$t] : $singular[$t]) : "";
		if ($valor == "000")$z++; elseif ($z > 0) $z--;
		if (($t==1) && ($z>0) && ($inteiro[0] > 0)) $r .= (($z>1) ? " de " : "").$plural[$t]; 
		if ($r) $rt = $rt . ((($i > 0) && ($i <= $fim) &&
($inteiro[0] > 0) && ($z < 1)) ? ( ($i < $fim) ? ", " : " e ") : " ") . $r;
	}

	return($rt ? $rt : "zero");
}


function ordena_click($desc,$ordena='',$extra='',$busca='') {

	if( $ordena == '' ) $ordena='id';
	
	$r = "<a class=link_ordena href=".$PHP_SELF."?o=".$ordena."&busca=".$_GET[busca]."&n=".$_GET[n].$extra.">".$desc."</a>";

	return $r;
}

function ordena_busca($p='') {

	if( $_GET[o] ) {
		
		if( $_GET[o] == $_SESSION[ordena] ) {
			$_SESSION[ordena] .= " DESC";
		} else { 
			unset($_SESSION[ordena]);
			$_SESSION[ordena]=$_GET[o];
		} // faz com que se inverta a ordem da consulta caso click novamento no mesmo link
	} else {
		
		if( $p == '' )
			unset($_SESSION[ordena]);
		else
			$_SESSION[ordena]=$p;
	}
	
	return $_SESSION[ordena];
}


function set_status($msg='') {

	if( $msg == '' )
		global $msg;

	$_POST[msg_status] = $msg;
	
}

function get_status() {

	return $_POST[msg_status];
}

function acao($acao='') {

	if( $acao ) 
		$_POST[acao] = $acao;
		
	return $_POST[acao];
}

function pegaId($tabela,$campo,$valor) {

	$a = modificar($tabela,'',$campo,$valor);
	if( $a == '' ) {
		
		$campos=array($campo,substr($campo,0,4)."_tx_status");
		$valores=array($valor,ativo);
		inserir($tabela,$campos,$valores);
		return ultimo_reg($tabela);
	} else 
		return $a[0];
	

}

function fimPagina($desconto='',$tabTam='',$fora=0,$borda='',$extra='') {
global $linhas, $TOTAL_LINHAS;

if($desconto=='') $desconto=0;
if($tabTam=='') $tabTam='95%';


	if( $linhas+$desconto >= $TOTAL_LINHAS ) {
	
		$linhas=0;

		if( $fora==0 )
			fecha_tabela();
		peRelatorio();
		cabecaRelatorio();
		if( $fora==0 )
			abre_tabela($tabTam,$borda,'','',$extra);
	} // testa se chegou ao fim da pagina

}

function resto($a,$b) {

	$c = $a/$b;
	$d = explode(".",$c);
	if( $d[1] > 9 )
		$d[1]/=10;
	
	return $d[1];
}

function is_number($var){
  return (is_numeric($var)&&(intval($var)==floatval($var)));
}

function parcelar($total,$x) {

$totalMv = $total;
$x=$_POST[parcelas];
//echo "Total=$totalMv em $x<BR><BR>";

//if( !is_number($total/$x) ) {
	$resto = (floatval($total/$x)-intval($total/$x))*$x;
//echo $resto."<BR>";
	$total2 = $total-$resto;
//echo $total2."<BR>";
	$valorParcelas[] = ($total2/$x)+$resto;

	for($i=1;$i!=$x;$i++) {
		$valorParcelas[] = ($total2/$x);
		
	}

//}

return $valorParcelas;

}



function chamar_pag($acao,$campos='',$valores='', $extra='') {

//$nome=substr($acao,0,5);
$nome='form'.substr($acao,0,2).mt_rand(1,9999);

$CAMPO = explode(",",$campos);
$VALOR = explode(",",$valores);

echo "<form name=\"$nome\" method=post action=$acao $extra>";
	for($i=0; $i!=count($CAMPO); $i++) 
		echo "<input type=hidden name=\"".trim($CAMPO[$i])."\" value=\"".trim($VALOR[$i])."\"> \r\n";
echo "</form> \r\n";
echo "<script>";
echo "	document.onload=$nome.submit();";
echo "</script>\r\n";

}


function valor($num) {

  $numero = str_replace('.', '', $num); // retira o ponto da milhar
  return str_replace(',', '.', $numero); // troca a virgula da centena por ponto

} 


function mostra_valor($num,$zero='',$tipo='') {

	if( $num != '') {
		
		if( $zero == 2 && $num == 0 )
			$retorno = '';
		else
			$retorno = number_format($num, 2, ',', '.') ;
		
	} else {
		
		if( $zero != '' ) {
			$retorno = '0,00';
		} 
	}
	
	if( $tipo == '' )
		return $retorno;
	else
		return $tipo.$retorno; 


} 


/*
function mostra_valor($num,$tipo='') {

	if( $num != '')
		$retorno = number_format($num, 2, ',', '.') ;
	else 
		if( $tipo != '' )
			$retorno = '0,00';
	
  
  return $retorno;

} 
*/
/**************************************************************************\
enviar():                       
                                    
 faz o UPLOAD de um arquivo
 
 $NOME - nome do campo do arquivo
 $DIR - diretorio de destino do arquivo
 $sobreescreve - defina como 1 caso dejesa poder sobreescrever o arquivo _OPCIONAL_
 
\**************************************************************************/

function enviar($NOME, $DIR, $arq, $sobreescreve=0,$debug=0) {

$arquivo = isset($_FILES[$NOME]) ? $_FILES[$NOME] : FALSE; 

$diretorio = $_SERVER[DOCUMENT_ROOT].$DIR;
//$diretorio = $DIR;

//$hora =  date("dmYHis");


$arquivo['name'] = $arq.substr($arquivo['name'],-4 );

$nome = $diretorio . $arquivo['name'] ;

if( $debug!=0 ) 
	echo $nome;
if(file_exists($nome) && $sobreescreve==0) { 
    $msg = "ERRO: Um arquivo com esse nome já foi enviado! <BR>Por favor renomei o arquivo e tente novamente";
} else {

   if (move_uploaded_file($arquivo['tmp_name'], $nome)) { 
       $msg=$nome;
   } else { 
      $msg = "ERRO: Imposível enviar o arquivo!"; 
   } 

}

return $msg;
}


/**************************************************************************\
zeros():                       
                                    
 Coloca zeros a esquerda de um numero
 
 $num - Numero que se deseja inserir os 0's
 $MAX - Numero de casas máximo que o numero pode ter
 
\**************************************************************************/


function zeros($num, $MAX) {



$tam = $MAX - strlen($num);

if( $tam < $MAX ) {
   for($j=0; $j!=$tam; $j++) {
      $num = "0".$num;
   }
}

return $num;

}

/**************************************************************************\
 formata_nome():                       
                                    
 Formata a string deixando apenas a 1 letra maiusculo
\**************************************************************************/

function formata_nome($nome,$limite='') {

$errado = Array("Do ","De ","Da ","E ", "Das ","Dos ","Ã","Á","À","Â","É","Ê","Í","Ó","Ô","Õ","Ç");
$certo = Array("do ","de ","da ","e ", "das ","dos ", "ã","á","à","â","é","ê","í","ó","ô","õ","ç");

$nome = trim(ucfirst(str_replace($errado,$certo,ucwords(strtolower($nome)))));

if( $limite != '' )
	$nome = substr($nome,0,$limite);

return $nome;
}



/**************************************************************************\
 gera_data():                       
                                    
 Transforma a data de entrada no formato unix timestamp 
\**************************************************************************/


/*
function gera_data($data,$tipo=0) {

if( $data != '' ) 

if( !$tipo ) { // se for pra transformar em timestamp

	if( $data == '30' ) {

		$data = mktime(0,0,0,date("m")+1, date("d"), date("Y"));
		
	} else {

		if( $data == 'hoje' ) 
		  $data = date("d/m/Y");
			
		$data2=explode("/",$data);
		$data = mktime(0,0,0,$data2[1], $data2[0], $data2[2]);
	}

	if( $data == -1 ) 
		trata_erro("Data inválida");
		
} else { // se for pra transformar no formato do MySQL ano-mes-dia

		if( $data == 'hoje' ) 
		  $data = date("d/m/Y");
			
		$data2 = explode("/",$data);
		
		if( count($data2) == 2 ) {
			$data = "0000-".$data2[1]."-".$data2[0];
		} else {
			$data = $data2[2]."-".$data2[1]."-".$data2[0];
		}
}

return $data;
}

*/


function gera_data($data,$tipo=0) {

if( $data != '' ) 

switch( $tipo ) { // se for pra transformar em timestamp
case 0:
	if( $data == '30' ) {

		$data = mktime(0,0,0,date("m")+1, date("d"), date("Y"));
		
	} else {

		if( $data == 'hoje' ) 
		  $data = date("d/m/Y");
		if( $data == 'ontem');
			$data = date("d/m/Y",mktime(0,0,0,date("m"), date("d")-1, date("Y")));
		  
			
		$data2=explode("/",$data);
		$data = mktime(0,0,0,$data2[1], $data2[0], $data2[2]);
	}

	if( $data == -1 ) 
		trata_erro("Data inválida");
break;		
case 1: 
 // se for pra transformar no formato do MySQL ano-mes-dia

		if( $data == 'hoje' ) 
		  $data = date("d/m/Y");
		if( $data == 'ontem');
			$data = date("d/m/Y",mktime(0,0,0,date("m"), date("d")-1, date("Y")));
			
		$data2 = explode("/",$data);
		
		if( count($data2) == 2 ) {
			$data = "0000-".$data2[1]."-".$data2[0];
		} else {
			$data = $data2[2]."-".$data2[1]."-".$data2[0];
		}
		
break;		
case 2:

		if( $data == 'hoje' ) 
		  $data = date("d/m/Y");
		if( $data == 'ontem');
			$data = date("d/m/Y",mktime(0,0,0,date("m"), date("d")-1, date("Y")));
			
		$data2=explode("/",$data);
		$data = mktime(date("H"),date("i"),date("s"),$data2[1], $data2[0], $data2[2]);

break;
case 3: 
 // se for pra transformar no formato do MySQL ano-mes-dia hora-minuto-segundo

		if( $data == 'hoje' ) 
		  $data = date("d/m/Y H:i:s");
		if( $data == 'ontem');
			$data = date("d/m/Y",mktime(0,0,0,date("m"), date("d")-1, date("Y")));
		
		$data3 = explode(" ",$data);
		
		$data2 = explode("/",$data3[0]);
		
		if( count($data2) == 2 ) {
			$rdata = "0000-".$data2[1]."-".$data2[0];
		} else {
			$rdata = $data2[2]."-".$data2[1]."-".$data2[0];
		}
		
		$data = $rdata." ".$data3[1];
break;		
} 	

return $data;
}


function mostra_data($data,$tipo=0) {
	
	data($data,$tipo);
}

function data($data='',$tipo=0) {

if( $data != '' ) {

	if( $tipo == 0 ) { // se for pra transformar de timestamp pra normal
		
		$r = gmdate("d/m/Y",$data);
		
	} 
	
	if( $tipo == 1 ) { // se for pra transformar do formato do mysql ano-mes-dia para o normal
		
		@$data3 = explode(" ",$data); // caso seja datetime e nao apenas date
		$data2 = explode("-",$data3[0]);
		
		if( $data[0] == '0000' )
			$r = $data2[2]."/".$data2[1];
		else
			$r = $data2[2]."/".$data2[1]."/".$data2[0];
	}	

	if( $tipo == 2 ) { // se for pra transformar do formato do mysql ano-mes-dia para o normal
		
		$data2 = explode(" ",$data);
		
		$r = $data2[1];
		
		
	}	
	if( $tipo == 3 ) {
		
		@$data3 = explode(" ",$data); // caso seja datetime e nao apenas date
		$data2 = explode("-",$data3[0]);
		
		if( $data[0] == '0000' )
			$r = $data2[2]."/".$data2[1]. " ($data3[1])";
		else
			$r = $data2[2]."/".$data2[1]."/".$data2[0]. " ($data3[1])";
	
	}

return $r;
}

}


/**************************************************************************\
trata_erro():                       
                                    
 Trata um possivel erro numa consulta SQL
\**************************************************************************/

function trata_erro($msg='') {

if( $msg == '' ) $msg = $sql.mysql_error();

echo $msg;
exit;


}




/**************************************************************************\
Buscador():                       
                                    
 Insere um formulario de busca simples
 
 $tabela - Tabela a ser buscada
 $campos - Campos na tabela a serem buscados
 $status - 
 
\**************************************************************************/


function Buscador($tabela, $campos, $h1='',$h2='', $status='', $ordena='', $extra='',$extraForm='', $extraFim='', $log=0,$MAX_PAG=10) {
global $PHP_SELF; // para pegar a variavel do arquivo que a chama!


if( $ordena=='' ) $ordena='id';

//abre_form('busca','','get');
echo "<form name=busca method=get action=$PHP_SELF>";
abre_tabela('300');

 divide("BUSCAR"); 
 //campo('Busca:','busca',str_replace("%"," ",$_GET[busca]),'',$extraForm);
 campo('Busca:','busca','','',$extraForm);
 botao_submit("&nbsp;&nbsp;Buscar&nbsp;&nbsp;",$h1,$h2);
 
 fecha_tabela();
 fecha_form();
 
  
 
$BUSCA = Buscar($tabela, $campos, $status, $ordena, $extra, $extraFim, $log,$MAX_PAG);
return $BUSCA;
}




function Buscar($tabela, $campos, $status='', $ordena='id', $extra='', $extraFim='', $log=0, $MAX_PAG=10) {

if( $status=='' ) $status='ativo';

$valor=$_GET[busca];


$valor = str_replace(" ","%",$valor);

$tab = substr($tabela,0,4);
$campo_status = $tab."_tx_status";

if( $status{0} == "!" ) {
	$status=substr($status,1);
	$campo_status = " AND $campo_status != '$status' ";
} else
	$campo_status = " AND $campo_status = '$status' ";

$campo = explode(",",$campos);
$linha_busca = " AND  ( ";

for($i=0; $i!=count($campo); $i++) {

    $campo[$i] = trim($campo[$i]);

    if( $campo[$i]{0} == '@' ) {
     
        $campo[$i]{0}=' ';
        $linha = " ".$campo[$i]." LIKE '%".$valor."%' ";

        } else {
        $linha = " ".$campo[$i]." = '".$valor."' ";

    }
        
    
    if( $i != count($campo)-1 ) 
        $linha .= " OR ";
        
$linha_busca .= $linha;
}
$linha_busca .= " ) ";
//echo $linha_busca;
//$linha_busca=" AND user_tx_login='rai'";

      $sql ="SELECT * FROM ".$tabela." WHERE 1 $extra";
      
      if( $status != '' ) 
        $sql .= $campo_status;
      
      $sql .= $linha_busca;
	  
	  $sql .= ' '.$extraFim.' ';
      
if( $log != 0 )
	echo $sql."<BR><BR><BR>";

      $sql3 = mysql_query($sql) or die(trata_erro(mysql_error()));

      $total_pesq = mysql_num_rows($sql3);



   if( !$_GET[n] )  !$_GET[n]=0;
	
	
   $inicio = $_GET[n];
   $proximo = $inicio+$MAX_PAG;
   $anterior = $inicio-$MAX_PAG;
   $atual=($inicio/$MAX_PAG)+1;

   if( $total_pesq%$MAX_PAG == 0 ) 
      $total_pag = (int)($total_pesq/$MAX_PAG);
   else
      $total_pag = (int)($total_pesq/$MAX_PAG)+1;

	if( $ordena{0} == '!' ) {
		$orde = substr($ordena,1);
	} else
		if( $ordena == 'id' )
			//$orde = $tab."_nb_".$ordena." DESC";                   // deixa decrescente
			$orde = $tab."_nb_".$ordena." ";
		else
			if( $ordena == 'id DESC' )
				$orde = $tab."_nb_id";
			else
				$orde = $tab."_tx_".$ordena;

	$sql .= "ORDER BY ".$orde." LIMIT $inicio,$MAX_PAG";
   
//echo $sql."<BR>";   
   $sql = mysql_query($sql) or die( trata_erro(mysql_error()) );

$valor = str_replace("%","%20",$valor);

$BUSCAR = array($sql , $inicio,$proximo,$anterior,$total_pesq,$atual,$total_pag, $valor, $MAX_PAG   );
 
return $BUSCAR; 
   
   
}



function Paginar($BUSCAR) {
global $PHP_SELF;
$LIMITE = 15;


$inicio = $BUSCAR[1];
$proximo = $BUSCAR[2];
$anterior = $BUSCAR[3];
$total_pesq = $BUSCAR[4];
$atual = $BUSCAR[5];
$total_pag = $BUSCAR[6];
$busca = $BUSCAR[7];
$MAX_PAG = $BUSCAR[8];


if( $_GET[n] == '' ) {
	unset($_SESSION[arquivo]);
	unset($_SESSION[INICIO]);
	unset($_SESSION[FIM]);

	$_SESSION[arquivo] = $PHP_SELF;
	$_SESSION[INICIO] = 0;
	$_SESSION[FIM] = 20;
	if( $_SESSION[FIM] > $total_pag )
		$_SESSION[FIM] = $total_pag;

}

$CMD = "<div class=paginar>";

 if( $inicio == 0 ) { 
   $CMD .= "<span class=paginar1> << Anterior </span>";
 } else { 
   $CMD .= "<a class=paginar2 href=$PHP_SELF?busca=$busca&n=$anterior> <U><< Anterior</U> </a>";
 } 

 
$CMD .= "&nbsp;";





if( $total_pag > $LIMITE ) {

	$X = $atual/10;
	$X = intval($X);

	if( $atual > 10 ) {
		
		$_SESSION[INICIO] = $atual-10;
		$_SESSION[FIM] = $_SESSION[INICIO]+20;

		if( $_SESSION[FIM] > $total_pag )
			$_SESSION[FIM] = $total_pag;
	} else {
		$_SESSION[INICIO] = 0;
		$_SESSION[FIM] = 20;
	}
	
} else {

	$INICIO_PAGINAR=0;
	$FIM_PAGINAR=$total_pag;
}	

$INICIO_PAGINAR = $_SESSION[INICIO];
$FIM_PAGINAR = $_SESSION[FIM];



for($i=$INICIO_PAGINAR;$i!=$FIM_PAGINAR;$i++) {
	$VALOR = $MAX_PAG*$i;
	$CMD .= "<a class=paginar2 href=$PHP_SELF?busca=$busca&n=$VALOR> ";
	$CMD .= ($i+1)==$atual?"<U>".($i+1)."</U>":($i+1);
	$CMD .= " </a>";
}






$CMD .= "&nbsp;";
 



 if( $proximo >= $total_pesq ) { 
   $CMD .= "<span class=paginar3> Próximo >> </span>";
 } else { 
   $CMD .= "<a class=paginar3 href=$PHP_SELF?busca=$busca&n=$proximo > <U>Próximo >></U></a>";
 } 
$CMD .= "<BR>";
$CMD .= "<span class=paginar4> <B>$atual de $total_pag</b>";
$CMD .= "<BR><BR></div>";

	

	exibir_componente($CMD);	
}






function grid($valores,$tam='',$valores2='',$align2='',$query='',$opcoes='',$rodape=0) {
global $BUSCA, $TARGET_DESTINO;




if( !$TARGET_DESTINO ) $TARGET_DESTINO='_top';

if( $opcoes == '' ) $opcoes='TODAS';



if( mysql_num_rows($BUSCA[0]) == 0 ) {  
	if( $rodape==0) 
		rodape(); 
	exit; 
} 

if( $query != '' ) $BUSCA[0] = $query;


if( $tam != '' )
	$TAM = explode(",",$tam);

$VALOR = explode(",",$valores);

if( is_array($valores2) )
	$VALOR2 = $valores2;
else
	$VALOR2 = explode(",",$valores2);

if( $align2 != '' )
	$ALIGN2 = explode(",",$align2);

if( $tam2 != '' )
	$TAM2 = explode(",",$tam2);

?>
<TABLE border="0" width="98%" >
<TR class=tabela >
   <TD width="6%" align=center >CÓD.</TD>
   
<?
for($i=0; $i!=count($VALOR);$i++) {

	if( $TAM[$i] != '' ) $tamanho = " width=$TAM[$i]"; else $tamanho='';
	
	echo "<TD $tamanho >$VALOR[$i]</TD> \r\n";
}

?>

<? if( $opcoes == 'TODAS' || $opcoes=='MODIFICAR') { ?>
   <TD align=center width="3%">-</TD>
<? } ?>
<? if( $opcoes == 'TODAS' || $opcoes=='EXCLUIR') { ?>
   <TD align=center width="3%">-</TD>
<? } ?>

</TR>


<? $cor=0;
   while( $array = mysql_fetch_array($BUSCA[0]) ) { 
   if( $cor++%2 == 0 ) 
      echo "<TR class=item_tabela>";
   else
      echo "<TR class=item_tabela2>";

?>
   <TD width="6%" align=center> <?= $array[0];?> </TD>
<? 
for($i=0; $i!=count($VALOR2);$i++) { 

		$x = trim($VALOR2[$i]);

		if( $x{0} == '.' ) {
			$x = substr($x,1);
			$x = mostra_valor($array[$x]);
		} else
		if( $x{0} == ':' ) {
			$x = substr($x,1);
			$x = data($array[$x],1);
		} else if( $x{0} == ';' ) {
			$x = substr($x,1);
			$x = data($array[$x]);
		} else
			$x = $array[$x];
		
	
	if( trim($ALIGN2[$i]) == 'e' ) $alin = "align=left";
	if( trim($ALIGN2[$i]) == 'd' ) $alin = "align=right";
	if( trim($ALIGN2[$i]) == 'c' ) $alin = "align=center";
	
	echo "<TD $alin >&nbsp;$x</TD>";

} 
?>   


 <? //if( $_SESSION[user_tx_nivel] == 'Administrador' ) { ?> 
<? if( $opcoes == 'TODAS' || $opcoes=='MODIFICAR') { ?>

<TD align=center width="3%">
	<? 	botao_modificar($array[0],'n',"$_GET[n]","$_GET[destino]",' target='.$TARGET_DESTINO) ?>
</TD> 
<? } ?>
<? if( $opcoes == 'TODAS' || $opcoes=='EXCLUIR') { ?>
   <TD align=center width="3%"><? botao_excluir($array[0],'n',"$_GET[n]",'','',"$_GET[destino]",' target='.$TARGET_DESTINO) ?></TD>
<? } ?>
<? //} ?>
</TR>

<? } ?>

</table>
<?/*
<script>document.write(( window.parent.name == 'FRAME_PRINCIPAL' ) ?'FRAME_PRINCIPAL':'_top');</script>

<script>
if ( window.parent.name == 'FRAME_PRINCIPAL' ) {
	document.write("<form name=m"+<?= '1258'?>+" method=post action=/corporate/cliente.php   target=FRAME_PRINCIPAL >	<input type=hidden name=acao value=modificar> <input type=hidden name=id value="+<?= '1258'?>+"> </form> <a href=#><img src=/corporate/imagens/editar.png border=0   alt=Modificar onClick=m"+<?= '1258'?>+".submit()  > <a href=#></a>");
	
} else {
	document.write("<form name=m247 method=post action=/bibliotec/livro.php   target=_top >	<input type=hidden name=acao value=modificar> <input type=hidden name=id value=247> </form> <a href=#><img src=/corporate/imagens/excluir3.gif border=0   alt=Modificar onClick=m247.submit()  > <a href=#></a>");
}
</script>


<?
*/
paginar($BUSCA);


}


function monta_paginacao($sql,$valor='',$MAX_PAG=10) {


      $sql3 = mysql_query($sql) or die(trata_erro(mysql_error()));

      $total_pesq = mysql_num_rows($sql3);



   if( !$_GET[n] )  !$_GET[n]=0;

   $inicio = $_GET[n];
   $proximo = $inicio+$MAX_PAG;
   $anterior = $inicio-$MAX_PAG;
   $atual=($inicio/$MAX_PAG)+1;

   if( $total_pesq%$MAX_PAG == 0 ) 
      $total_pag = (int)($total_pesq/$MAX_PAG);
   else
      $total_pag = (int)($total_pesq/$MAX_PAG)+1;

	$sql .= " LIMIT $inicio,$MAX_PAG";
   
//echo $sql."<BR>";   
   $sql = mysql_query($sql) or die( trata_erro(mysql_error()) );


$BUSCAR = array($sql , $inicio,$proximo,$anterior,$total_pesq,$atual,$total_pag, $valor, $MAX_PAG   );
 
return $BUSCAR; 
 
}

?>