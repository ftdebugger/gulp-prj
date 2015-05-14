var config = require('../config').proc,
	gulp = require('gulp'),
	run = require('run-sequence');

gulp.task('build', ['clean'], function (done) {
	run(['sprite', 'images', 'bower', 'js'], config.html.name, config.css.name, done);
});
