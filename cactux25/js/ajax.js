// AJAX
function form_interno() {

	e = document.getElementById('form_interno');
	if( e == null ) {
		
		e = document.createElement("form");
		e.setAttribute("id", "form_interno");
		e.setAttribute("name", "form_interno");
		e.setAttribute("method", "post");
		e.setAttribute("target", "frame_interno");
		document.getElementById('div_interno').appendChild(e);
	} // cria o formulario oculto que sera usado pra passar as informacoes por POST

return e;
}

function cadastrarX(nome_arq,nome_form) {

	e = form_interno();
	// procura pelo form_interno, se nao existir cria!
	
	var FORM = eval('document.'+nome_form);
	var t = FORM.elements.length; 

//	if( validaForm(nome_form,FORM.validar.value) != false ) {
		
		for(i=0; i!=t; i++) {
			if( FORM.elements[i].name != '' )
				e.innerHTML += '<input type=hidden name='+FORM.elements[i].name+' value=\"'+FORM.elements[i].value+'\">';
		} // varre os campos do form jogando os valores no form_interno que sera passado pelo frame_interno fe forma assicrona

		FORM.reset();
		
		//alert(e.innerHTML);
		e.submit();
		
		//FORM.acao.value=FORM.acao1.value;
		//alert("ACAO:"+FORM.acao.value);
//	}
}



function excluirX(nome_arq,nome_tab,acao,id) {

	e = form_interno();
	// procura pelo form_interno, se nao existir cria!
	
	
	e.innerHTML += '<input type=hidden name=tabela value='+nome_tab+'>';
	e.innerHTML += '<input type=hidden name=acao value='+acao+'>';
	e.innerHTML += '<input type=hidden name=id value='+id+'>';
	
	e.submit();
	
	// joga as informacoes necessarias e da o submit


} // excluir novo, passando por POST



function modificarX(nome_arq,nome_form,acao,id,campos,valores) {

	e = form_interno();
	// procura pelo form_interno, se nao existir cria!
	
	e.innerHTML += '<input type=hidden name=form value='+nome_form+'>';
	e.innerHTML += '<input type=hidden name=acao value='+acao+'>';
	e.innerHTML += '<input type=hidden name=id value='+id+'>';
	// informacoes basicas
	
	if( campos != '' ) {
		var c=campos.split(',');
		var v=valores.split(',');
		for(i=0; i!=v.length; i++)
			e.innerHTML += '<input type=hidden name='+trim(c[i])+' value='+trim(v[i])+'>';
	} // aqui é o laco que passa as informacoes do form
	
	e.submit();

} // modificar novo, passando por POST


/*
Função: carrega_modificarX
	nome_form 	=> nome do formulario de destino
	q 	=> query passada ex var1=>Sim<*(xml)*>var2=>3
	



*/

function carrega_modificarX(nome_form,q) {
	var FORM = eval('window.parent.'+nome_form); // nome do formulario da pagina anterior
	var t;
	
	var a = q.split('<*(xml)*>');    
	
	atual2 = a[0].split('=>');
	FORM.id.value=atual2[1];
	//pra pegar o id
	
	FORM.acao.value = FORM.acao2.value; 
	// inverte acao com acao2 pra mudar de cadastrar pra atualizar
	
	//alert( "ACAO: "+FORM.acao.value  );
	
	var a = q.split('<*(xml)*>');
	var entrou=0;
	
	for(i=1; i!=a.length; i+=2) {
		
		atual = a[i].split('=>');
		
		for(j=0; j!=FORM.elements.length; j++) {
			
			if( FORM.elements[j].id == atual[0] ) {
				
				if( FORM.elements[j].type=='select-one' ) {
					
					entrou=1;
					for(l=0;l!=FORM.elements[j].options.length; l++) {
						if( FORM.elements[j].options[l].value == atual[1] )
							c_atual = l;
					} // busca pelo elemento no combo pra nao precisar criar!
					
					FORM.elements[j].options[c_atual].selected = true;
					
				} // se for um combobox 
				
				if( entrou != 1 ) 
					FORM.elements[j].value=atual[1];
				
				entrou=0;
			} // procura se um elemento do formulario veio da consulta do banco
		} // percorre os elementos do formulario
	}
}













/****************************************************************\
|                                                                                                                                  |
|                                          GRID AJAX                                                                   |
|                                                                                                                                  |
\****************************************************************/

function insere_tab(valores,tabela,estilo,alinha,tamanho) {


	valores = decodeURI(valores);
	var a = valores.split('<*(xml)*>');
	var alig = alinha.split(',');
	var tama = tamanho.split(',');

	
	var e = document.getElementById(tabela);

	var t_rows = e.rows.length-1;
	var t_cells = e.rows[0].cells.length;



	novo = e.insertRow(1);
	
	if( estilo!='ZEBRAR' ) {
		novo.className=estilo;
	} else {
		
		if( t_rows > 0 ) {
			if( e.rows[2].className=='item_tabela' )
				novo.className='item_tabela2';
			else
				novo.className='item_tabela';
			
		} else {
			novo.className='item_tabela';
		} // se for o primeiro coloca como item_tabela, senao alterna pela linha anterior 
		
	} // define o estilo
	
	for(i=0; i!=a.length-1; i++) {
		
		novo.insertCell(i);
		// insere a nova coluna
		
		if( alig[i] != undefined ) {
			switch( alig[i] ) {
				case 'e': al='left'; break;
				case 'd': al='right'; break;
				case 'c': al='center'; break;
				case 'j': al='justify'; break;
			}
			
			novo.cells[i].align=al; 		   
		} // se for passado define o alinhamento
		
		if( tama[i] != undefined ) {
			novo.cells[i].width=tama[i];
		} // se for passado define o tamanho
			
		novo.cells[i].innerHTML=a[i];                     
		// joga o novo valor
	}
	
	
}

function remove_tab(tabela,valor) {


	var e = document.getElementById(tabela);
	var t_rows = e.rows.length;
	var troca;
	
	for(i=1; i!=t_rows; i++) {
		
		if(trim(e.rows[i].cells[0].innerHTML)==valor) {
			e.deleteRow(i);
			troca=i;
			break;
		} // se achou apaga e marca troca como 1 pra ajeitar o estilo zebrado
		
	} // varre o grid em busca do codigo a remover! comeca de 1 pra pular o cabecalho do grid
	

	for(i=troca; i!=t_rows-1; i++) {
		if( e.rows[i].className=='item_tabela' ) 
			e.rows[i].className='item_tabela2';
		else
		if(e.rows[i].className=='item_tabela2')
			e.rows[i].className='item_tabela';
			
	} // inverte a ordem do estilo pra ajeitar o zebrado
}

function atualiza_tab(valores,tabela,id) {

	valores = decodeURI(valores);
	var a = valores.split('<*(xml)*>');

	var e = document.getElementById(tabela);
	var t_rows = e.rows.length;

	for(i=1; i!=t_rows; i++) {
		
		if(trim(e.rows[i].cells[0].innerHTML)==id) {
			
			for(j=0; j!=a.length-1; j++) {
				e.rows[i].cells[j].innerHTML=a[j];
			}
			
		} // se achou apaga e marca troca como 1 pra ajeitar o estilo zebrado
		
	} // varre o grid em busca do codigo a atualizar! comeca de 1 pra pular o cabecalho do grid
}

