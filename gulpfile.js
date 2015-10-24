var gulp = require('./gulp')([
  'browserify',
  'watch'
]);

gulp.task('build', ['browserify']);
gulp.task('build-watch', ['watch']);
