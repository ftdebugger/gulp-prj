var config = require('../config').less,
	gulp = require('gulp'),
	less = require('gulp-less'),
	prefix = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

gulp.task('less', function () {
	return gulp.src(config.src)
		.pipe(less({ ieCompat: false }))
		.pipe(prefix(config.prefix))
		.pipe(gulp.dest(config.dest))
		.pipe(reload({ stream: true }));
});
