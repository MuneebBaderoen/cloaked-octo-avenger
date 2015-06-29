var instanbul = require('browserify-istanbul');

module.exports = function (config) {
    config.set({
        files: [
            // 'js/**/*.test.js',
            'js/**/*.js'
        ],
        frameworks: ['browserify', 'jasmine'],
        preprocessors: {
            'js/**/*.js': ['browserify']
        },
        plugins: ['karma-browserify', 'karma-jasmine', 'karma-coverage', 'karma-phantomjs-launcher', 'karma-spec-reporter', 'karma-failed-reporter'],
        browsers: ['PhantomJS'],
        reporters: ['coverage', 'spec', 'failed'],
        browserify: {
            debug: true, // output source maps
            transform: [instanbul({
                ignore: ['**/node_modules/**', '**/*.test.js', '**/libs/**/*'],
            })]
        }
    })
};
