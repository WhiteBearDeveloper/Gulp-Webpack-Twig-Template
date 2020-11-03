const path = require('path');
const PATH_VARIABLES = require('./path.variables');

module.exports = {
    build: PATH_VARIABLES.dist,
    sass: {
        src: `${PATH_VARIABLES.sass}/*.scss`,
        watch: `${PATH_VARIABLES.sass}/**/*.scss`,
        build: `${PATH_VARIABLES.dist}/assets/css/`,
        includePaths: ['node_modules'],
        sourcemapsPath: '.',
        sassConfig: {
            precision: 10,
            errLogToConsole: true
        }
    },
    twig: {
        src: `${PATH_VARIABLES.twig}/page/**/*.twig`,
        watch: `${PATH_VARIABLES.twig}/**/*.twig`,
        build: PATH_VARIABLES.dist
    },
    script: {
        compress: false,
        src: `${PATH_VARIABLES.js}/*.js`,
        watch: `${PATH_VARIABLES.js}/**/*.js`,
        build: `${PATH_VARIABLES.dist}/assets/js/`,
        // sourcemapsPath: '.',
    },
    fonts: {
        src: `${PATH_VARIABLES.font}/**/*.{ttf,woff,woff2,svg,eot}`,
        watch: `${PATH_VARIABLES.font}/**/*.{ttf,woff,woff2,svg,eot}`,
        build: `${PATH_VARIABLES.dist}/assets/fonts`
    },
    img: {
        src: `${PATH_VARIABLES.img}/**/*.{jpg,png,gif}`,
        watch: `${PATH_VARIABLES.img}/**/*.{jpg,png,gif}`,
        exclude: `!${PATH_VARIABLES.img}/svg/**/*.svg`,
        build: `${PATH_VARIABLES.dist}/assets/img/`
    },
    svg: {
        src: `${PATH_VARIABLES.img}/svg/**/*.svg`,
        watch: `${PATH_VARIABLES.img}/svg/**/*.svg`,
        build: `${PATH_VARIABLES.dist}/assets/img/`
    },
    browser: {
        disable: false,
        server: {
            baseDir: PATH_VARIABLES.dist
        },
        host: 'localhost',
        port: 8006,
        logPrefix: "webpack-gulp-template"
    }
};