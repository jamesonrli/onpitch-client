var notifier = require('node-notifier');
var Watch = require('./watch');

module.exports.runner = function() {
  var watchedbun = Watch.runner();

  watchedbun.on('time', function(time) {
    notifier.notify({
      'title': 'rebuild complete',
      'message': 'completed in: ' + time + 'ms'
    });
  });
};
