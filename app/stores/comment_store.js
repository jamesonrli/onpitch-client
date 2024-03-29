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
    console.log('comments update received, retrieving new comments for: ' + e.userId);
    CommentActions.getComments(e.userId);
  }, false);
}

function commentsChanged() {
  _currentComments = null;
}

var CommentActions = require('../actions/comment_actions');
var CommentStore = assign(new EventEmitter(), {

  getCurrentComments: function() {
    if(!_currentComments) {
      _currentComments = [];
      CommentActions.getComments(ProfileStore.getUserId());
    }

    return _currentComments;
  },

  emitChange: function(actionType) {
    this.emit(actionType);
  },

  subscribeEvents: function() {
    subscribeCommentChanges(ProfileStore.getUserId());
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
      case OnPitchConstants.PROFILE_CHANGE: {
        commentsChanged();
        break;
      }
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
