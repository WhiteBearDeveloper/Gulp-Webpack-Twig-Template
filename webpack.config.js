const webpack = require('webpack');
const path = require('path');
const PATH_VARIABLES = require('./path.variables');

const config = {
    mode: process.env.NODE_ENV,
    entry: {
        // точка входа
        app: ["@babel/polyfill", path.resolve(PATH_VARIABLES.js, "index.js")]
    },
    output: {
        filename: `[name].js`,
        path: PATH_VARIABLES.dist, // '__dirname' переменная ноды. Строится абсолютный путь до папки
    },
    devtool: process.env.NODE_ENV === 'development' ? 'cheap-module-eval-source-map' : false,
    // context: path.resolve(__dirname, "app"),
    optimization: { // зависимости node_modules будут вынесены в отдельный скрипт => при изменении основных скриптов нет необходимости скачивать зависимости заново
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    enforce: true
                }
            }
        }
    },
    resolve: {
        alias: {
            vue$: "vue/dist/vue.esm.js"
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        // plugins: ['@babel/plugin-proposal-class-properties']
                    },
                }
            }
        ]
    },
    plugins: [
        // new VueLoaderPlugin(),
        // new webpack.SourceMapDevToolPlugin({
        //     filename: 'sourcemaps/[file].map',
        // })
    ]
};

module.exports = config;