var config = require('../config'),
    gulp = require('gulp'),
    sprite = require('gulp.spritesmith');

gulp.task('sprite', function () {
	var spriteData = gulp.src(config.sprite.src).pipe(sprite({
		imgName: config.sprite.name + '.png',
		cssName: config.sprite.name + config.proc.css.format,
		cssFormat: config.proc.css.name,
		algorithm: 'binary-tree',
		cssTemplate: 'src/' + config.proc.css.name + '/utils/' + config.sprite.tpl,
		cssVarMap: function (sprite) {
			sprite.name = 'png-' + sprite.name;
			sprite.image = sprite.image;
		}
	}));
	spriteData.img
		.pipe(gulp.dest(config.sprite.dest));
	spriteData.css
		.pipe(gulp.dest('src/' + config.proc.css.name + '/utils/'));
});
