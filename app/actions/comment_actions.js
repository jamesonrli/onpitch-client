var AppDispatcher = require('../dispatcher/app_dispatcher');
var OnPitchConstants = require('../common/constants');
var WebApiUtils = require('../utils/web-api-utils');

var CommentData = require('../data/comment').CommentData;

var CommentActions = {

  getComments: function(userId) {
    WebApiUtils.getUserComments(userId);
  },

  newComment: function(authorUserId, profileUserId, comment) {
    WebApiUtils.newComment(authorUserId, profileUserId, comment);
  },

  updateComments: function(commentsData) {
    AppDispatcher.handleDataAction({
      actionType: OnPitchConstants.COMMENTS_CHANGE,
      commentsData: (() => {
        var processedList = [];
        commentsData.forEach(function(comm) {
          processedList.push(new CommentData(comm.authorId.objectId, comm.authorId.username, new Date(comm.createdAt), comm.body));
        });

        return processedList;
      })()
    });
  },
};

module.exports = CommentActions;
