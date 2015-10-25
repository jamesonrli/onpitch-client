var watchify = require('watchify');
var notifier = require('node-notifier');
var browserify = require('./browserify');

module.exports.runner = function() {
  var watchedbun = watchify(browserify.getBrow());

  watchedbun.on('update', function() {
    browserify.bun(watchedbun);
    console.log('\n-> rebuild started...');
  });

  watchedbun.on('time', function(time) {
    console.log('  --> rebuild completed in ' + time + 'ms...');
  });

  browserify.bun(watchedbun);

  return watchedbun;
};
