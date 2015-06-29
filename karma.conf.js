module.exports = function (config) {
    config.set({
        files: [
            'js/**/*.test.js'
        ],
        frameworks: ['browserify', 'jasmine'],
        preprocessors: {
            'js/**/*.test.js': [ /*'coverage',*/ 'browserify']
        },
        plugins: ['karma-browserify', 'karma-jasmine', 'karma-phantomjs-launcher', 'karma-spec-reporter', 'karma-failed-reporter'],
        browsers: ['PhantomJS'],
        reporters: [ /*'coverage',*/ 'spec', 'failed'],
        browserify: {
            debug: true // output source maps
                //transform: ['browserify-istanbul']
        }
    })
};
