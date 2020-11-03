const changed = require('gulp-changed');

module.exports = function (gulp, config, browserSync, env) {
    return function () {
        return gulp.src(config.fonts.src)
            .pipe(changed(config.fonts.build, {hasChanged: changed.compareLastModifiedTime}))
            .pipe(gulp.dest(config.fonts.build))
            .pipe(browserSync.reload({
                stream: true
            }));
    }
};