var OnPitchConstants = require('../common/constants');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _searchResult = [];

function setSearchResult(data) {
  _searchResult = data;
}

var SearchStore = assign(new EventEmitter(), {

  getSearchResults: function() {
    return _searchResult;
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
    var results = action.searchResult;

    switch(action.actionType) {
      case OnPitchConstants.USER_SEARCH_RESULT: {
        setSearchResult(results);
        SearchStore.emitChange(OnPitchConstants.USER_SEARCH_RESULT);
      }
    }

    return true;
  })
});

module.exports = SearchStore;
