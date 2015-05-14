var config = require('../config').bower,
	gulp = require('gulp'),
	bower = require('main-bower-files'),
	concat = require('gulp-concat');

gulp.task('bower', function () {
	return gulp.src(bower())
		.pipe(concat(config.target))
		.pipe(gulp.dest(config.dest));
});
