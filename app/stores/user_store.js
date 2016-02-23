var OnPitchConstants = require('../common/constants');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _currentUser = {};
var _isSignedIn = false;

function setCurrentUser(data) {
  _currentUser = data;
  _isSignedIn = data ? true : false;
}

var UserStore = assign(new EventEmitter(), {

  getCurrentUser: function() {
    return _currentUser;
  },

  getCurrentUserId: function() {
    return Parse.User.current().id;
  },

  isSignedIn: function() {
    return _isSignedIn;
  },

  emitChange: function(actionType) {
    this.emit(actionType);
  },

  addChangeListener: function(actionType, callback) {
    this.on(actionType, callback);
  },

  removeChangeListener: function(actionType, callback) {
    this.removeListener(actionType, callback);
  },

  dispatchIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var data = action.data;

    switch(action.actionType) {
      case OnPitchConstants.SIGN_IN: {
        setCurrentUser(data);
        UserStore.emitChange(OnPitchConstants.SIGN_IN);
      }
    }

    return true;
  })
});

module.exports = UserStore;
