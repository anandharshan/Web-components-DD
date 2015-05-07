'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var gulpif       = require('gulp-if');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat')

gulp.task('js', function () {
  var stream = gulp.src([
    'dev/assets/libs/modernizr.js',
    'dev/assets/libs/polyfill.js',
    'dev/assets/libs/respond.js',
    'dev/assets/libs/json2.js',
    'dev/assets/libs/polyfill.js',
    'dev/assets/libs/jquery-1.9.1.js',
    'dev/assets/libs/jquery.mousewheel.js',
    'dev/assets/libs/jquery.jscrollpane.js',
    'dev/assets/libs/bootstrap.min.js',
    'dev/assets/libs/angular.min.js',
    'dev/assets/libs/ui-bootstrap-tpls-0.12.0.js',
    'dev/assets/libs/angular-ui-router.js',
    'dev/assets/libs/angular-sanitize.js',
    'dev/assets/libs/angular-mocks.js',
    'dev/assets/libs/placeholders.js',
    'dev/assets/libs/tipped.js',
    'dev/assets/libs/angular-touch.js',
    'dev/assets/libs/app.js','dev/modules/**/*Directives.js','dev/modules/**/*Controller.js']
    )
    .pipe(concat('vmfLibComponents.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('build/js')).pipe(browserSync.reload({stream:true}));

   return stream; 
});