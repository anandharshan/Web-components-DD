'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var gulpif       = require('gulp-if');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('ie8styles', function () {

  return gulp.src(config.ie8styles.src)
    .pipe(sass({
      sourceComments: global.isProd ? 'none' : 'map',
      sourceMap: 'ie8sass',
      outputStyle: global.isProd ? 'compressed' : 'nested'
    }))
    .pipe(autoprefixer("ie_8"))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.ie8styles.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));

});