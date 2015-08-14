var gutil = require('gulp-util'),
    webpack = require('webpack'),
    config = require('./config'),
    path = require('path');

module.exports = function (debug) {
    return {
        entry: {
            main: config.js.src
        },

        profile: true,

        watch: debug,
        cache: debug,
        debug: debug,

        output: {
            filename: '[name].bundle.js',
            chunkFilename: '[id].bundle.js',
            path: config.js.dest,
            publicPath: config.baseUrl + '/js/'
        },

        externals: {},

        resolve: {
            extensions: ['', '.js', '.hbs'],
            root: [
                path.join(__dirname, 'node_modules'),
                path.join(__dirname, 'vendor'),
                path.join(__dirname, 'src')
            ],
            'alias': {}
        },

        module: {
            loaders: [
                {
                    test: /\.(svg|png|jpg|gif)$/,
                    loader: 'file'
                },
                {
                    test: /\.hbs/,
                    loader: 'injectify'
                },
                {
                    test: /\.json$/,
                    loader: 'json'
                }
            ]
        },

        plugins: (function () {
            var plugins = [
                new webpack.DefinePlugin({
                    APP_VERSION: JSON.stringify(config.version),
                    IS_DEVELOP: debug,
                    BASE_URL: JSON.stringify(config.baseUrl),
                    'typeof window': JSON.stringify('object')
                }),

                new webpack.ResolverPlugin(
                    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(path.join(__dirname, '../bower.json'), ['main'])
                )
            ];

            //plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'));

            if (!debug) {
                plugins = plugins.concat([
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        }
                    }),
                    new webpack.optimize.AggressiveMergingPlugin()
                ]);
            } else {
                //plugins = plugins.concat([
                //    new webpack.SourceMapDevToolPlugin({
                //        exclude: ['vendor.bundle.js'],
                //        inline: true,
                //        columns: false,
                //        module: true
                //    })
                //]);
            }

            return plugins;
        })(),

        stats: {
            colors: gutil.colors.supportsColor,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false,
            modules: false,
            children: true,
            version: true,
            cached: false,
            cachedAssets: false,
            reasons: false,
            source: false,
            errorDetails: false
        }
    };
};
