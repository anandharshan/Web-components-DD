'use strict';

var config        = require('../config');
var gulp          = require('gulp');
var watch         = require('watchify');
var browserSync   = require('browser-sync');

gulp.task('watch', ['browserSync', 'server'], function() {
  gulp.watch(config.scripts.src, ['scripts','lint','reload']);
	
  gulp.watch(config.scripts.src, ['js','lint', browserSync.reload]);
	// gulp.watch('dev/**/*.scss',['styles','reload']);
  gulp.watch('dev/**/*.scss',['styles','ie8styles','ie7styles','reload']);
  // gulp.watch(config.styles.src,  ['styles', 'reload']);
  // gulp.watch(config.ie8styles.src,['ie8styles', 'reload']);
  // gulp.watch(config.ie7styles.src,['ie7styles', 'reload']);
  gulp.watch(config.images.src,  ['images', 'reload']);
  
  gulp.watch(['dev/modules/**/*.html','dev/*.html'],['views','reload']);
});