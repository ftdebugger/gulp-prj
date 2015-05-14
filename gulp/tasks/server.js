var gulp = require('gulp'),
    browserSync = require('browser-sync');

gulp.task('server', function() {
	browserSync({
		port: 9000,
		notify: false,
		open: false,
		server: {
			baseDir: 'dist/'
		}
	});
});
