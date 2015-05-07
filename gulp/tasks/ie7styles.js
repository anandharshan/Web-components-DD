'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var gulpif       = require('gulp-if');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('ie7styles', function () {

  return gulp.src(config.ie7styles.src)
    .pipe(sass({
      sourceComments: global.isProd ? 'none' : 'map',
      sourceMap: 'ie7sass',
      outputStyle: global.isProd ? 'compressed' : 'nested'
    }))
    .pipe(autoprefixer("ie_7"))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.ie7styles.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));

});