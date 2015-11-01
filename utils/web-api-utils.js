var ParseUtils = require('./parse-utils');

module.exports = {
  updateProfile: function(profileId, profileChanges) {
    ParseUtils.updateProfile(profileId, profileChanges, function(result) {
      var ProfileActions = require('../app/actions/profile_actions');
    });
  },

  updateUser: function(userId, userChanges) {
    ParseUtils.updateUser(userId, userChanges, function(result) {
      var ProfileActions = require('../app/actions/profile_actions');
    });
  },

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
