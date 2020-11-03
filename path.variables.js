const path = require('path'); // зависимость для работы с путями

const PATH_VARIABLES = {
    src:  path.relative(__dirname, path.join(__dirname, './src')),
    js:   'src/js',
    sass: 'src/scss',
    twig: 'src/twig',
    img:  'src/img',
    font: 'src/fonts',
    dist: path.join(__dirname, 'build'),
    assets: 'assets/'
};

module.exports = PATH_VARIABLES;