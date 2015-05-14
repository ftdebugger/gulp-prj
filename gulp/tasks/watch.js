var config = require('../config').proc,
	gulp = require('gulp');

gulp.task('watch', ['build'], function () {
	gulp.watch(['bower.json', 'package.json'], ['bower']);
	gulp.watch('src/images/**/*', ['images', 'sprite']);
	gulp.watch('src/js/*', ['js']);
	gulp.watch(['src/' + config.html.name + '/*' + config.html.format, 'src/' + config.html.name + '/tpl/**/*'], [config.html.name]);
	gulp.watch('src/' + config.css.name + '/**/*' + config.css.format, [config.css.name]);
});
