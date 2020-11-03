const plumber = require('gulp-plumber');
const twig = require('gulp-twig');
const notify = require('gulp-notify');
const changed = require('gulp-changed');

module.exports = function (gulp, config, browserSync, env) {
    return function () {
        return gulp.src(config.twig.src)
            .pipe(plumber({
                errorHandler: notify.onError(function (err) {
                    return {
                        title: 'twig',
                        message: err.message
                    }
                })
            }))
            .pipe(changed(config.twig.build, {hasChanged: changed.compareLastModifiedTime}))
            .pipe(twig())
            .pipe(plumber.stop())
            .pipe(gulp.dest(config.twig.build))
            .pipe(browserSync.reload({
                stream: true
            }));
    }
};