var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var getbrow;
var bun;

module.exports.runner = function() {
  bun(getbrow());
}

module.exports.getBrow = getbrow = function() {
  return browserify('./main.js', {debug: process.env.NODE_ENV=='development'}).transform(babelify);
}

module.exports.bun = bun = function(brow) {
  brow
    .bundle()
    .pipe(source('compiled.js'))
    .pipe(gulp.dest('./public/js/'));
}
