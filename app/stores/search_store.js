var OnPitchConstants = require('../common/constants');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var SearchStore = assign(new EventEmitter(), {

  emitChange: function(actionType, results) {
    this.emit(actionType, results);
  },

  addChangeListener: function(actionType, callback) {
    this.on(actionType, callback);
  },

  removeChangeListener: function(actionType, callback) {
    this.removeListener(actionType, callback);
  },

  dispatchIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var results = action.searchResult;

    switch(action.actionType) {
      case OnPitchConstants.USER_SEARCH_RESULT: {
        SearchStore.emitChange(OnPitchConstants.USER_SEARCH_RESULT, results);
      }
    }

    return true;
  })
});

module.exports = SearchStore;
