define(['bullet'], function(bullet) {

	describe('Bullet Module Test', function() {

		it('should create new bullet', function() {
			var newBullet = bullet.create;
			expect(newBullet).toBeDefined();
		})

	});
});
