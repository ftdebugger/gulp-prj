var config = require('../config').html,
	gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	htmlmin = require('gulp-htmlmin'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

gulp.task('html', function () {
	gulp.src(config.src)
		.pipe(plumber())
		.pipe(gulp.dest(config.dest))
		.pipe(reload({ stream: true }));
});

gulp.task('html-release', function () {
	gulp.src(config.src)
		.pipe(plumber())
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest(config.dest));
});
