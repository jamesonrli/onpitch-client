var gulp = require('./gulp')([
  'browserify',
  'watch',
  'notify'
]);

gulp.task('build', ['browserify']);
gulp.task('build-watch', ['watch']);
gulp.task('build-watch-notify', ['notify']);
