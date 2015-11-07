var HttpUtils = require('./http-utils');
var UtilConstants = require('./util-constants');

module.exports = {
  updateProfile: function(profileId, profileChanges) {
  },

  updateUser: function(userId, userChanges) {
  },

  getUserProfile: function(userId) {
    var getOptions = {
      host: UtilConstants.INTERNAL_HOST,
      port: UtilConstants.INTERNAL_PORT,
      method: UtilConstants.GET,
      path: '/userProfile/' + encodeURIComponent(userId)
    };

    HttpUtils.makeRequest(getOptions,
      function(result) {
        var ProfileActions = require('../actions/profile_actions');
        ProfileActions.updateProfile(result);
      },
      function(error) {
        console.log(error);
      }
    );
  },

  getUserProjects: function(userId) {
    var getOptions = {
      host: UtilConstants.INTERNAL_HOST,
      port: UtilConstants.INTERNAL_PORT,
      method: UtilConstants.GET,
      path: '/userProjects/' + encodeURIComponent(userId)
    };

    HttpUtils.makeRequest(getOptions,
      function(results) {
        var ProfileActions = require('../actions/profile_actions');
        ProfileActions.updateProjects(results);
      },
      function(error) {
        console.log(error);
      }
    );
  }
};
