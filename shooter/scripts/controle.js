define('controle', [], function() {

	var controle = {
		'up':false,
		'down':false,
		'right':false,
		'left':false,
		'shoot':false
	}
	
	var key = {
			UP    :38,
			LEFT  :37,
			DOWN  :40,
			RIGHT :39,
			SHOOT :32
		};

	window.addEventListener("keyup", function(e){ 
		if(e.keyCode == key.UP){
			controle.up = false;
		} 
		if (e.keyCode == key.DOWN){
			controle.down = false;
		}
		if(e.keyCode == key.RIGHT){
			controle.right = false;
		}
		if(e.keyCode == key.LEFT){
			controle.left = false;
		}
		if(e.keyCode == key.SHOOT) {
			controle.shoot = false ;
		}		
	});

	window.addEventListener("keydown", function(e){
		
		if(e.keyCode == key.UP){
			controle.up = true;
		} 
		if (e.keyCode == key.DOWN){
			controle.down = true;
		}
		if(e.keyCode == key.RIGHT){
			controle.right = true;
		}
		if(e.keyCode == key.LEFT){
			controle.left = true;
		}
		if(e.keyCode == key.SHOOT) {
			controle.shoot = true;
		}		
	});

	return {
		isPressed:function(key) {
			return controle[key];
		}
	}

});