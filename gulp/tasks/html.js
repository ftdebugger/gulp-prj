var config = require('../config').html,
	gulp = require('gulp'),
	include = require('gulp-file-include'),
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

gulp.task('html', function () {
	gulp.src(config.src)
		.pipe(plumber())
		.pipe(include())
		.pipe(gulp.dest(config.dest))
		.pipe(reload({ stream: true }));
});
