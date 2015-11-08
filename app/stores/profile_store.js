var OnPitchConstants = require('../common/constants');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _currentProfile = null;
var _currentProjects = null;
var _userId = null;

function setCurrentProfile(profile) {
  _currentProfile = profile;
  _userId = profile.userId;
}

function setCurrentProjects(projects) {
  _currentProjects = projects;
}

var ProfileActions = require('../actions/profile_actions');
var Profile = require('../data/profile');
var ProfileStore = assign(new EventEmitter(), {

  getUserId: function() {
    return _userId;
  },

  getCurrentProfile: function() {
    if(!_currentProfile) {
      _currentProfile = new Profile();
      ProfileActions.getProfile('f9D8M07W6b');
    }
    return _currentProfile;
  },

  getCurrentProjects: function() {
    if(!_currentProjects) {
      _currentProjects = [];
      ProfileActions.getProjects('f9D8M07W6b');
    }

    return _currentProjects;
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

    switch(action.actionType) {
      case OnPitchConstants.PROFILE_CHANGE: {
        setCurrentProfile(action.profileData);
        ProfileStore.emitChange(action.actionType);
        break;
      }
      case OnPitchConstants.PROJECTS_CHANGE: {
        setCurrentProjects(action.projectsData);
        ProfileStore.emitChange(action.actionType);
        break;
      }
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })
});

module.exports = ProfileStore;
