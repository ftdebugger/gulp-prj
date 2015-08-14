var configFactory = require('../webpack.config'),
    browserSync = require('browser-sync'),
    webpack = require('webpack'),
    gutil = require('gulp-util'),
    gulp = require('gulp'),
    _ = require('lodash');

require('injectify');
require('injectify-include/inject');

var runWebpack = function (config, callback) {
    callback = _.once(callback);

    webpack(config, function (err, stats) {
        if (err) {
            gutil.log(gutil.colors.cyan('[webpack]'), gutil.colors.red(err));
        } else {
            gutil.log(gutil.colors.cyan('[webpack]'), stats.toString(config.stats));
        }

        callback();
    });
};

gulp.task('js', function (callback) {
    runWebpack(configFactory(true), callback);
});

gulp.task('js-release', function (callback) {
    runWebpack(configFactory(false), callback);
});
