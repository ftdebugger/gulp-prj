(function () {
	var gulp = require('gulp'),
		browserSync = require('browser-sync'),
		concat = require('gulp-concat'),
		compass = require('gulp-compass'),
		include = require('gulp-file-include'),
		plumber = require('gulp-plumber')
		prefix = require('gulp-autoprefixer'),
		rimraf = require('gulp-rimraf'),
		uglify = require('gulp-uglify');

	var staticPath = 'dist/assets';
	var jsPath = staticPath + '/js';
	var cssPath = staticPath + '/css';
	var fontPath = staticPath + '/fonts';
	var imagesPath = staticPath + '/images';

	// resources
	gulp.task('resources', function () {
		gulp.src('src/images/**/*').pipe(gulp.dest(imagesPath));
		gulp.src('src/fonts/**/*').pipe(gulp.dest(fontPath));
	});

	gulp.task('images', function () {
		gulp.src('src/images/**/*').pipe(gulp.dest(imagesPath));
	});

	// bower
	var vendor = [
		'vendor/jquery/dist/jquery.js'
		];

	gulp.task('bower-dev', function () {
		gulp.src(vendor)
		   .pipe(concat('vendor.js'))
		   .pipe(gulp.dest(jsPath));
	});

	gulp.task('bower', function () {
		gulp.src(vendor)
		   .pipe(concat('vendor.js'))
		   .pipe(uglify())
		   .pipe(gulp.dest(jsPath));
	});
	
	// js
	gulp.task('js-dev', function () {
		gulp.src('src/js/index.js')
			.pipe(plumber())
			.pipe(concat('scripts.js'))
			.pipe(gulp.dest(jsPath))
			.pipe(browserSync.reload({stream:true, once: true}));
	});

	gulp.task('js', function () {
		gulp.src('src/js/index.js')
			.pipe(plumber())
			.pipe(concat('scripts.js'))
			.pipe(uglify())
			.pipe(gulp.dest(jsPath));
	});

	// html
	var html = function (develop) {
		gulp.src('src/*.html', {
				develop: develop
			})
			.pipe(plumber())
			.pipe(include())
			.pipe(gulp.dest('dist'))
			.pipe(browserSync.reload({stream:true}));
	};

	gulp.task('html-dev', function () {
		html(true);
	});
	
	gulp.task('html', function () {
		html(false);
	});

	// sass
	var sass = function (style) {
		gulp.src('src/sass/style.scss')
			.pipe(plumber())
			.pipe(compass({
				css: cssPath,
				sass: 'src/sass',
				image: imagesPath,
				javascript: jsPath,
				style: style,
				relative: true,
				comments: false
			}))
			.on('error', function(err) {
				// Would like to catch the error here
			})
			.pipe(prefix('last 2 version'))
			.pipe(browserSync.reload({stream:true}));
	};

	gulp.task('sass-dev', function () {
		sass('expanded');           
	});

	gulp.task('sass', function () {
		sass('compressed');
	});

	// clean
	gulp.task('clean', function () {
		return gulp.src('dist/**/*', { read: false })
			.pipe(rimraf({ force: true }));
	});

	// watch
	gulp.task('watch', ['build'], function () {
		gulp.watch('src/js/*', ['js-dev']);
		gulp.watch(['src/*.html', 'src/tpl/**/*'], ['html-dev']);
		gulp.watch('src/sass/**/*.scss', ['sass-dev']);
		gulp.watch('src/images/**/*', ['images']);
	});

	// server
	gulp.task('server', function() {
		browserSync.init(null, {
			port: 9000,
			notify: false,
			server: {
				baseDir: './dist/',
			}
		});
	});

	gulp.task('release', ['resources', 'bower', 'js', 'html', 'sass']);
	gulp.task('build', ['resources', 'bower-dev', 'js-dev', 'html-dev', 'sass-dev']);
	gulp.task('default', ['watch', 'server']);
})();
