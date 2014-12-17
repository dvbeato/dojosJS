define('player', ['resources', 'scene', 'bullet', 'sprite'], function(resources, scene, bullet, sprite) {
	
	function Player() {
		this.score = 0;
		this.x = 40;
		this.y = 30;
		this.size = 20;
		this.speed = 2;
		this.color = '#000';
		this.life = 3;
		this.height = 69;
		this.width = 116;
		this.spriteWidth = 920;
		this.frames = 8;
		this.shotInterval = 1000;
		this.live = true;
		this.sprite = new sprite.Sprite(resources.images.playerSprite, this.spriteWidth, this.height, this.frames, 70);

		this.shoot = function() {
			var offsetX = 40;
			var offSetY = 10;
			var bulletX = this.x + this.width - offsetX;
			var bulletY = (this.y + (this.height/2) - offSetY);
			scene.addBullet(bullet.create(bulletX, bulletY));
			resources.sounds.bullet.currentTime = 0;
			resources.sounds.bullet.play();
		};

		this.draw = function(context) {
			this.sprite.draw(context,this.x, this.y);	
		};

		this.move = function(controle) {
			this.shotInterval += 1;

			if(controle.isPressed('up')){
				this.y -= this.speed;
			} 
			if (controle.isPressed('down')) {
				this.y += this.speed;
			}
			if(controle.isPressed('right')){
				this.x += this.speed;
			}
			if(controle.isPressed('left')){
				this.x -= this.speed;
			}
			if(controle.isPressed('shoot')) {
 				if(this.shotInterval >= 10	){
					this.shoot();
					this.shotInterval = 0;
 				}
			}
		};

		this.update = function(){

		}
	}

	return new Player();
});