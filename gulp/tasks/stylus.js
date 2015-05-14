var config = require('../config').stylus,
	gulp = require('gulp'),
	base64 = require('gulp-base64'),
	nib = require('nib'),
	stylus = require('gulp-stylus'),
	plumber = require('gulp-plumber'),
	prefix = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

gulp.task('stylus', function () {
	gulp.src(config.src)
		.pipe(stylus({ use: [nib()] }))
		.pipe(plumber())
		.pipe(base64({
			extensions: ['svg'],
			maxImageSize: 8*1024,
			debug: true
		}))
		.pipe(prefix(config.prefix))
		.pipe(gulp.dest(config.dest))
		.pipe(reload({ stream: true }));
});
