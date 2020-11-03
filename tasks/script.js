const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('../webpack.config');

module.exports = function (gulp, config, browserSync, env) {
    return function () {
        return gulp.src(config.script.src)
            .pipe(plumber({
                errorHandler: notify.onError(function (err) {
                    return {
                        title: 'script',
                        message: err.message
                    }
                })
            }))
            .pipe(webpackStream(webpackConfig), webpack)
            .pipe(plumber.stop())
            .pipe(gulp.dest(config.script.build))
            .pipe(browserSync.reload({
                stream: true
            }));
    }
};