<?php

class cactux_combo_net {
		
		function combo_div_valores($id,$nome,$nome_exibe='',$extra_onclick='',$extra_autoseleciona='') {
			global $_COMBO_NOVO_ID,$_COMBO_NOVO_NOME,$_COMBO_NOVO_LINHA,$_COMBO_NOVO_ITENS;
			
				$nome = str_replace(array("'","\r\n","\n"),array("","",""),$nome);
				$nome_js = str_replace(" ","%20",$nome);
				
				if( $nome_exibe == '' )
					$nome_exibe = $nome;
				else
					$nome_exibe = str_replace(array("'","\r\n","\n"),array("","",""),$nome_exibe);
				
				$estilo = 'combo_novo_normal';
				if( $_COMBO_NOVO_ITENS++ == 0 && $_GET[busca] != '') {
					
					javascript("parent.combo_novo_sel_auto('$_GET[campo]','$id','".$nome_js."');$extra_autoseleciona");
					$estilo = 'combo_novo_ativo';
					
				}		
				
				$_COMBO_NOVO_LINHA .= "<a class=$estilo href=javascript:combo_novo_sel('$_GET[campo]','$id','".$nome_js."');$extra_onclick>$nome_exibe</a><BR>";
					
				$_COMBO_NOVO_ID .= "$id<cactux>";
				$_COMBO_NOVO_NOME .= "$nome<cactux>";
					
			
		}
		
		function combo_div_gerar() {
			global $_COMBO_NOVO_ID,$_COMBO_NOVO_NOME,$_COMBO_NOVO_LINHA,$_COMBO_NOVO_ITENS;
		
			
			cactux_combo_net::combo_div_js($_COMBO_NOVO_ID,$_COMBO_NOVO_NOME,$_COMBO_NOVO_LINHA,$_GET[campo]);
			
			unset($_COMBO_NOVO_ID,$_COMBO_NOVO_NOME,$_COMBO_NOVO_LINHA,$_COMBO_NOVO_ITENS);
		}
		
		// NOVA FUNCAO PARA O COMBO_NET (COMBO_DIV)
		// EH USADA DENTRO DOS ARQUIVOS BUSCA_DIV.PHP
		function combo_div_js($COMBO_NOVO_ID='',$COMBO_NOVO_NOME='',$l='',$campo='') {
		
			echo "<div  id=combo_novo_invisivel_local class=combo_novo_invisivel></div>";
			
			javascript("
				
				combo_novo_retorna_valor();
		
				
				function combo_novo_retorna_valor() {
		
					parent.COMBO_NOVO_ID='".$COMBO_NOVO_ID."';
					parent.COMBO_NOVO_NOME='".$COMBO_NOVO_NOME."';
		
					parent.combo_novo_abre('".$_GET[campo]."');
					
					if( $('combo_novo_invisivel_local') ) {
						$('combo_novo_invisivel_local').innerHTML = '';
					} else {
						alert('ERRO: Atualize o funcoes form');
					}
		
					$('combo_novo_invisivel_local').innerHTML=\"".$l."\";
					$('combo_novo_invisivel_local').style.width = window.parent.$('nome_".$_GET[campo]."').clientWidth + 'px';
		
					var novo_tam = $('combo_novo_invisivel_local').clientHeight;
					window.parent.$('nova_div_".$_GET[campo]."').style.height=novo_tam+'px';
					window.parent.$('nova_div_".$_GET[campo]."').innerHTML = $('combo_novo_invisivel_local').innerHTML;
				}
			");
		
		
		}

}

?>