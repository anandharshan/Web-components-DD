var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    watch = require('watchify');

gulp.task('scripts', function () {
    // gulp.src(['dev/modules/**/*Directives.js','dev/modules/**/*Controller.js'])
    //     .pipe(concat('vmfComponents.js'))
    //     .pipe(uglify())
    //     .pipe(gulp.dest('build/js'))
});



// Browserify task
gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
  gulp.src(['build/js/main.js'])
      .pipe(browserify({
        insertGlobals: true,
        debug: true
      }))
});

