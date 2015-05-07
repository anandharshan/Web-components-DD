'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('zip',function(cb){
	cb = cb || function(){
		console.log('production task complete');
	};
	global.isProd = false;
	runSequence('zipserver',cb);
});
