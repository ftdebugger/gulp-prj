var config = require('../config').proc,
	gulp = require('gulp');

gulp.task('watch', ['build'], function () {
	gulp.watch(['bower.json', 'package.json'], ['bower']);
	gulp.watch('src/images/**/*', ['images', 'sprite']);
	gulp.watch('src/js/*', ['js']);
	gulp.watch('src/*.html', ['html']);
	gulp.watch('src/less/**/*.less', ['less']);
});
