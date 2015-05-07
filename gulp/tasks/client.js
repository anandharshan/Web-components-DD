'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('client',['clean'],function(cb){
	cb = cb || function(){
		console.log('production task complete');
	};
	global.isProd = false;
	runSequence('styles','ie8styles','ie7styles','views','templates','images','js','scripts','copyfonts','server',cb);
});
