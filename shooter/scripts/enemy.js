define('enemy', ['resources'], function(resources) {

	function Enemy(x, y) {

		var life = 150;

		this.score = 10;
		this.x = x;
		this.y = y;
		this.live = true;
		this.height = 60;
		this.width = 46;
		this.speed = 5;
		this.life = life;

		this.draw = function(context) {
			// drawColision("red", this.x, this.y, this.width, this.height);			
			var currentLife = this.life / life;
			var color; 

			if (currentLife == 1) {
				 color = "#0F0" ;
			} else if (currentLife <= 0.5) {
				color = "#F00";
			} else if (currentLife <= 0.8) {
				color = "#FF0";
			}

			var params = {
				x: this.x, 
				y: (this.y - 20), 
				w: ( (currentLife) * this.width ), 
				h: 10,
				color: color
			};

			drawLife(context, params);
			context.drawImage(resources.images.enemy,this.x,this.y);
		}

		this.receiveDamage = function(damage) {
			this.life -= damage;
			this.live = this.life > 0;				
		}
		
		function drawLife(context, params) {
			context.beginPath();
			context.lineWidth="1";
			context.strokeStyle="#000";
			context.rect(params.x, params.y, params.w, params.h);

			context.stroke();
			context.fillStyle=params.color;
			context.fillRect(params.x, params.y, params.w, params.h);
		}

		this.update = function() {
			this.x -= this.speed;
			if (this.x < 0 ) {
				this.live = false;
			}
		}
	}

	function create(x, y) {
		return new Enemy(x, y);
	}


	return {
		create: create
	}
});


