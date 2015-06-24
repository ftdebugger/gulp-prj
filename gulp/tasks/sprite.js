var config = require('../config').sprite,
    gulp = require('gulp'),
    sprite = require('gulp.spritesmith');

gulp.task('sprite', function () {
	var spriteData = gulp.src(config.src).pipe(sprite({
		imgName: config.name + '.png',
		cssName: config.name + '.less',
		cssFormat: '.less',
		algorithm: 'binary-tree',
		cssTemplate: 'src/less/utils/' + config.tpl,
		cssVarMap: function (sprite) {
			sprite.name = 'png-' + sprite.name;
			sprite.image = sprite.image;
		}
	}));
	spriteData.img
		.pipe(gulp.dest(config.dest));
	spriteData.css
		.pipe(gulp.dest('src/less/utils/'));
});
