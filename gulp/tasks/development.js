'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('dev', ['clean'], function(cb) {

  cb = cb || function() {
  	console.log('development task complete');
  };

  global.isProd = false;

  runSequence('styles', 'ie8styles', 'ie7styles', 'views','templates', 'images', 'js','scripts', 'browserify','copyfonts','lint','styles_minify', 'watch', cb);

});