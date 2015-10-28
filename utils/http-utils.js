var http = require('http');

module.exports = {
  makeRequest: function(options, onEnd, onError) {
    var req = http.request(options, function(res) {
      var result = "";

      res.on('data', function(d) {
        result += d;
      });

      res.on('end', function() {
        onEnd(JSON.parse(result));
      });
    });

    req.on('error', function(e) {
      onError(e);
    });
    req.end();
  }
};
