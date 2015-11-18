var ParseUtils = require('./parse-utils');

module.exports = {
  updateUserProfile: function(profileId, profileChanges, onResult, onError) {
    ParseUtils.updateUserProfile(profileId, profileChanges, onResult, onError);
  },

  updateUser: function(userId, userChanges, onResult, onError) {
    ParseUtils.updateUser(userId, userChanges, onResult, onError);
  },

  getUserProfile: function(userId, onResult, onError) {
    ParseUtils.getUserProfile(userId, onResult, onError);
  },

  newUserProfile: function(userId, onResult, onError) {
    ParseUtils.newUserProfile(userId, onResult, onError);
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
