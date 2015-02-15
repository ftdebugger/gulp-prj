(function () {
	var gulp = require('gulp'),
		base64 = require('gulp-base64'),
		bower = require('main-bower-files'),
		browserSync = require('browser-sync'),
		clean = require('gulp-rimraf'),
		concat = require('gulp-concat'),
		jade = require('gulp-jade'),
		sprite = require('gulp.spritesmith'),
		stylus = require('gulp-stylus'),
		nib = require('nib'),
		plumber = require('gulp-plumber'),
		prefix = require('gulp-autoprefixer'),
		reload = browserSync.reload;

	var staticPath = 'dist/assets';
	var jsPath = staticPath + '/js';
	var cssPath = staticPath + '/css';
	var fontPath = staticPath + '/fonts';
	var imagesPath = staticPath + '/images';

	// resources
	gulp.task('resources', ['images', 'data'], function () {
		gulp.src('src/fonts/**/*').pipe(gulp.dest(fontPath));
	});

	gulp.task('images', function () {
		gulp.src('src/images/**/*').pipe(gulp.dest(imagesPath));
	});

	gulp.task('data', function () {
		gulp.src('src/*.json').pipe(gulp.dest('dist'));
	});

	// bower
	gulp.task('bower', function() {
		return gulp.src(bower())
			.pipe(concat('vendor.js'))
			.pipe(gulp.dest(jsPath));
	});

	// jade
	gulp.task('jade', function() {
		gulp.src('src/*.jade')
			.pipe(plumber())
			.pipe(jade({
				locals: {},
				pretty: true
			}))
			.pipe(gulp.dest('dist'))
			.pipe(reload({stream:true}));
	});
	
	// js
	gulp.task('js', function () {
		gulp.src('src/js/index.js')
			.pipe(plumber())
			.pipe(concat('scripts.js'))
			.pipe(gulp.dest(jsPath))
			.pipe(browserSync.reload({ stream:true, once: true }));
	});

	// sprite
	gulp.task('sprite', function () {
		var spriteData = gulp.src('src/images/png-ico/*.png').pipe(sprite({
			imgName: 'png-ico.png',
			cssName: '_png-ico.styl',
			cssFormat: 'stylus',
			algorithm: 'binary-tree',
			cssTemplate: 'src/stylus/tpl/png-ico.mustache',
			cssVarMap: function (sprite) {
				sprite.name = 'png-' + sprite.name;
				sprite.image = '../images/' + sprite.image;
			}
		}));
		spriteData.img
			.pipe(gulp.dest(imagesPath));
		spriteData.css
			.pipe(gulp.dest('src/stylus/utils/'));
	});

	// stylus
	gulp.task('stylus', function () {
		gulp.src('src/stylus/style.styl')
			.pipe(stylus({ use: [nib()] }))
			.pipe(plumber())
			.pipe(base64({
				extensions: ['svg'],
				maxImageSize: 8*1024,
				debug: true
			}))
			.pipe(prefix('last 2 version'))
			.pipe(gulp.dest(cssPath))
			.pipe(reload({stream:true}));
	});

	// clean
	gulp.task('clean', function () {
		return gulp.src('dist/', { read: false })
			.pipe(clean({ force: true }));
	});

	// watch
	gulp.task('watch', ['build'], function () {
		gulp.watch(['bower.json', 'package.json'], ['bower']);
		gulp.watch(['src/*.jade', 'src/tpl/**/*'], ['jade']);
		gulp.watch('src/js/*', ['js']);
		gulp.watch('src/stylus/**/*.styl', ['stylus']);
		gulp.watch('src/images/**/*', ['images', 'sprite']);
		gulp.watch('src/*.json', ['data']);
	});

	// server
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
	
	gulp.task('build', ['resources', 'bower', 'js', 'jade', 'sprite', 'stylus']);
	gulp.task('default', ['watch', 'server']);
})();
