var WebApiUtils = require('../utils/web-api-utils');

module.exports = {
  newUserProfile: function(req, res) {
    var obj = req.body.object;
    WebApiUtils.newUserProfile(obj.objectId,
      function(result) {
        console.log(result);
      },
      function(err) {
        console.log(err);
      }
    );
  }
};
