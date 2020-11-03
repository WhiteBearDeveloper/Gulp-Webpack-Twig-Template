const gulp = require('gulp');
const browserSync = require('browser-sync').create();

// окружение сборки
const isDev = process.env.NODE_ENV === 'development';

// конфигурация
const config = isDev ? require('./config') : require('./config');

function requireTask(taskName) {
    gulp.task(taskName, function (cb) {
        const task = require('./tasks/' + taskName).call(this, gulp, config, browserSync, process.env.NODE_ENV);
        return task(cb);
    });
}

requireTask('svg');
requireTask('twig');
requireTask('sass');
requireTask('script');
requireTask('img');
requireTask('fonts');
requireTask('clean');

gulp.task('serve', function () {
    if (config.browser && !config.browser.disable) {
        browserSync.init(config.browser);
    }
});

gulp.task('build', gulp.series(
    'svg',
    gulp.parallel(
        'twig',
        'sass',
        'script',
        'img',
        'fonts',
    )
));

gulp.task('watch', function () {
    gulp.watch([config.twig.watch], gulp.series('twig'));
    gulp.watch([config.sass.watch], gulp.series('sass'));
    gulp.watch([config.script.watch], gulp.series('script'));
    gulp.watch([config.fonts.watch], gulp.series('fonts'));
    gulp.watch([config.img.watch, config.img.exclude], gulp.series('img'));
    gulp.watch([config.svg.watch], gulp.series('svg'));
});


gulp.task('build', gulp.series('clean', 'build'));
gulp.task('default', gulp.series('build', gulp.parallel('watch', 'serve')));