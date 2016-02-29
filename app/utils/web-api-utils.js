var HttpUtils = require('./http-utils');
var UtilConstants = require('./util-constants');

module.exports = {
  updateUserProfile: function(profileId, profileChanges) {
    var putOptions = {
      host: UtilConstants.INTERNAL_HOST,
      port: UtilConstants.INTERNAL_PORT,
      method: UtilConstants.PUT,
      headers: {
        'content-type': 'application/json'
      },
      path:'/userProfile/' + encodeURIComponent(profileId)
    };

    HttpUtils.makeRequest(putOptions,
      function(result) {
      },
      function(error) {
        console.log(error);
      },
      JSON.stringify(profileChanges)
    );
  },

  updateUser: function(userId, userChanges) {
    var putOptions = {
      host: UtilConstants.INTERNAL_HOST,
      port: UtilConstants.INTERNAL_PORT,
      method: UtilConstants.PUT,
      headers: {
        'content-type': 'application/json'
      },
      path:'/user/' + encodeURIComponent(userId)
    };

    HttpUtils.makeRequest(putOptions,
      function(result) {
      },
      function(error) {
        console.log(error);
      },
      JSON.stringify(userChanges)
    );
  },

  searchUsers: function(searchTerm) {
    var getOptions = {
      host: UtilConstants.INTERNAL_HOST,
      port: UtilConstants.INTERNAL_PORT,
      method: UtilConstants.GET,
      path: '/user?where=' + encodeURIComponent(searchTerm)
    };

    HttpUtils.makeRequest(getOptions,
      function(result) {
        var SearchActions = require('../actions/search_actions');
        SearchActions.userSearchResults(result);
      },
      function(error) {
        console.log(error);
      }
    );
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

  getUserProfileScore: function(scoreId) {
    var getOptions = {
      host: UtilConstants.INTERNAL_HOST,
      port: UtilConstants.INTERNAL_PORT,
      method: UtilConstants.GET,
      path: '/userProfileScore/' + encodeURIComponent(scoreId)
    };

    HttpUtils.makeRequest(getOptions,
      function(result) {
        var ProfileActions = require('../actions/profile_actions');
        ProfileActions.updateProfileScore(result);
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
  },

  getUserComments: function(userId) {
    var getOptions = {
      host: UtilConstants.INTERNAL_HOST,
      port: UtilConstants.INTERNAL_PORT,
      method: UtilConstants.GET,
      path: '/userComments/' + encodeURIComponent(userId)
    };

    HttpUtils.makeRequest(getOptions,
      function(results) {
        var CommentActions = require('../actions/comment_actions');
        CommentActions.updateComments(results);
      },
      function(error) {
        console.log(error);
      }
    );
  },

  newComment: function(authorId, profileUserId, comment) {
    var postOptions = {
      host: UtilConstants.INTERNAL_HOST,
      port: UtilConstants.INTERNAL_PORT,
      method: UtilConstants.POST,
      path: '/userComments',
      headers: {
        'content-type': 'application/json'
      }
    };

    var content = {
      authorId: authorId,
      profileUserId: profileUserId,
      comment: comment
    };

    HttpUtils.makeRequest(postOptions,
      function(results) {
        console.log('comment posted: ' + results);
      },
      function(error) {
        console.log(error);
      },
      JSON.stringify(content)
    );
  }
};
