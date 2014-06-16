(function () {
    var gulp = require('gulp'),
        concat = require('gulp-concat'),
        tools = require('gulp-tools'),
        include = require('gulp-file-include');

    var staticPath = 'dist/assets';
    var baseUrl = 'assets';
    var jsPath = staticPath + '/js';
    var cssPath = staticPath + '/css';
    var fontPath = staticPath + '/fonts';
    var imagesPath = staticPath + '/images';

    // resources
    gulp.task('resources', function () {
        gulp.src('src/images/**/*').pipe(gulp.dest(imagesPath));
        gulp.src('src/fonts/**/*').pipe(gulp.dest(cssPath + '/fonts'));
        gulp.src('src/images/favicon.*').pipe(gulp.dest(imagesPath));
    });

    gulp.task('images', function () {
        gulp.src('src/images/**/*').pipe(gulp.dest(imagesPath));
    });

    // bower
    gulp.task('bower-dev', function () {
        tools.bower()
            .pipe(concat('vendor.js'))
            .pipe(gulp.dest(jsPath));
    });

    gulp.task('bower', function () {
        tools.bower()
            .pipe(concat('vendor.js'))
            .pipe(tools.jsMinify())
            .pipe(gulp.dest(jsPath));
    });
    
    // js
    gulp.task('js-dev', function () {
        tools.js('src/js/index.js')
            .pipe(concat('scripts.js'))
            .pipe(gulp.dest(jsPath))
            .pipe(tools.browserReload());
    });

    gulp.task('js', function () {
        tools.js('src/js/index.js')
            .pipe(concat('scripts.js'))
            .pipe(tools.jsMinify())
            .pipe(gulp.dest(jsPath));
    });

    // html
    var html = function (develop) {
        return tools
            .html('src/*.html', {
                develop: develop
            })
            .pipe(include())
            .pipe(gulp.dest('dist'));
    };

    gulp.task('html-dev', function () {
        html(true).pipe(tools.browserReload());
    });
    
    gulp.task('html', function () {
        html(false);
    });

    // css
    var css = function (style) {
        return tools
            .compass('src/sass/style.scss', {
                css: cssPath,
                sass: 'src/sass',
                image: imagesPath,
                javascript: jsPath,
                style: style,
                relative: true,
                comments: false
            });
    };

    gulp.task('css-dev', function () {
        css('expanded')
            .on('error', function(err) {
                // Would like to catch the error here
            })
            .pipe(tools.browserReload());
    });

    gulp.task('css', function () {
        css('compressed');
    });

    // clean
    gulp.task('clean', function () {
        tools.clean(['dist/**/*', '.tmp']);
    });

    // watch
    gulp.task('watch', ['build'], function () {
        gulp.watch('src/js/*', ['js-dev']);
        gulp.watch(['src/*.html', 'src/tpl/**/*'], ['html-dev']);
        gulp.watch('src/sass/**/*.scss', ['css-dev']);
        gulp.watch('src/images/**/*', ['images']);
    });

    // server
    gulp.task('server', function () {
        tools.server().rewriteToIndex().listen();
    });

    gulp.task('release', ['resources', 'bower', 'js', 'html', 'css']);
    gulp.task('build', ['resources', 'bower-dev', 'js-dev', 'html-dev', 'css-dev']);
    gulp.task('default', ['watch', 'server']);
})();
