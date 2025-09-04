
function mascara_numeros(z){
    v = z.value; 
    v = v.replace(/\D/g,"")
	z.value = v; 
}

function mascara_reais(z){
	v = z.value; 
	v=v.replace(/\D/g,"")  //permite digitar apenas números 
	v=v.replace(/[0-9]{12}/,"inválido")   //limita pra máximo 999.999.999,99 
	v=v.replace(/(\d{1})(\d{8})$/,"$1.$2")  //coloca ponto antes dos últimos 8 digitos 
	v=v.replace(/(\d{1})(\d{5})$/,"$1.$2")  //coloca ponto antes dos últimos 5 digitos 
	v=v.replace(/(\d{1})(\d{1,2})$/,"$1,$2") //coloca virgula antes dos últimos 2 digitos 
	z.value = v; 
}

function mascara_telefone(z){

    v = z.value; 
    v=v.replace(/\D/g,"")                 //Remove tudo o que não é dígito
    v=v.replace(/^(\d\d)(\d)/g,"($1) $2") //Coloca parênteses em volta dos dois primeiros dígitos
//    v=v.replace(/(\d{4})(\d)/,"$1-$2")    //Coloca hífen entre o quarto e o quinto dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
	z.value = v; 
}

function mascara_cpf(z){
    v = z.value; 
    v=v.replace(/\D/g,"")                    //Remove tudo o que não é dígito
    v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
    v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
    v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
	z.value = v; 
}

function mascara_cep(z){
    v = z.value; 
    v=v.replace(/D/g,"")                //Remove tudo o que não é dígito
    v=v.replace(/^(\d{5})(\d)/,"$1-$2") //Esse é tão fácil que não merece explicações
	z.value = v; 
}

function mascara_cnpj(z){
    v = z.value; 
	
	if( v.length <= 14 ) {
		cpf(z);
		return;
	}
	
    v=v.replace(/\D/g,"")                           //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/,"$1.$2")             //Coloca ponto entre o segundo e o terceiro dígitos
    v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3") //Coloca ponto entre o quinto e o sexto dígitos
    v=v.replace(/\.(\d{3})(\d)/,".$1/$2")           //Coloca uma barra entre o oitavo e o nono dígitos
    v=v.replace(/(\d{4})(\d)/,"$1-$2")              //Coloca um hífen depois do bloco de quatro dígitos
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
    v=v.replace(/[^a-zA-Z0-9]/g,"")                //Remove tudo o que não é dígito
    v=v.replace(/^(\D{3})(\d)/,"$1-$2") //Esse é tão fácil que não merece explicações
	z.value = v; 
}
