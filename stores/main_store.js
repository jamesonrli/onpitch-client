var OnPitchConstants = require('../common/constants');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'page-change';

var _currentPage = OnPitchConstants.PAGE_LANDING; // init page is landing

function setCurrentPage(page) {
  _currentPage = page;
}

var MainStore = assign(new EventEmitter(), {

  getCurrentPage: function() {
    return _currentPage;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatchIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var newPage = action.pageName;

    switch(action.actionType) {
      case OnPitchConstants.PAGE_CHANGE: {
        setCurrentPage(newPage);
        MainStore.emitChange();
        break;
      }
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })
});

module.exports = MainStore;
