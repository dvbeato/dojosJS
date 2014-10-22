var bluesoft = {};

bluesoft.Produto = (function(container, dependencia, scope) { 
	'use strict';

	var container = $(container);
	
	var form = {
		opcoes        : scope.find('[name="opcoes"]'),
		codigoInterno : scope.find('[name="codigoInterno"]'),
		descricao     : scope.find('[name="descricao"]'),
		gtin          : scope.find('[name="gtin"]')
	};

	function _loadBinds(){
		// Do your magic
		container
			.on("event", ".selector",  _method ) 
			.on("event", ".selector",  _method )
			.on("event", ".selector",  _method );

		scope
			.on("bluesoft.product.ready", _privateMethod);
	}

	function _validate() {
		if (form.descricao.val().trim() == '') {
		}
	}

	function _method(e){
		var this = e.target;
		// Do your magic
	}

	function _loadEvents(){
		// Do your magic

	}

	function _privateMethod(){
		// Do your magic
	}

	function publicMethod(){
		form.descricao.val('novo valor');
	}

	//construtor
	(function init() {	
		_loadBinds();
		_loadEvents();
		container.trigger("bluesoft.product.ready");
	})();

	return {
		publicMethod  : publicMethod
	}

})(window.document, dependencia, $('#formBuscaProduto'));



