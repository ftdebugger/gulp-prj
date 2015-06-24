var config = require('../config').js,
	gulp = require('gulp'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	uglify = require('gulp-uglify');

gulp.task('js', function () {
	gulp.src(config.src)
		.pipe(plumber())
		.pipe(concat(config.target))
		.pipe(gulp.dest(config.dest))
		.pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task('js-release', function () {
	gulp.src(config.src)
		.pipe(plumber())
		.pipe(concat(config.target))
		.pipe(uglify())
		.pipe(gulp.dest(config.dest));
});
