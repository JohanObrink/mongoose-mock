var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  mocha = require('gulp-mocha');

gulp.task('jshint', function () {
  return gulp.src(['./gulpfile.js', './index.js', './test/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('mocha', function () {
  return gulp.src(['./test/**/*.js'])
    .pipe(mocha({reporter:'spec'}));
});

gulp.task('test', ['jshint', 'mocha']);

gulp.task('watch', function () {
  gulp.watch(['./gulpfile.js', './index.js', './test/**/*.js'], ['test']);
});

gulp.task('default', ['test', 'watch']);