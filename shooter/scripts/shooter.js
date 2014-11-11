(function() {

	var WIDTH = window.innerWidth - 5;
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

	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	window.addEventListener("keydown", function(e){
		nave.move(e);
	});

	var bullets = [];

	function Bullet(x, y) {
		this.x = x;
		this.y = y;

		this.draw = function() {
			context.drawImage(bulletImg,this.x,this.y);
		}

		this.update = function() {
			this.x += 30;
		}
	}

	var enemies = [];

	function Enemy() {
		this.x = WIDTH;
		this.y = (Math.random() * HEIGHT)+ 1;
		this.draw = function() {
			context.drawImage(enemyImg,this.x,this.y);
		}

		this.update = function() {
			this.x -= 5;
		}
	}

	var nave = {
		x:40,
		y:30,
		size:20,
		color:'#000',
		shoot:function() {
			bullets.push(new Bullet(this.x, this.y));
			bulletAudio.currentTime = 0;
			bulletAudio.play();
		},
		draw:function() {
			context.drawImage(playerImg,this.x,this.y);
		},
		move:function(e) {

			if(e.keyCode == 38){
				this.y -= 5;
			} 
			if (e.keyCode == 40){
				this.y += 5;
			}
			if(e.keyCode == 39){
				this.x += 5;
			}
			if(e.keyCode == 37){
				this.x -= 5;
			}
			if(e.keyCode == 13) {
				this.shoot();
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
	}

	function update() {

		bgLayer1.update();	
		bgLayer2.update();
		bullets.forEach(function(bullet) {
        	bullet.update();

        });

        enemies.forEach(function(enemy) {
        	enemy.update();
        });
	}

})()
