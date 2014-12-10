define('scene', [], function() {
		
	var elements = [];	
	var enemies = [];
	var bullets = [];
	var player = null;

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

        context.font = "20px Arial";
		context.fillStyle = "#fff";
		context.fillText('Score: ' + player.score, 5, 60);
		
		// context.fillText('Bullets : ' + scene.getBullets().length ,170,30); 

		var positionStart = 20;

		for(var i = 0; i < player.life; i ++) {
			var positionX = 40 * i;
			var positionY = 20;
			var radius = 15;

			context.fillStyle = "#F00";
			context.beginPath();
			context.arc(positionStart + positionX, positionY, radius, 0, 2 * Math.PI);	
			context.fill();
		}
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

	function addElement(element) { elements.push(element) }

	return {
		addPlayer:function(element) {
			player = element;
			addElement(element); 
		},
		addElement: addElement,
		addEnemy:function(enemy) { enemies.push(enemy) },
		addBullet: function(bullet) { bullets.push(bullet) },
		getElements:function() { return elements; },
		getEnemies:function() { return enemies; },
		getBullets:function() { return bullets; },
		draw:draw,
		update: update

	}
});
