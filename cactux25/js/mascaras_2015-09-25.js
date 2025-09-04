
function mascara_numeros(z){
    v = z.value; 
    v = v.replace(/\D/g,"")
	z.value = v; 
}

function mascara_reais(z){
	v = z.value; 
	v=v.replace(/\D/g,"")  //permite digitar apenas n�meros 
	v=v.replace(/[0-9]{12}/,"inv�lido")   //limita pra m�ximo 999.999.999,99 
	v=v.replace(/(\d{1})(\d{8})$/,"$1.$2")  //coloca ponto antes dos �ltimos 8 digitos 
	v=v.replace(/(\d{1})(\d{5})$/,"$1.$2")  //coloca ponto antes dos �ltimos 5 digitos 
	v=v.replace(/(\d{1})(\d{1,2})$/,"$1,$2") //coloca virgula antes dos �ltimos 2 digitos 
	z.value = v; 
}

function mascara_telefone(z){

    v = z.value; 
    v=v.replace(/\D/g,"")                 //Remove tudo o que n�o � d�gito
    v=v.replace(/^(\d\d)(\d)/g,"($1) $2") //Coloca par�nteses em volta dos dois primeiros d�gitos
//    v=v.replace(/(\d{4})(\d)/,"$1-$2")    //Coloca h�fen entre o quarto e o quinto d�gitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca h�fen entre o quarto e o quinto d�gitos
	z.value = v; 
}

function mascara_cpf(z){
    v = z.value; 
    v=v.replace(/\D/g,"")                    //Remove tudo o que n�o � d�gito
    v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca um ponto entre o terceiro e o quarto d�gitos
    v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca um ponto entre o terceiro e o quarto d�gitos
    v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2") //Coloca um h�fen entre o terceiro e o quarto d�gitos
	z.value = v; 
}

function mascara_cep(z){
    v = z.value; 
    v=v.replace(/D/g,"")                //Remove tudo o que n�o � d�gito
    v=v.replace(/^(\d{5})(\d)/,"$1-$2") //Esse � t�o f�cil que n�o merece explica��es
	z.value = v; 
}

function mascara_cnpj(z){
    v = z.value; 
	
	if( v.length <= 14 ) {
		cpf(z);
		return;
	}
	
    v=v.replace(/\D/g,"")                           //Remove tudo o que n�o � d�gito
    v=v.replace(/^(\d{2})(\d)/,"$1.$2")             //Coloca ponto entre o segundo e o terceiro d�gitos
    v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3") //Coloca ponto entre o quinto e o sexto d�gitos
    v=v.replace(/\.(\d{3})(\d)/,".$1/$2")           //Coloca uma barra entre o oitavo e o nono d�gitos
    v=v.replace(/(\d{4})(\d)/,"$1-$2")              //Coloca um h�fen depois do bloco de quatro d�gitos
	z.value = v; 
}

function mascara_area(z){
    v = z.value;
	v=v.replace(/\D/g,"") 
	v=v.replace(/(\d)(\d{2})$/,"$1.$2") 
	z.value = v; 		
}
		
function mascara_data(z){
    v = z.value;
	v=v.replace(/\D/g,"") 
	v=v.replace(/(\d{2})(\d)/,"$1/$2") 
	v=v.replace(/(\d{2})(\d)/,"$1/$2") 
	z.value = v; 
}

function mascara_hora(z){
    v = z.value;
	v=v.replace(/\D/g,"") 
	v=v.replace(/(\d{2})(\d)/,"$1:$2")  
	z.value = v; 
}

function mascara_placa(z){
    v = z.value; 
    v=v.replace(/[^a-zA-Z0-9]/g,"")                //Remove tudo o que n�o � d�gito
    v=v.replace(/^(\D{3})(\d)/,"$1-$2") //Esse � t�o f�cil que n�o merece explica��es
	z.value = v; 
}
