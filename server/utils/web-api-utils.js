var ParseUtils = require('./parse-utils');

module.exports = {
  updateProfile: function(profileId, profileChanges) {
  },

  updateUser: function(userId, userChanges) {
  },

  getUserProfile: function(userId, onResult, onError) {
    ParseUtils.getUserProfile(userId, onResult, onError);
  },

  getUserProjects: function(userId, onResult, onError) {
    ParseUtils.getUserProjects(userId, onResult, onError);
  },

  getUserComments: function(userId, onResult, onError) {
    ParseUtils.getUserComments(userId, onResult, onError);
  },

  newComment: function(params, onResult, onError) {
    ParseUtils.newComment(params, onResult, onError);
  }
};
