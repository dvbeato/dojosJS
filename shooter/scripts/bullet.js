define('bullet', ['resources'], function(resources) {

	function Bullet(x, y) {

		this.x = x;
		this.y = y;
		this.height = 16;
		this.width = 46;
		this.live = true;

		this.draw = function(context) {
			// drawColision("green", this.x, this.y, this.width, this.height);
			context.drawImage(resources.images.bullet,this.x,this.y);
		}

		this.update = function() {
			this.x += 30;

			if (this.x > 800 ) {
				this.live = false;
			}
		}
	}	

	function create(x, y) {
		return new Bullet(x, y);
	}

	return {
		create: create
	}

});	