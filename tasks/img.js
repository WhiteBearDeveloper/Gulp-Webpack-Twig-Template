const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');

module.exports = function (gulp, config, browserSync, env) {
    return function () {
        return gulp.src([config.img.src, config.img.exclude])
            .pipe(changed(config.img.build, {hasChanged: changed.compareLastModifiedTime}))
            .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.mozjpeg({quality: 75, progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
            ]))
            .pipe(gulp.dest(config.img.build))
            .pipe(browserSync.reload({
                stream: true
            }));
    }
};