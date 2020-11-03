const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('autoprefixer');
const remember = require('gulp-remember');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');

module.exports = function (gulp, config, browserSync, env) {

    const browsersVersion = ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 9', 'IE 10', 'IE 11'];
    const plugins = [
        autoprefixer({browsers: browsersVersion}),
        cssnano
    ];
    console.log(env);
    return function (cb) {
        gulp.src(config.sass.src, {since: gulp.lastRun(sass)})
            .pipe(plumber({
                errorHandler: notify.onError(function (err) {
                    return {
                        title: 'sass',
                        message: err.message
                    }
                })
            }))
            .pipe(gulpif(env !== 'production', sourcemaps.init()))
            .pipe(sass(config.sass.sassConfig).on('error', sass.logError))
            .pipe(remember('sass'))
            .pipe(gulpif(env === 'production', postcss(plugins)))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulpif(env !== 'production', sourcemaps.write(config.sass.sourcemapsPath)))
            .pipe(plumber.stop())
            .pipe(gulp.dest(config.sass.build))
            .pipe(browserSync.reload({stream: true}));
        cb();
    }
};