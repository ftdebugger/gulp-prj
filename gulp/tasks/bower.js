var config = require('../config').bower,
	gulp = require('gulp'),
	bower = require('main-bower-files'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

gulp.task('bower', function () {
	return gulp.src(bower())
		.pipe(concat(config.target))
		.pipe(gulp.dest(config.dest));
});

gulp.task('bower-release', function () {
	return gulp.src(bower())
		.pipe(concat(config.target))
		.pipe(uglify())
		.pipe(gulp.dest(config.dest));
});
