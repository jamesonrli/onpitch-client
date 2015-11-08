var Redis = require('redis');

var _publisher = null;

module.exports = {
  getPublisher: function() {
    if(_publisher) {
      return _publisher;
    }

    _publisher = Redis.createClient(process.env.REDIS_URL);
    return _publisher;
  }
};
