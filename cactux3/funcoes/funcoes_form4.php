<?php
@header("Content-Type: text/html;  charset=ISO-8859-1",true);
class grid2 {


	function abrir($width='99%') {
		global $MODO_IMPRESSAO;
		
		if( !$MODO_IMPRESSAO ) {
			$MODO_IMPRESSAO=0;
		} // se estiver em modo de impressao, aciona o borda da tabela, caso negativo, deixa a bordar como 0
		
		$cmd = "<table class=grid width='$width'  border=$MODO_IMPRESSAO  >"; //cellpadding=0 cellspacing=0 border=1
		exibir_componente($cmd);
	}

	function fechar() {
		
		fecha_tabela();
		
	}

	function gerar($cabeca,$valores) {
		
		
		if( !$cabeca[3] )
			$cabeca[3] = '99%';
		// define o css padrao do cabecalho
		
		if( !$cabeca[4] )
			$cabeca[4] = 'barra';
		// define o css padrao do cabecalho
		
		grid::abrir($cabeca[3]);
		
		if( is_array($cabeca[0]) ) 
			grid::tabela_cabecalho($cabeca[0],$cabeca[4],$cabeca[1],$cabeca[2]);
		
		$t_valores=count($valores);
		for($i=0; $i!=$t_valores; $i++) {
			
			$valor_vez = $valores[$i];
			
			$estilo = ( $i%2 == 0 )?'claro':'escuro';
			
			if( !is_array($valor_vez[0]) ) {
				grid::tabela($valores[$i],$estilo,$cabeca[1],$cabeca[2]);
			} else {
				$novo_valor = $valores[$i];
				
				$alinha = ( $novo_valor[1] == '' )? $cabeca[1] : $novo_valor[1];
				
				grid::tabela($novo_valor[0],$estilo,$alinha,$cabeca[2],'','',$novo_valor[2]);
				
			}
			
		}
		
		grid::fechar();
		
	}


	function gerar_id($cabeca,$valores,$id) {
		
		
		if( !$cabeca[3] )
			$cabeca[3] = '99%';
		// define o css padrao do cabecalho
		
		if( !$cabeca[4] )
			$cabeca[4] = 'barra';
		// define o css padrao do cabecalho
		
		grid::abrir($cabeca[3]);
		
		if( is_array($cabeca[0]) ) 
			tabela_cabecalho($cabeca[0],$cabeca[4],$cabeca[1],$cabeca[2]);
		
		$t_valores=count($valores);
		for($i=0; $i!=$t_valores; $i++) {
			
			$estilo = ( $i%2 == 0 )?'claro':'escuro';
			
			$estilo .= ",$estilo";
			tabela($valores[$i],$estilo,$cabeca[1],$cabeca[2],"center id=$id[$i]");
			
		}
		
		grid::fechar();
		
	} // eh a mesma funcao gerar com o id em cara linha para poder modificar via js


	
	function tabela($VALOR,$estilos='',$align='',$tamanho='',$valign='',$largura='',$cols='') {
	
	
	$ESTILO = explode(",",$estilos);
	$TAM = explode(",",$tamanho);

	if( !is_array($align) )
		$ALIGN = explode(",",$align);
	else
		$ALIGN = $align;
	
	if( !is_array($cols) )
		$COLS = explode(",",$cols);
	else
		$COLS = $cols;
	
	if( $ESTILO[0] == 'VARIAR' || $ESTILO[0] == 'ZEBRAR' ) {
	global $cor_tabela;
	   if( $cor_tabela++%2 == 0 ) 
		  $ESTILO[0]= "item_tabela";
	   else
		  $ESTILO[0]= "item_tabela2";
	}
	
	if( $valign!='') $valign=" valign=$valign";
	if( $largura!='') $largura=" height=$largura";
	
		  
	if( $ESTILO[0] != '' ) $ESTILO[0] = "class=$ESTILO[0]";
	$comp .= "<TR $ESTILO[0]  $valign $largura> \r\n";
	
	$t_valor = count($VALOR);
	for($i=0, $j=1; $i!=$t_valor; $i++,$j++) {
	
		
		if( $COLS[$i] != ''  ) $cols = "colspan=$COLS[$i]"; else $cols='';
		if( $TAM[$i] != ''  ) $tam = "width=$TAM[$i]"; else $tam='';
		if( $ESTILO[$j] != '' ) $estilo = "class=$ESTILO[$j]";
		if( $ALIGN[$i] != ''  ) {
			$alinha = "align="; 
			switch( $ALIGN[$i] ) {
			case 'e': $alinha.="left"; break;
			case 'd': $alinha.="right"; break;
			case 'c': $alinha.="center"; break;
			case 'j': $alinha.="justify"; break;
			}
		} else {
			$alinha = "align=center"; 
		}
		
		
		$VALOR_VEZ = $VALOR[$i];
			
			//if( $ALIGN[$i] != '' ) $alinha = "align=$ALIGN[$i]"; else $alinha = "align=center"; 
		if( $VALOR_VEZ{0} == '.' ) 	{
			
			$comp .= "<TD $estilo $alinha $tam $extra> ";
		
			exibir_componente($comp);	$comp=''; // tem que limpar o $comp pra nao repetir o que jah foi exibido
			
			eval(substr($VALOR[$i],1).";");
		
			$comp .= " </TD> \r\n";
		} else {
			$comp .= "<TD $estilo $alinha $tam $cols > $VALOR[$i] </TD> \r\n";
		}
		
	}
		
	$comp .= "</TR> \r\n";
	
	exibir_componente($comp);
	
	
	}


	
	function tabela_cabecalho($VALOR,$estilos='',$align='',$tamanho='',$valign='',$largura='',$cols='') {
	
	
	$ESTILO = explode(",",$estilos);
	$TAM = explode(",",$tamanho);

	if( !is_array($align) )
		$ALIGN = explode(",",$align);
	else
		$ALIGN = $align;
	
	if( !is_array($cols) )
		$COLS = explode(",",$cols);
	else
		$COLS = $cols;
	
	if( $ESTILO[0] == 'VARIAR' || $ESTILO[0] == 'ZEBRAR' ) {
	global $cor_tabela;
	   if( $cor_tabela++%2 == 0 ) 
		  $ESTILO[0]= "item_tabela";
	   else
		  $ESTILO[0]= "item_tabela2";
	}
	
	if( $valign!='') $valign=" valign=$valign";
	if( $largura!='') $largura=" height=$largura";
	
		  
	if( $ESTILO[0] != '' ) $ESTILO[0] = "class=$ESTILO[0]";
	$comp .= "<thead><TR $ESTILO[0]  $valign $largura> \r\n";
	
	$t_valor = count($VALOR);
	for($i=0, $j=1; $i!=$t_valor; $i++,$j++) {
	
		
		if( $COLS[$i] != ''  ) $cols = "colspan=$COLS[$i]"; else $cols='';
		if( $TAM[$i] != ''  ) $tam = "width=$TAM[$i]"; else $tam='';
		if( $ESTILO[$j] != '' ) $estilo = "class=$ESTILO[$j]";
		if( $ALIGN[$i] != ''  ) {
			$alinha = "align="; 
			switch( $ALIGN[$i] ) {
			case 'e': $alinha.="left"; break;
			case 'd': $alinha.="right"; break;
			case 'c': $alinha.="center"; break;
			case 'j': $alinha.="justify"; break;
			}
		} else {
			$alinha = "align=center"; 
		}
		
		
		$VALOR_VEZ = $VALOR[$i];
			
			//if( $ALIGN[$i] != '' ) $alinha = "align=$ALIGN[$i]"; else $alinha = "align=center"; 
		if( $VALOR_VEZ{0} == '.' ) 	{
			
			$comp .= "<TH $estilo $alinha $tam $extra> ";
		
			exibir_componente($comp);	$comp=''; // tem que limpar o $comp pra nao repetir o que jah foi exibido
			
			eval(substr($VALOR[$i],1).";");
		
			$comp .= " </TH> \r\n";
		} else {
			$comp .= "<TH $estilo $alinha $tam $cols > $VALOR[$i] </TH> \r\n";
		}
		
	}
		
	$comp .= "</TR></thead> \r\n";
	
	exibir_componente($comp);
	
	
	}








	function ordenar($desc,$ordena='',$extra='',$busca='') {
		
		if( $ordena == '' ) $ordena='id';
		
		$url = "?o=$ordena";
		foreach( $_GET as $k=>$v ) {
			$url .= "&".$k."=".$v;
		}

		//echo $url;
		
		$r = "<a class=link_ordena href=$PHP_SELF".$url.$extra.">".$desc."</a>";
		//$r = "<a class=link_ordena href=".$PHP_SELF."?o=".$ordena."&busca=".$_GET[busca]."&n=".$_POST[n].$extra.">".$desc."</a>";
		
		return $r;
	}

	function order_by($p='') {
		
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
		
		return "ORDER BY ".$_SESSION[ordena];
	}
	


	function filtro_busca() {
		
		
		if( $_POST[sistemacactus] == '' )
			$_POST[sistemacactus] = $_GET[sistemacactus];
			
		
		foreach( $_POST as $chave => $valor  ) {
			
			if( (substr($chave,0,7) == 'cactux_' || substr($chave,0,6) == 'busca_' || $chave=='n' || $chave == 'sistemacactus') && $valor ) {
				
				$valor = str_replace(" ","%20",$valor);
				
				$ret[] = "$chave=$valor";
			}
		}	
		
		
		$r = "&".@implode("&",$ret);
		
		if( strpos($r,'&n=') === FALSE )
			$r = "&n=0".$r;
		// forca a existencia de um n pra controlar a paginacao
		
		return $r;
		
	}

	function campos_busca() {
		
		if( $_POST[sistemacactus] == '' )
			$_POST[sistemacactus] = $_GET[sistemacactus];

		foreach( $_POST as $chave => $valor  ) {
			
			if( (substr($chave,0,7) == 'cactux_' || substr($chave,0,6) == 'busca_' || $chave=='n' || $chave == 'sistemacactus') && $valor ) {
				
				$ret[] = "$chave";
			}
		}	
		
		if( !@in_array('n',$ret) ) {
			$ret[] = 'n';
			$_POST[n]='o';	 // n= o  --- significa que nao deve paginar, eh apenas um caractere pra gerar
		}
		// forca a existencia de um n
		
		$r = @implode(",",$ret);
		
		return $r;
	}

	function valores_busca() {
		
		if( $_POST[sistemacactus] == '' )
			$_POST[sistemacactus] = $_GET[sistemacactus];

		foreach( $_POST as $chave => $valor  ) {
			
			if( (substr($chave,0,7) == 'cactux_' || substr($chave,0,6) == 'busca_' || $chave=='n' || $chave == 'sistemacactus') && $valor ) {
				
				//$valor = str_replace(" ","%20",$valor);
				//soh  precisava substiruir por %20 quando se passava por GET, por POST nao eh preciso
				$ret[] = $valor;
			}
		}	
		
		
		return @implode(",",$ret);
	}


	
	function frame($acao,$height='300') {
		global $PHP_SELF;
		
		foreach ($_GET as $chave => $valor) {
			
			if( $chave != 'acao' )
				$valor_get .= "&$chave=$valor";
			
		}		
		
		echo "<iframe id='grid_$acao' width=100% height='$height' src=\"".$PHP_SELF."?acao=".$acao.$valor_get."\" frameborder=0 allowtransparency></iframe>";
	}
	

	function Paginar($BUSCAR,$target='') {
	global $PHP_SELF;
	$LIMITE = 15;

	
	if( $target == 'frame' ) {
		$target = "target=_parent";
	} // pra manter o foco caso esteja dentro de um iframe
	

	$inicio = $BUSCAR[1];
	$proximo = $BUSCAR[2];
	$anterior = $BUSCAR[3];
	$total_pesq = $BUSCAR[4];
	$atual = $BUSCAR[5];
	$total_pag = $BUSCAR[6];
	$busca = $BUSCAR[7];
	$MAX_PAG = $BUSCAR[8];
	$campos_form = $BUSCAR[9]; 
	$valores_form = $BUSCAR[10]; 


	if( $_POST[n] == '' || $_POST[n] == 'o' ) {
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
//		$CMD .= "<a $target class=paginar2 href=$PHP_SELF?busca=$busca&n=$anterior> <U><< Anterior</U> </a>";
		$CMD .= "<a $target class=paginar2 href=\"javascript:paginacao('$anterior')\"> <U><< Anterior</U> </a>";
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
		//$CMD .= "<a $target class=paginar2 href=$PHP_SELF?busca=$busca&n=$VALOR> ";
		$CMD .= "<a class=paginar2 onclick=paginacao('$VALOR') href=#> ";
		$CMD .= "<a class=paginar2 href=\"javascript:paginacao('$VALOR')\"> ";
//		
		$CMD .= ($i+1)==$atual?"<U>".($i+1)."</U>":($i+1);
		$CMD .= " </a>";
	}



	$CMD .= "&nbsp;";


	if( $proximo >= $total_pesq ) { 
		$CMD .= "<span class=paginar3> Próximo >> </span>";
	} else { 
		//$CMD .= "<a $target class=paginar3 href=$PHP_SELF?busca=$busca&n=$proximo > <U>Próximo >></U></a>";
		$CMD .= "<a $target class=paginar3  href=\"javascript:paginacao('$proximo')\" > <U>Próximo >></U></a>";
	} 
	$CMD .= "<BR>";
	$CMD .= "<span class=paginar4> <B>$atual de $total_pag</b>";
	$CMD .= "<BR><BR></div>\n";

	exibir_componente($CMD);	


	cactux::acao_botao('form_paginacao','',"$campos_form","$valores_form",$PHP_SELF);

		javascript("
			function paginacao(valor) {
				window.document.form_paginacao.n.value=valor;
				window.document.form_paginacao.submit();
			}");
	
	}

	
	
	function gerar_paginacao($sql,$campos='',$valores='',$MAX_PAG=10) {
		
		
		//$sql = str_replace("%20"," ",$sql);
		// substitui o %20 por espaço na consulta, já que n
		
		$CAMPOS = explode(",", $campos);
		$VALORES = explode(",", $valores);
		$t_campos = count($CAMPOS);
		
		
		
		$valor='';
		for($i=0; $i!=$t_campos; $i++) {
			
			$valor .= "&$CAMPOS[$i]=$VALORES[$i]";
		}
		
		$valor .= grid::filtro_busca();
		
		
		$t_sql = explode("FROM",$sql);
		$t_sql2 = explode("ORDER BY",$t_sql[1]);
		$q_total = "SELECT count(*) as total FROM ".$t_sql2[0];
		
		//echo $q_total."<BR>";
		
		
		$sql3 = query($q_total);
		$num_linhas3 = num_linhas($sql3);
		
		if( $num_linhas3 == 1 ) {
			
			$array_q = carrega_array($sql3);
			$total_pesq = $array_q[total];
		} else {
			
			$total_pesq = $num_linhas3;
		}	// acha o total de linhas dessa consulta
		
	   if( !$_POST[n] )  !$_POST[n]=0;
	   if( $_POST[n]=='o' )  $_POST[n]=0;
		
	   $inicio = $_POST[n];
	   $proximo = $inicio+$MAX_PAG;
	   $anterior = $inicio-$MAX_PAG;
	   $atual=($inicio/$MAX_PAG)+1;
		
	   if( $total_pesq%$MAX_PAG == 0 ) 
	      $total_pag = (int)($total_pesq/$MAX_PAG);
	   else
	      $total_pag = (int)($total_pesq/$MAX_PAG)+1;
		
		$sql .= " LIMIT $inicio,$MAX_PAG";
	   
	//echo $sql."<BR><BR>";   
	   $sql = query($sql);
	

	$BUSCAR = array($sql , $inicio,$proximo,$anterior,$total_pesq,$atual,$total_pag, $valor, $MAX_PAG,$campos,$valores  );
	
	return $BUSCAR; 

	}	
	
	function set_modo_impressao($op) {
		global $MODO_IMPRESSAO;
		
		$MODO_IMPRESSAO=$op;		
		
	}
	
}

?>