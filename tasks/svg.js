const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const changed = require('gulp-changed');
const svgSprite = require('gulp-svg-sprite');

const path = require('path');
const PATH_VARIABLES = require('../path.variables');

module.exports = function (gulp, config, browserSync, env) {
    return function () {
        return gulp.src(config.svg.src)
            .pipe(changed(config.svg.build, {hasChanged: changed.compareLastModifiedTime}))
            .pipe(plumber({
                errorHandler: notify.onError(function (err) {
                    return {
                        title: 'svg',
                        message: err.message
                    }
                })
            }))
            .pipe(svgSprite({
                mode: {
                    symbol: {
                        sprite: '../svg/sprite.svg', //sprite file name
                    },
                    css: {
                        render: {
                            scss: {
                                dest: '../../../../src/scss/svg/_sprite.scss',
                                template: `${PATH_VARIABLES.sass}/svg/_sprite_template.scss`
                            }
                        }
                    }
                },
            }))
            .pipe(gulp.dest(config.svg.build))
            .pipe(browserSync.reload({
                stream: true
            }));
    }
};