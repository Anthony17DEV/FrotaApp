//this function includes all necessary js files for the application   
function include(file) {   
  
  var script  = document.createElement('script');   
  script.src  = file;   
  script.type = 'text/javascript';   
  script.defer = true;   
  
  document.getElementsByTagName('head').item(0).appendChild(script);   
  
}   
  
/* include any js files here */   
include('/cactux/js/funcoes.js');   
include('/cactux/js/ajax.js');   
include('/cactux/js/div.js');   
include('/cactux/js/mascaras.js');   
include('/cactux/js/janela.js');   


