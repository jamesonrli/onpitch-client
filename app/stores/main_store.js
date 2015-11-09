var OnPitchConstants = require('../common/constants');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = OnPitchConstants.PAGE_CHANGE;

var _currentPage = OnPitchConstants.PAGE_LANDING; // init page is landing
var _currentUser = null;

function setCurrentPage(page) {
  _currentPage = page;
}

function setCurrentUser(user) {
	_currentUser = user;
}

var MainStore = assign(new EventEmitter(), {

  getCurrentPage: function() {
    return _currentPage;
  },

  getCurrentUser: function() {
	 return _currentUser; 
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
      case OnPitchConstants.PAGE_CHANGE: {
        setCurrentPage(data);
        MainStore.emitChange(OnPitchConstants.PAGE_CHANGE);
        break;
      }
	  
	  case OnPitchConstants.SIGN_IN: {
		  setCurrentUser(data);
		  MainStore.emitChange(OnPitchConstants.SIGN_IN);
	  }
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })
});

module.exports = MainStore;
