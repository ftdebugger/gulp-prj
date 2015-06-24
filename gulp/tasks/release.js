var config = require('../config').proc,
	gulp = require('gulp'),
	run = require('run-sequence');

gulp.task('release', ['clean'], function (done) {
	run(['sprite', 'images', 'bower-release', 'js-release'], 'html-release', 'less-release', done);
});
