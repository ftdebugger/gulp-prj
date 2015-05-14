var config = require('../config').js,
	gulp = require('gulp'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

gulp.task('js', function () {
	gulp.src(config.src)
		.pipe(plumber())
		.pipe(concat(config.target))
		.pipe(gulp.dest(config.dest))
		.pipe(browserSync.reload({ stream: true, once: true }));
});
