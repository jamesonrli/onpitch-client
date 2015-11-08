var WebApiUtils = require('../utils/web-api-utils');

module.exports = {
  getUserComments: function(req, res) {
    var userId = req.params.id;
    WebApiUtils.getUserComments(userId,
      function(results) {
        res.set('Access-Control-Allow-Origin', '*');
        res.send(results);
      },
      function(error) {
        res.send(400);
        res.send(JSON.stringify(error));
      }
    );
  }
};
