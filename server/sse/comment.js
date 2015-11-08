var Redis = require('redis');

var publisher = require('./publisher');
var ServerConstants = require('../common/constants');

module.exports = {
  triggerCommentUpdate: function(req, res) {
    var obj = req.body.object;
    console.log(ServerConstants.COMMENT_UPDATE_EVENT + '-' + obj.userId.objectId);

    publisher.getPublisher().publish(
      ServerConstants.COMMENT_UPDATE_EVENT + '-' + obj.userId.objectId,
      JSON.stringify(obj)
    ); // test this

    res.end();
  },

  commentUpdate: function(req, res) {
    req.socket.setTimeout(Number.MAX_VALUE);

    var subscriptionKey = ServerConstants.COMMENT_UPDATE_EVENT + '-' + req.params.id;
    var subscriber = Redis.createClient(process.env.REDIS_URL);
    subscriber.subscribe(subscriptionKey);

    subscriber.on('error', function(error) {
      console.log('Redis error: ' + error);
    });

    subscriber.on('message', function(channel, message) {
      var result = 'data: ' + JSON.parse(message).userId.objectId + '\n\n';
      console.log(result);
      res.write(result);
    });

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    // on browser window close
    req.on('close', function() {
      console.log('closing subscription');
      subscriber.unsubscribe();
      subscriber.quit();
    });

    console.log('subscribing to redis: ' +  subscriptionKey);
  }
};
