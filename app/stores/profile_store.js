var OnPitchConstants = require('../common/constants');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = OnPitchConstants.PROFILE_CHANGE;
var _currentProfile = null;

function setCurrentProfile(profile) {
  _currentProfile = profile;
}

var ProfileActions = require('../actions/profile_actions');
var Profile = require('../data/profile');
var ProfileStore = assign(new EventEmitter(), {

  getCurrentProfile: function() {
    if(!_currentProfile) {
      _currentProfile = new Profile();
      ProfileActions.getProfile('f9D8M07W6b');
    }
    return _currentProfile;
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
    var profileData = action.profileData;

    switch(action.actionType) {
      case OnPitchConstants.PROFILE_CHANGE: {
        setCurrentProfile(profileData);
        ProfileStore.emitChange();
        break;
      }
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })
});

module.exports = ProfileStore;
