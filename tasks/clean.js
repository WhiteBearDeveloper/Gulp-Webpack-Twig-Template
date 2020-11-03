const del = require('del');

module.exports = function (gulp, config, browserSync) {
    return function () {
        return del([
            'build/*'
        ])
    }
};