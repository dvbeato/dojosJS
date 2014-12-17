define('sprite', [], function() {

	function Sprite(img, w, h, frames, speed) {
		this.img = img;
		this.h = h;
		this.w = w / frames;
		this.currentFrame = 0;
		this.frames = frames - 1;
		this.speed = speed;
		
		this.lastTimeDraw = new Date().getTime();

		this.draw = function(context, x, y) {
			var xFrame = this.currentFrame * this.w;

			var timeDraw = new Date().getTime();

			if ((timeDraw - this.lastTimeDraw) > this.speed) {
				this.currentFrame += this.currentFrame < this.frames ? 1: -this.frames;
				this.lastTimeDraw = timeDraw;
			}

 
			context.drawImage(this.img, xFrame, 0, this.w, this.h, x, y, this.w, this.h);
		}
	}

	return {
		Sprite:Sprite
	}
});