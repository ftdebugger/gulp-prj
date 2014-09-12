(function () {
	var gulp = require('gulp'),
		bower = require('main-bower-files'),
		browserSync = require('browser-sync'),
		clean = require('gulp-rimraf'),
		concat = require('gulp-concat'),
		jade = require('gulp-jade'),
		sprite = require('gulp.spritesmith'),
		stylus = require('gulp-stylus'),
		minifyCSS = require('gulp-minify-css'),
		nib = require('nib'),
		plumber = require('gulp-plumber'),
		prefix = require('gulp-autoprefixer'),
		htmlmin = require('gulp-htmlmin'),
		uglify = require('gulp-uglify');

	var staticPath = 'dist/assets';
	var jsPath = staticPath + '/js';
	var cssPath = staticPath + '/css';
	var fontPath = staticPath + '/fonts';
	var imagesPath = staticPath + '/images';

	// resources
	gulp.task('resources', ['images'], function () {
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

	// jade
	gulp.task('jade-dev', function() {
		gulp.src('src/*.jade')
			.pipe(plumber())
			.pipe(jade({
				locals: {},
				pretty: true
			}))
			.pipe(gulp.dest('dist'))
			.pipe(browserSync.reload({ stream:true }));
	});

	gulp.task('jade', function() {
		gulp.src('src/*.jade')
			.pipe(plumber())
			.pipe(jade({
				locals: {},
				pretty: true
			}))
			.pipe(htmlmin({collapseWhitespace: true}))
			.pipe(gulp.dest('dist'));
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

	// sprite
	gulp.task('sprite', function () {
		var spriteData = gulp.src('src/images/spr-ico/*.png').pipe(sprite({
			imgName: 'spr-ico.png',
			cssName: '_spr-ico.styl',
			cssVarMap: function (sprite) {
				sprite.name = 'spr-' + sprite.name;
				sprite.image = '.images/' + sprite.image;
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
			.pipe(prefix('last 2 version'))
			.pipe(gulp.dest(cssPath))
			.pipe(browserSync.reload({ stream:true }));
	});

	gulp.task('stylus', function() {
		gulp.src('src/stylus/style.styl')
			.pipe(stylus({ use: [nib()] }))
			.pipe(plumber())
			.pipe(prefix('last 2 version'))
			.pipe(minifyCSS())
			.pipe(gulp.dest(cssPath));
	});

	// clean
	gulp.task('clean', function () {
		return gulp.src('dist/', { read: false })
			.pipe(clean({ force: true }));
	});

	// watch
	gulp.task('watch', ['build'], function () {
		gulp.watch(['bower.json', 'package.json'], ['bower-dev']);
		gulp.watch(['src/*.jade', 'src/tpl/**/*'], ['jade-dev']);
		gulp.watch('src/js/*', ['js-dev']);
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

	gulp.task('release', ['resources', 'bower', 'js', 'jade', 'sprite', 'stylus']);
	gulp.task('build', ['resources', 'bower-dev', 'js-dev', 'jade-dev', 'sprite', 'stylus-dev']);
	gulp.task('default', ['watch', 'server']);
})();
