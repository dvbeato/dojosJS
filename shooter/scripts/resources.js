define('resources', [], function() {
	
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

	return {
		images: {
			enemy    :enemyImg,
			player   :playerImg,
			bullet   :bulletImg,
			bgLayer1 :bgLayer1Img,
			bgLayer2 :bgLayer2Img,
			mainbackground: mainbackgroundImg,
		},
		sounds: {
			bullet: bulletAudio,
			explosion: explosionAudio
		}
	}
})