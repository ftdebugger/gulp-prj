var staticPath = 'dist/assets',
	jsPath = staticPath + '/js',
	cssPath = staticPath + '/css',
	fontPath = staticPath + '/fonts',
	imagesPath = staticPath + '/images'

module.exports = {
	
	// preprocessors
	proc: {
		html: {
			name: 'html', // 'html' or 'jade'
			format: '.html'
		},
		css: {
			name: 'stylus', // 'less' or 'stylus'
			format: '.styl'
		}
	},

	images: {
		src: 'src/images/**/*',
		dest: imagesPath
	},

	sprite: {
		src: 'src/images/png-ico/*.png',
		name: 'png-ico',
		tpl: 'png-ico.mustache',
		dest: imagesPath
	},

	bower: {
		target: 'vendor.js',
		dest: jsPath
	},

	less: {
		src: 'src/less/style.less',
		prefix: 'last 2 version',
		dest: cssPath
	},

	stylus: {
		src: 'src/stylus/style.styl',
		prefix: 'last 2 version',
		dest: cssPath
	},

	html: {
		src: 'src/html/*.html',
		dest: 'dist'
	},

	jade: {
		src: 'src/jade/*.jade',
		dest: 'dist'
	},

	js: {
		src: 'src/js/index.js',
		target: 'scripts.js',
		dest: jsPath
	}
};
