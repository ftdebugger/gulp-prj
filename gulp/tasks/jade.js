var config = require('../config').jade,
	gulp = require('gulp'),
	jade = require('gulp-jade'),
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

gulp.task('jade', function () {
	gulp.src(config.src)
		.pipe(plumber())
		.pipe(jade({
			locals: {},
			pretty: true
		}))
		.pipe(gulp.dest(config.dest))
		.pipe(reload({ stream: true }));
});
