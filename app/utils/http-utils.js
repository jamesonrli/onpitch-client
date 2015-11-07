var http = require('http');

module.exports = {
  makeRequest: function(options, onEnd, onError, body) {
    var req = http.request(options, function(res) {
      var result = "";

      res.on('data', function(d) {
        result += d;
      });

      res.on('end', function() {
        var resultObj = JSON.parse(result);
        console.log(resultObj);
        onEnd(resultObj);
      });
    });

    req.on('error', function(e) {
      onError(e);
    });
    req.end(body);
  },
};
