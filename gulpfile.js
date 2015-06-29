/* global require */
var gulp = require('gulp');
var browserify = require('browserify');
var sync = require('browser-sync');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
//var plumber     = require('gulp-plumber');
//var streamify   = require('gulp-streamify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var processhtml = require('gulp-processhtml');
var watchify = require('watchify');
var assign = require('lodash.assign');
var jasmine = require('gulp-jasmine');
var karma = require('karma-as-promised');


gulp.task('test', function () {
    return karma.server.start({
            configFile: __dirname + '/karma.conf.js'
                // singleRun: true
        })
        .then(function () {
            console.log('successful run! WOOOOOOOOOOO')
        })
        .catch(function () {
            console.log('errororororororors fo dayyyyzzzzz');
        });
});

gulp.task('sync', ['scripts'], function () {
    //serving from basdirectory, not running server from built files.
    //will include script injection into index.html at some stage to allow this.
    sync.init(null, {
        open: false,
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('scripts', function () {
    //set options for browserify
    var options = assign({}, watchify.args, {
        //specifying main modules, dependencies will be loaded recursively
        entries: ['./demo/demo.js'],
        debug: true
    });

    //initialize rebundling on change
    var bundler = watchify(browserify(options));
    //bundler.on('update', rebundle);

    function rebundle() {
        return bundler.bundle()
            .on('error', function () {
                gutil.log(arguments);
                this.emit('end');
            })
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({
                loadMaps: true
            }))
            // Add transformation tasks to the pipeline here.
            //.pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist'))
            .pipe(sync.reload({
                stream: true,
                once: true
            }));
    }

    return rebundle();
});

gulp.task('html', function () {
    return gulp.src('./index.html')
        .pipe(processhtml({}))
        .pipe(gulp.dest('./dist'))
        .pipe(sync.reload({
            stream: true,
            once: true
        }));
});

gulp.task('default', ['html', 'sync'], function () {
    //manually copy three.js lib since its not being bundled
    gulp.src('./libs/three.min.js')
        .pipe(gulp.dest('./dist/libs'));

    gulp.src('./demo/images/**')
        .pipe(gulp.dest('./dist/images'))

    //watch our js folder for changes
    gulp.watch("./js/**/*.js", ['scripts', 'test']);
    gulp.watch("./**/*.html", ['html']);

    gulp.watch("./demo/**/*.js", ['scripts', 'test']);

});
