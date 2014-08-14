'use strict';
var gulp = require('gulp'),
  mocha = require('gulp-mocha'),
  jshint = require('gulp-jshint');

gulp.task('test', function() {
  return gulp.src('test/*.js')
    .pipe(mocha({
      reporter: 'dot'
    }));
});
gulp.task('jshint', function() {
  return gulp.src(['lib/*.js', 'index.js'])
    .pipe(jshint());
});
gulp.task('validate', ['test','jshint']);

gulp.task('watch', function() {
  return gulp.watch(['index.js', 'test/**/*.js'], ['test']);
});
