var Redis = require('redis');

var publisher = require('./publisher');
var ServerConstants = require('../common/constants');

module.exports = {
  triggerCommentUpdate: function(req) {
    console.log(req.body);
    var obj = req.body.object;

    publisher.getPublisher().publish(
      ServerConstants.COMMENT_UPDATE_EVENT + '-' + obj.userId.objectId,
      JSON.stringify(obj.object)); // test this
  },

  commentUpdate: function(req, res) {
    req.socket.setTimeout(Number.MAX_VALUE);

    var subscriber = Redis.createClient(process.env.REDIS_URL);
    subscriber.subscribe(ServerConstants.COMMENT_UPDATE_EVENT + '-' + req.params.id);

    subscriber.on('error', function(error) {
      console.log('Redis error: ' + error);
    });

    subscriber.on('message', function(channel, message) {
      res.write(JSON.stringify({
        channel: channel,
        message: message
      }));
    });

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    // on browser window close
    req.on('close', function() {
      subscriber.unsubscribe();
      subscriber.quit();
    });
  }
};
