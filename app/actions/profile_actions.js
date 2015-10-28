var AppDispatcher = require('../dispatcher/app_dispatcher');
var OnPitchConstants = require('../common/constants');
var WebApiUtils = require('../../utils/web-api-utils');

var Profile = require('../data/profile');

var ProfileActions = {

  getProfile: function(userId) {
    WebApiUtils.getUserProfile(userId);
  },

  updateProfile: function(profileData) {
    AppDispatcher.handleDataAction({
      actionType: OnPitchConstants.PROFILE_CHANGE,
      profileData: new Profile(profileData.userId.firstName, profileData.userId.lastName, '', profileData.headline)
    });
  }
};

module.exports = ProfileActions;
