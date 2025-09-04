/*
function validaForm(nome, campos) {


arrayCampo = campos.split(',');

for(i=0; i!=arrayCampo.length; i++) {

   if( eval('document.'+nome+'.elements[ arrayCampo[i] ].value') == '' ) { 
      alert('ERRO: Por Favor Preencha o campo '+ eval('document.'+nome+'.elements[ arrayCampo[i] ].name')); 
      eval('document.'+nome+'.elements[ arrayCampo[i] ].focus()');
      return false; 
   }
}



   return true;

}
*/

function include(file) {   
  
  var script  = document.createElement('script');   
  script.src  = file;   
  script.type = 'text/javascript';   
  script.defer = true;   
  
  document.getElementsByTagName('head').item(0).appendChild(script);   
  
}   

function $(e) {

	return document.getElementById(e);
}

function abre_help(elemento) {
	document.getElementById(elemento).style.display=""
}
function fecha_help(elemento) {
	document.getElementById(elemento).style.display="none"
}


function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
} // trim!

function Foco(cod) {

	if( cod != '' && cod != undefined)
		document.forms[0].elements[1+cod].focus();
}	


function fechaJanela() {

	var codigo = (window.Event) ? event.which : event.keyCode;
	if( codigo == 27 )
		window.close();
	
}



function validaForm(nome, cam) {


var campos = eval(cam);

if( campos != '' ) {

	campos = campos.substring(0,campos.length-1);

	arrayCampo = campos.split(',');



	for(i=0; i!=arrayCampo.length; i++) {
		nome_certo = arrayCampo[i].replace("_"," ");
		
		if( arrayCampo[i].substr(0,1) == '@' ) {
			
			arrayCampo[i]=arrayCampo[i].substr(1);
			
			if( eval('document.'+nome+'.nome_'+arrayCampo[i]+'.value') != eval('document.'+nome+'.orig_'+arrayCampo[i]+'.value')  ) { 
				alert('Por Favor, preencha corretamento o campo '+arrayCampo[i]);
				eval('document.'+nome+'.nome_'+arrayCampo[i]+'.focus()');
				return false;
			}
			
			if( eval('document.'+nome+'.nome_'+arrayCampo[i]+'.value') == ''  ) { 
				alert('Por Favor, preencha o campo '+arrayCampo[i]);
				eval('document.'+nome+'.nome_'+arrayCampo[i]+'.focus()');
				return false;
			}
			
		} // se for um combo_div trata as validações
		
	   if( eval('document.'+nome+'.'+arrayCampo[i]+'.value') == '' ) { 
	      alert('Por Favor Preencha o campo '+ nome_certo); 
	      eval('document.'+nome+'.'+arrayCampo[i]+'.focus()');
	      return false; 
	   }
	}
} 



return true;
   
}

function validarCampos(form,campo) {

    eval('document.'+form+'.validar.value = document.'+form+'.validar.value + \''+campo+'\'');

}



function submeter(nome, campos) {

if( validaForm(nome,campos) )
    eval(nome+'.submit()');
    
}



function confirmar( texto,nome,senao ) {

	if( confirm(texto) )
	    eval(nome+'.submit()');
	else
		eval(senao+'.submit()');
    
}


function confirmarS( texto,nome ) {

	if( confirm(texto) )
	    eval(nome+'.submit()');
    
}

/*
function excluir( nome ) {

	confirmar("Deseja realmente excluir o registro?",nome,'');
}
*/

function excluir( nome ) {

if( confirm("Deseja realmente excluir o registro?") )
    eval('document.'+nome+'.submit()');
    
}

function Select(dado1, dado2, form) {  

    window.opener.setResultCallback(dado1, dado2, form);
    window.close();
}

 
function buscar(nome,opcao,x,y, form) {

     nome_campo = nome;
     if( opcao.indexOf('?') == -1 ) // caso houve um argumento usa &form senao usa ?form
        opcao = opcao+'?form='+form;
     else
        opcao = opcao+'&form='+form;
     
     window.setResultCallback = window.set;
     var wnd = window.open(opcao,'','toolbar=no,width='+x+',height='+y+',scrollbars=yes');

}

function popup(destino,x,y,op) {

	url = destino+'?'+op;
	window.open(url,'','toolbar=no,width='+x+',height='+y+',scrollbars=yes');

}

function set(id,nome, form) {

	if( form.indexOf(':') != -1 ) {
		
		form2=form.substr(1,form.indexOf(':')-1);
		valor=form.substr(form.indexOf(':')+1)
		valor= valor.substr(0,valor.length-1);
		eval('document.'+form2+'.valor.value = \''+valor+'\'');
		
	} else
		form2=form;
// faz com que o valor cheque na arquivo orcamento.php

	eval('document.'+form2+'.'+nome_campo+'.value = id');
    eval('document.'+form2+'.nome_'+nome_campo+'.value = nome');
    eval('document.'+form2+'.orig_'+nome_campo+'.value = nome'); // pra evitar que se mude o campo original
    eval('document.'+form2+'.nome_'+nome_campo+'.select()'); // pra dar o foco
	  
	  

 }


 
// modal



function buscar_mdl(campo,opcao,x,y, form) {

     
     if( opcao.indexOf('?') == -1 ) // caso houve um argumento usa &form senao usa ?form
        opcao = opcao+'?form='+form+"-"+campo;
     else
        opcao = opcao+'&form='+form+"-"+campo;
     
     var wnd = window.showModalDialog(opcao,window,'');
//status=no, toolbar=no,width='+x+',height='+y+',scrollbars=yes
}


function seleciona_mdl(dado1, dado2, form) {  

//dialogArguments.window.document.cadastro.valor.value);
forms = form.split("-");
form=forms[0];
campo=forms[1];


	if( form.indexOf(':') != -1 ) {
		
		form2=form.substr(1,form.indexOf(':')-1);
		valor=form.substr(form.indexOf(':')+1)
		valor= valor.substr(0,valor.length-1);
		eval('dialogArguments.window.document.'+form2+'.valor.value = \''+valor+'\'');
		
	} else
		form2=form;
// faz com que o valor cheque na arquivo orcamento.php

	eval('dialogArguments.window.document.'+form2+'.'+campo+'.value = dado1');
    eval('dialogArguments.window.document.'+form2+'.nome_'+campo+'.value = dado2');
    eval('dialogArguments.window.document.'+form2+'.orig_'+campo+'.value = dado2'); // pra evitar que se mude o campo original
    eval('dialogArguments.window.document.'+form2+'.nome_'+campo+'.select()'); // pra dar o foco
	window.close();
	  


}




function SomenteNumero(evento) {


//return true;
	var tecla=(window.event)?event.keyCode:evento.which;
	if (tecla > 47 && tecla < 58) {
		return true;
	} else {
		if (tecla == 8 || tecla == 0) return true;
		else return false;
	}
}

Number.prototype.formatMoney = function(c, d, t){
    var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t,
    i = parseInt(n = (+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t)
    + (c ? d + (n - i).toFixed(c).slice(2) : "");
};

function gera_valor(valor) {

	valor = valor.replace(".","");
	valor = valor.replace(",",".");
	valor = parseFloat(valor);

	if( !valor )
		valor=0;
	
	
	return valor;
}

function str_replace(var1, var2,string) {
	
	var separa = string.split(var1);
	return separa.join(var2);
}

function frame_interno(src) {
	
	if( !(e = document.getElementById('frame_interno')) ) {
		
		var frame = "<div id=div_interno ><iframe id=frame_interno name=frame_interno width=0 height=0></iframe></div>";		
		document.body.innerHTML += frame;
		e = document.getElementById('frame_interno');
	} // se nao existir o frame interno ele cria
	
	e.src = src;
	
} // cria um iframe interno e passa o seu src pra ser usado como ajax
