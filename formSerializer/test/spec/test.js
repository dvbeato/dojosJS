
(function () {
    'use strict';

    describe('Dado um form', function () {
        describe('Transformar em objetos', function () {
            it('obter valor do form correto por id', function () {
            	var form = document.getElementById("form-test");

            	var objeto = {
            		texto: "teste",
            		check: false,
            		combo: "2"
            	};

            	var esperado = {}
            	var child, name;

            	var getValue = function(element) {
            		if(element.type == 'checkbox') {
            			return element.checked;
            		}
            		return element.value;
            	}

            	for(var index in form.children) {
        			child = form.children[index];

        			esperado[child.name] = getValue(child);
        		}

            	assert.equal(JSON.stringify(esperado), JSON.stringify(objeto));
            });
        });
    });
})();
