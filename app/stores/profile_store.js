var OnPitchConstants = require('../common/constants');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _currentProfile = null;
var _currentProjects = null;
var _currentScore = null;

var _userId = null;
var _scoreId = null;

function setCurrentProfile(profile) {
  _currentProfile = profile;
  _userId = profile.userId;
  _scoreId = profile.gPlusId;
}

function setCurrentProjects(projects) {
  _currentProjects = projects;
}

function setCurrentProfileScore(profileScore) {
  _currentScore = profileScore;
}

var ProfileActions = require('../actions/profile_actions');
var Profile = require('../data/profile');
var ProfileScore = require('../data/profile_score');

var ProfileStore = assign(new EventEmitter(), {

  getUserId: function() {
    return _userId ? _userId : Parse.User.current().id;
  },

  getUserScoreId: function() {
    return _scoreId;
  },

  setCurrentProfile: function(userId) {
    _userId = userId;

    // reset _currentProfile and _currentProjects when setting new user
    _currentProfile = null;
    _currentProjects = null;
  },

  getCurrentProfile: function() {
    if(!_currentProfile) {
      _currentProfile = new Profile();
      ProfileActions.getProfile(this.getUserId());
    }
    return _currentProfile;
  },

  getCurrentProfileScore: function() {
    if(!_currentScore) {
      _currentScore = new ProfileScore(100);

      if(_scoreId) {
        ProfileActions.getProfileScore(_scoreId);
      }
    }
    return _currentScore.score; 
  },

  getCurrentProjects: function() {
    if(!_currentProjects) {
      _currentProjects = [];
      ProfileActions.getProjects(this.getUserId());
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
        break;
      }
      case OnPitchConstants.PROFILE_SCORE_CHANGE: {
        setCurrentProfileScore(action.profileScoreData);
        break;
      }
      case OnPitchConstants.PROJECTS_CHANGE: {
        setCurrentProjects(action.projectsData);
        break;
      }
    }

    ProfileStore.emitChange(action.actionType);

    return true; // No errors. Needed by promise in Dispatcher.
  })
});

module.exports = ProfileStore;
