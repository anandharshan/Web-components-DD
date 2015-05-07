'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

gulp.task('reload', function() {
	// runSequence('styles', 'ie8styles', 'ie7styles', 'views', 'images', 'js','scripts','copyfonts', 'watch',function(){
		
	// });
console.log('reloading **************************************');
	browserSync.reload();


  

});