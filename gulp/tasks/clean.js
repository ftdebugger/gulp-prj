var gulp = require('gulp'),
	clean = require('gulp-rimraf');

gulp.task('clean', function () {
	return gulp.src('dist/', { read: false })
		.pipe(clean({ force: true }));
});
