define('shooter', ['resources', 'controle', 'player', 'scene', 'enemy'], function(resources, controle, player, scene, enemy) {

	var WIDTH = 800;
	var HEIGHT = 480;
	var FPS = 1000/60;
	var bgLayer1  = {
		live:true,
		x:0,
		update: function() {
			this.x -= 5;

			if ( this.x <= -800 ){
				this.x = 0;	
			}
		},
		draw: function() {
			context.drawImage(resources.images.bgLayer1, this.x,0, WIDTH, HEIGHT);
			context.drawImage(resources.images.bgLayer1, this.x + 800 ,0, WIDTH, HEIGHT);		
		}
	}

	var bgLayer2 = {
		live:true,
		x:0,
		update: function() {
			this.x -= 15;

			if ( this.x <= -800 ){
				this.x = 0;	
			}

		},
		draw: function() {
			context.drawImage(resources.images.bgLayer2, this.x, 0, WIDTH, HEIGHT);
			context.drawImage(resources.images.bgLayer2, this.x + 800 ,0, WIDTH, HEIGHT);		
		}	
	}

	scene.addElement(bgLayer1);
	scene.addElement(bgLayer2);


	scene.addPlayer(player);


	var context, canvas;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	function drawColision(color, x, y, width, height) {
		context.beginPath();
		context.lineWidth="3";
		context.strokeStyle=color;
		context.rect(x,y,width,height);
		context.stroke();
	}

	setInterval(function(){
		draw();
		update();
	}, FPS);

	setInterval(function(){
		scene.addEnemy( enemy.create(WIDTH, (Math.random() * HEIGHT)+ 1) );
	}, 1000);


	function draw() {

		context.drawImage(resources.images.mainbackground, 0,0);

        scene.draw(context);
	}

	function detectColision(actor, coactor) {
		return (actor.x + actor.width > coactor.x) &&
			   (coactor.y + coactor.height > actor.y) &&
			   (coactor.y < actor.y + actor.height) ;
	}

	function update() {

		player.move(controle);

		scene.getEnemies().forEach(function(enemy) {
			
			if(detectColision(player, enemy)) {
				player.life -= 1;
				if(player.speed > 3) player.speed -= 1;
				enemy.live = false;
				if (player.life <= 0) {
					location.reload();	
				}
			}

			scene.getBullets().forEach(function(bullet) {
				if(detectColision(bullet,enemy)) {
					//enemy.live = bullet.live = false;
					bullet.live = false;
					enemy.receiveDamage(bullet.damage);
					resources.sounds.explosion.currentTime = 0;
					resources.sounds.explosion.play();
					player.score += enemy.score;
					if(player.speed <= 5)
						player.speed += 1;
				}
			});
		});		

        scene.update();

	}
});


