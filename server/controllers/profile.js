var WebApiUtils = require('../utils/web-api-utils');

module.exports = {
  getUserProfile: function(req, res) {
    var userId = req.params.id;
    WebApiUtils.getUserProfile(userId,
      function(results) {
        res.set('Access-Control-Allow-Origin', '*');
        res.send(results);
      },
      function(error) {
        res.send(400);
        res.send(JSON.stringify(error));
      }
    );
  },

  getUserProjects: function(req, res) {
    var userId = req.params.id;
    WebApiUtils.getUserProjects(userId,
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
