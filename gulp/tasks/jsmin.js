var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    watch = require('watchify');

gulp.task('js', function () {
  var stream = gulp.src([
    'dev/assets/libs/modernizer.js',
    'dev/assets/libs/polyfill.js',
    'dev/assets/libs/respond.js',
    'dev/assets/libs/json2.js',
    'dev/assets/libs/polyfill.js',
    'dev/assets/libs/jquery-1.9.1.js',
    'dev/assets/libs/jquery-ui.js',
     
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
    'dev/assets/libs/colResizable.js',
    'dev/assets/libs/split-container.js',

    'dev/assets/libs/resizablecolumns.js',
    'dev/assets/libs/jquery.multisortable.js',
    'dev/assets/libs/jquery.datepicker.js',
    'dev/assets/libs/jquery.dragtable.js',
    'dev/assets/libs/angular-touch.js',  
    'dev/assets/libs/app.js', 
    'dev/assets/libs/modalService.js',
    'dev/assets/libs/modalService.js',
    'dev/modules/**/*Directives.js',
    'dev/modules/**/*Controller.js']
    )
    .pipe(concat('vmfLibComponents.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('build/js'));

   return stream; 
});
