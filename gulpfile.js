(function () {
	var gulp = require('gulp'),
		bower = require('main-bower-files'),
		browserSync = require('browser-sync'),
		concat = require('gulp-concat'),
		sprite = require('gulp.spritesmith'),
		stylus = require('gulp-stylus'),
		include = require('gulp-file-include'),
		minifyCSS = require('gulp-minify-css'),
		nib = require('nib'),
		plumber = require('gulp-plumber'),
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
	gulp.task('bower-dev', function() {
		return gulp.src(bower())
			.pipe(concat('vendor.js'))
			.pipe(gulp.dest(jsPath));			
	});

	gulp.task('bower', function() {
		return gulp.src(bower())
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
			.pipe(browserSync.reload({ stream:true, once: true }));
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
			.pipe(browserSync.reload({ stream:true }));
	};

	gulp.task('html-dev', function () {
		html(true);
	});
	
	gulp.task('html', function () {
		html(false);
	});

	// sprite
	gulp.task('sprite', function () {
		var spriteData = gulp.src('src/images/spr-ico/*.png').pipe(sprite({
			imgName: 'spr-ico.png',
			cssName: '_spr-ico.styl',
			cssVarMap: function (sprite) {
				sprite.name = 'spr-' + sprite.name;
				sprite.image = '../images/' + sprite.image;
		    }
		}));
		spriteData.img
			.pipe(gulp.dest(imagesPath));

		spriteData.css
			.pipe(gulp.dest('src/stylus/utils/'));
	});

	// stylus
	gulp.task('stylus-dev', function () {
	  gulp.src('src/stylus/style.styl')
		.pipe(stylus({ use: [nib()] }))
		.pipe(plumber())
		.pipe(gulp.dest(cssPath))
		.pipe(prefix('last 2 version'))
		.pipe(browserSync.reload({ stream:true }));
	});

	gulp.task('stylus', ['stylus-dev'], function() {
	  gulp.src(cssPath + '/style.css')
		.pipe(minifyCSS())
		.pipe(gulp.dest(cssPath))
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
		gulp.watch('src/stylus/**/*.styl', ['stylus-dev']);
		gulp.watch('src/images/**/*', ['images', 'sprite']);
	});

	// server
	gulp.task('server', function() {
		browserSync.init(null, {
			port: 9000,
			notify: false,
			server: {
				baseDir: 'dist/'
			}
		});
	});

	gulp.task('release', ['resources', 'bower', 'js', 'html', 'sprite', 'stylus']);
	gulp.task('build', ['resources', 'bower-dev', 'js-dev', 'html-dev', 'sprite', 'stylus-dev']);
	gulp.task('default', ['watch', 'server']);
})();
