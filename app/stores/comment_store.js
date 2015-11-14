var OnPitchConstants = require('../common/constants');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ProfileStore = require('./profile_store'); // provides information about the logged in user

var _currentComments = null;

function setCurrentComments(comments) {
  _currentComments = comments;
}

function subscribeCommentChanges(userId) {
  var socket = io();

  socket.emit('join', {event: 'comment-update-' + userId});
  socket.on('comment-update', function(e) {
    console.log('comments update received, retrieving new comments');
    CommentActions.getComments(e.userId);
  }, false);
}

var CommentActions = require('../actions/comment_actions');
var CommentStore = assign(new EventEmitter(), {

  getCurrentComments: function() {
    if(!_currentComments) {
      _currentComments = [];
      CommentActions.getComments('f9D8M07W6b');
    }

    return _currentComments;
  },

  emitChange: function(actionType) {
    this.emit(actionType);
  },

  subscribeEvents: function() {
    subscribeCommentChanges('f9D8M07W6b');
  },

  addChangeListener: function(actionType, callback) {
    this.on(actionType, callback);
  },

  removeChangeListener: function(actionType, callback) {
    this.removeListener(actionType, callback);
  },

  dispatchIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
      case OnPitchConstants.COMMENTS_CHANGE: {
        setCurrentComments(action.commentsData);
        CommentStore.emitChange(action.actionType);
        break;
      }
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })
});

module.exports = CommentStore;
