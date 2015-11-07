var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var envify = require('envify');
var getbrow;
var bun;

module.exports.runner = function() {
  bun(getbrow());
};

module.exports.getBrow = getbrow = function() {
  // insertGlobals takes more space in output files but with faster build times
  return browserify('./app/main.js',
    {debug: process.env.NODE_ENV=='development', insertGlobals: process.env.NODE_ENV=='development'})
    .transform(envify)
    .transform(babelify);
};

module.exports.bun = bun = function(brow) {
  brow
    .bundle()
    .pipe(source('compiled.js'))
    .pipe(gulp.dest('./public/js/'));
};
