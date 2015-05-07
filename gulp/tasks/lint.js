var jshint = require('gulp-jshint');
var gulp   = require('gulp');
 
gulp.task('lint', function() {
  return gulp.src(['dev/modules/**/*.js','dev/assets/libs/app.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});