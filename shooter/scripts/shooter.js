(function() {

	var WIDTH = 800;
	var HEIGHT = 480;

	var context, canvas;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	var playerImg = new Image;
	playerImg.src = 'images/player.png';
	
	var bulletImg = new Image;
	bulletImg.src = 'images/laser.png';

	var mainbackgroundImg = new Image;
	mainbackgroundImg.src = 'images/mainbackground.png';

	var bgLayer1Img = new Image;
	bgLayer1Img.src = 'images/bgLayer1.png';

	var bgLayer2Img = new Image;
	bgLayer2Img.src = 'images/bgLayer2.png';

	var enemyImg = new Image;
	enemyImg.src = 'images/mine.png';

	var bulletAudio = new Audio;
	bulletAudio.src = 'sounds/laserFire.wav'; 


	var explosionAudio = new Audio;
	explosionAudio.src = 'sounds/explosion.wav'; 

	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	var controle = {
		'up':false,
		'down':false,
		'right':false,
		'left':false,
		'shoot':false
	}
	
	var UP = 38,
		DOWN = 40,
		RIGHT = 39,
		LEFT = 37,
		SHOOT=32;

	window.addEventListener("keyup", function(e){ 
		if(e.keyCode == UP){
			controle.up = false;
		} 
		if (e.keyCode == DOWN){
			controle.down = false;
		}
		if(e.keyCode == RIGHT){
			controle.right = false;
		}
		if(e.keyCode == LEFT){
			controle.left = false;
		}
		if(e.keyCode == SHOOT) {
			controle.shoot = false ;
		}		
	});

	window.addEventListener("keydown", function(e){
		
		if(e.keyCode == UP){
			controle.up = true;
		} 
		if (e.keyCode == DOWN){
			controle.down = true;
		}
		if(e.keyCode == RIGHT){
			controle.right = true;
		}
		if(e.keyCode == LEFT){
			controle.left = true;
		}
		if(e.keyCode == SHOOT) {
			controle.shoot = true;
		}		
	});


	var bullets = [];

	function Bullet(x, y) {
		this.x = x;
		this.y = y;
		this.height = 16;
		this.width = 46;
		this.live = true;

		this.draw = function() {
			// drawColision("green", this.x, this.y, this.width, this.height);
			context.drawImage(bulletImg,this.x,this.y);
		}

		this.update = function() {
			this.x += 30;
			if (this.x > WIDTH ) {
				this.live = false;
			}
		}
	}

	var enemies = [];

	function Enemy() {
		this.x = WIDTH;
		this.y = (Math.random() * HEIGHT)+ 1;
		this.live = true;
		this.height = 60;
		this.width = 46;
		this.draw = function() {
			// drawColision("red", this.x, this.y, this.width, this.height);			
			context.drawImage(enemyImg,this.x,this.y);

		}

		this.update = function() {
			this.x -= 5;
			if (this.x < 0 ) {
				this.live = false;
			}
		}
	}

	function drawColision(color, x, y, width, height) {
		context.beginPath();
		context.lineWidth="3";
		context.strokeStyle=color;
		context.rect(x,y,width,height);
		context.stroke();
	}

	var nave = {
		x:40,
		y:30,
		size:20,
		speed:5,
		color:'#000',
		heigth: 69,
		width: 116,
		shotInterval: 300,
		shoot:function() {
			bullets.push(new Bullet(this.x, this.y));
			bulletAudio.currentTime = 0;
			bulletAudio.play();
		},
		draw:function() {

			context.drawImage(playerImg,this.x,this.y);
		},

		move:function() {
			this.shotInterval += 1;

			if(controle.up){
				if (this.y < 0) this.y = 0;

				this.y -= this.speed;
			} 
			if (controle.down){
				var heigthLimit = HEIGHT - this.heigth ;
				if ( this.y > heigthLimit ) this.y = heigthLimit ;
				this.y += this.speed;
			}
			if(controle.right){
				this.x += this.speed;
			}
			if(controle.left){
				this.x -= this.speed;
			}
			if(controle.shoot) {
 				if(this.shotInterval >= 5	){
					this.shoot();
					this.shotInterval = 0;
 				}
			}


		}
	};

	var bgLayer1  = {
		x:0,
		update: function() {
			this.x -= 5;

			if ( this.x <= -800 ){
				this.x = 0;	
			}

		},
		draw: function() {
			context.drawImage(bgLayer1Img, this.x,0);
			context.drawImage(bgLayer1Img, this.x + 800 ,0);		
		}
	}

	var bgLayer2 = {
		x:0,
		update: function() {
			this.x -= 15;

			if ( this.x <= -800 ){
				this.x = 0;	
			}

		},
		draw: function() {
			context.drawImage(bgLayer1Img, this.x,0);
			context.drawImage(bgLayer1Img, this.x + 800 ,0);		
		}	
	}

	setInterval(function(){
		draw();
		update();
	}, 33);

	setInterval(function(){
		enemies.push(new Enemy());
	}, 1000);


	function draw() {
		context.clearRect(0,0, WIDTH,HEIGHT);
		
		context.drawImage(mainbackgroundImg, 0,0);
		bgLayer1.draw();
		bgLayer2.draw();

        nave.draw();

        bullets.forEach(function(bullet) {
        	bullet.draw();
        });

        enemies.forEach(function(enemy) {
        	enemy.draw();
        });

        context.font = "30px Arial";
		context.fillText('Enemies : ' + enemies.length ,10,30) 
		context.fillText('Bullets : ' + bullets.length ,WIDTH - 300,30) 
	}

	function detectColision(bullet, enemy) {
		return (bullet.x + bullet.width > enemy.x) &&
			   (enemy.y + enemy.height > bullet.y) &&
			   (enemy.y < bullet.y + bullet.height) ;
	}

	function update() {

		bgLayer1.update();	
		bgLayer2.update();
		bullets.forEach(function(bullet) {
        	bullet.update();
        });

		nave.move();

		bullets = bullets.filter(function(bullet) {
			return bullet.live;
        });        	

        enemies.forEach(function(enemy) {
        	enemy.update();
			bullets.forEach(function(bullet) {
				if(detectColision(bullet, enemy)) {
					enemy.live = bullet.live = false;
					explosionAudio.currentTime = 0;
					explosionAudio.play();
					if(nave.speed <= 15)
						nave.speed += 3;
				}
        	});        	
        });

        enemies = enemies.filter(function(enemy) {
			return enemy.live;
		})


	}

})()
