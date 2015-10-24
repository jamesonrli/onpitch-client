var watchify = require('watchify');
var browserify = require('./browserify');

module.exports.runner = function() {
  var watchedbun = watchify(browserify.getBrow());

  watchedbun.on('update', function() {
    browserify.bun(watchedbun);
    console.log('-> rebuild complete...');
  });

  browserify.bun(watchedbun);
}
