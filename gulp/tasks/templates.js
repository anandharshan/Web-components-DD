'use strict';

var config         = require('../config');
var gulp           = require('gulp');
var templateCache  = require('gulp-angular-templatecache');

// Views task
gulp.task('templates', function() {

  // Put our index.html in the dist folder
  gulp.src('dev/templates/*.html')
    .pipe(gulp.dest('build/templates'));

 
  

});