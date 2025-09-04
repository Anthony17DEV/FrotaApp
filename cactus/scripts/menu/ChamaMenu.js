var menuModel = new DHTMLSuite.menuModel();
DHTMLSuite.configObj.setCssPath('cactus/estilos/menu/');
menuModel.addItemsFromMarkup('menuModel');
menuModel.setMainMenuGroupWidth(00);	
menuModel.init();
var menuBar = new DHTMLSuite.menuBar();
menuBar.addMenuItems(menuModel);
menuBar.setTarget('menuDiv');
menuBar.init();	