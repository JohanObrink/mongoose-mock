var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  mocha = require('gulp-mocha'),
  eslint = require('gulp-eslint'),
  runSequence = require('run-sequence');

gulp.task('jshint', function () {
  return gulp.src(['./gulpfile.js', './index.js', './test/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('mocha', function () {
  return gulp.src(['./test/**/*.js'])
    .pipe(mocha({reporter:'spec'}));
});

gulp.task('test-es5', ['jshint', 'mocha']);

gulp.task('eslint', function () {
  return gulp.src(['./test-es6/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('babel-mocha', function () {
  require('babel-core/register');
  return gulp.src(['./test-es6/**/*.js'])
    .pipe(mocha({reporter:'spec'}));
});

gulp.task('test-es6', ['eslint', 'babel-mocha']);

gulp.task('test', function (callback) {
  runSequence('test-es5', 'test-es6', callback);
});

gulp.task('watch', function () {
  gulp.watch(['./gulpfile.js', './index.js'], ['test']);
  gulp.watch(['./test/**/*.js'], ['test-es5']);
  gulp.watch(['./test-es6/**/*.js'], ['test-es6']);
});

gulp.task('default', ['test', 'watch']);