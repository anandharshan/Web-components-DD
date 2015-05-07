'use strict';

var config     = require('../config');
var changed    = require('gulp-changed');
var gulp       = require('gulp');
var gulpif     = require('gulp-if');
gulp.task('copyfonts', function() {
   gulp.src('dev/assets/fonts/**/*.{ttf,woff,eof,svg,eot}')
   .pipe(gulp.dest('build/fonts'));
});