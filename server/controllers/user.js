var WebApiUtils = require('../utils/web-api-utils');

module.exports = {
  newUserProfile: function(req, res) {
    var obj = req.body.object;
    WebApiUtils.newUserProfile(obj.objectId,
      function(result) {
        res.send({'success': true});
        res.end();
        console.log(result);
      },
      function(err) {
        res.send({'success': false});
        res.end();
        console.log(err);
      }
    );
  },

  updateUser: function(req, res) {
    var userId = req.params.id;
    var obj = req.body;

    WebApiUtils.updateUser(userId, obj,
      function(result) {
      },
      function(error) {
        console.log(error);
      }
    );
  },

  queryUsers: function(req, res) {
    var searchTerm = req.query.where;

    WebApiUtils.searchUsers(searchTerm,
      function(result) {
        res.send(result.results);
      },
      function(error) {
        res.send(400);
        res.send(error);
      }
    );
  }

};
