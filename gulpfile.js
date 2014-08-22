'use strict';
var gulp = require('gulp'),
  mocha = require('gulp-mocha'),
  reporter = require('jshint-stylish'),
  jshint = require('gulp-jshint');

gulp.task('mocha', function() {
  return gulp.src('test/*.js')
    .pipe(mocha({
      reporter: 'dot'
    }));
});
gulp.task('jshint', function() {
  return gulp.src(['lib/*.js', 'index.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(reporter));
});
gulp.task('test', ['mocha','jshint']);

gulp.task('watch', function() {
  return gulp.watch(['lib/**/*.js', 'test/**/*.js'], ['test']);
});
