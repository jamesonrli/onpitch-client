var ParseUtils = require('./parse-utils');

module.exports = {
  getUserProfile: function(userId) {
    ParseUtils.getUserProfile(userId, function(result) {
      var ProfileActions = require('../app/actions/profile_actions');
      ProfileActions.updateProfile(result);
    });
  },

  getUserProjects: function(userId) {
    ParseUtils.getUserProjects(userId, function(results) {
      var ProfileActions = require('../app/actions/profile_actions');
      ProfileActions.updateProjects(results);
    });
  }
};
