define('player', ['resources', 'scene', 'bullet'], function(resources, scene, bullet) {
	
	return {
		x:40,
		y:30,
		size:20,
		speed:5,
		color:'#000',
		life: 3,
		height: 69,
		width: 116,
		shotInterval: 300,
		live: true,

		shoot:function() {
			var offsetX = 40;
			var offSetY = 10;
			var bulletX = this.x + this.width - offsetX;
			var bulletY = (this.y + (this.height/2) - offSetY);
			// $(window).trigger("player.shoot", new Bullet(this.x, this.y))
			scene.addBullet(bullet.create(bulletX, bulletY));
			resources.sounds.bullet.currentTime = 0;
			resources.sounds.bullet.play();
		},

		draw:function(context) {
			context.drawImage(resources.images.player,this.x,this.y);
		},

		move:function(controle) {
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
 				if(this.shotInterval >= 5	){
					this.shoot();
					this.shotInterval = 0;
 				}
			}
		},
		update: function(){

		}
	}
});