var OnPitchConstants = require('../common/constants');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _currentPage = OnPitchConstants.PAGE_LANDING; // init page is landing

function setCurrentPage(page) {
  _currentPage = page;
}

var MainStore = assign(new EventEmitter(), {

  getCurrentPage: function() {
    return _currentPage;
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
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })
});

module.exports = MainStore;
