'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var gulpif       = require('gulp-if');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');


gulp.task('styles_minify', function () {

   gulp.src(['build/css/main_part_1.css','build/css/main_part_2.css','build/css/main_part_3.css'])
   .pipe(minifyCSS({rebase:false,keepBreaks:true,keepSpecialComments:0}))
        .pipe(concat('style.css'))
   
        .pipe(gulp.dest('build/css/'));
});