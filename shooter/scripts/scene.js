define('scene', [], function() {
		
	var elements = [];	
	var enemies = [];
	var bullets = [];

	var WIDTH = 800
	   ,HEIGHT = 480;

	function draw(context) {
		elements.forEach(function(element) {
        	element.draw(context);
        });

		enemies.forEach(function(enemy) {
        	enemy.draw(context);
        });

		bullets.forEach(function(bullet) {
        	bullet.draw(context);
        });        
	}

	function update(){
		elements.forEach(function(element) {
        	element.update();

        	if (element.x > WIDTH ) {
				element.live = false;
			}

        });

		enemies.forEach(function(enemy) {
        	enemy.update();
        });

        bullets.forEach(function(bullet){
        	bullet.update();
        });

        enemies = enemies.filter(function(enemy) {
			return enemy.live;
		})

        elements = elements.filter(function(element) {
			return element.live;
		})

        bullets = bullets.filter(function(bullet) {
			return bullet.live;
		})		
	}

	return {
		addElement:function(element) { elements.push(element) },
		addEnemy:function(enemy) { enemies.push(enemy) },
		addBullet: function(bullet) { bullets.push(bullet) },
		getElements:function() { return elements; },
		getEnemies:function() { return enemies; },
		getBullets:function() { return bullets; },
		draw:draw,
		update: update

	}
});
