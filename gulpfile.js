/* global require */
var gulp = require('gulp');
var browserify = require('browserify');
var sync = require('browser-sync');
var source = require('vinyl-source-stream');
//var uglify      = require('gulp-uglify');
//var plumber     = require('gulp-plumber');
//var streamify   = require('gulp-streamify');
var watchify = require('watchify');
var assign = require('lodash.assign');

gulp.task('sync', ['scripts'], function() {
    //serving from basdirectory, not running server from built files.
    //will include script injection into index.html at some stage to allow this.
    sync.init(null, {
        open: false,
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('scripts', function() {
    //set options for browserify
    var options = assign({}, watchify.args, {
        //specifying main modules, dependencies will be loaded recursively
        entries: ['./js/engine.js'], 
        debug: true
    });

    //initialize rebundling on change
    var bundler = watchify(browserify(options));
    //bundler.on('update', rebundle);

    function rebundle() {
        return bundler.bundle()
            .pipe(source('bundle.js'))
            //.pipe(streamify(uglify()))
            .pipe(gulp.dest('./dist'))
            .pipe(sync.reload({
                stream: true,
                once: true
            }));
    }

    return rebundle();
});

gulp.task('default', ['sync'], function() {
    gulp.watch("./js/**/*.js", ['scripts']);
});
