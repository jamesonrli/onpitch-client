var AppDispatcher = require('../dispatcher/app_dispatcher');
var OnPitchConstants = require('../common/constants');
var WebApiUtils = require('../../utils/web-api-utils');

var Profile = require('../data/profile');
var Project = require('../data/project');

var ProfileActions = {

  getProfile: function(userId) {
    WebApiUtils.getUserProfile(userId);
  },

  updateProfile: function(profileData) {
    AppDispatcher.handleDataAction({
      actionType: OnPitchConstants.PROFILE_CHANGE,
      profileData: new Profile(profileData.userId.firstName, profileData.userId.lastName, profileData.profileImage.url, profileData.headline)
    });
  },

  getProjects: function(userId) {
    WebApiUtils.getUserProjects(userId);
  },

  updateProjects: function(projectsData) {
    AppDispatcher.handleDataAction({
      actionType: OnPitchConstants.PROJECTS_CHANGE,
      projectsData: (() => {
        var processedList = [];
        projectsData.forEach(function(proj) {
          processedList.push(new Project(proj.title, proj.description, proj.projectImage.url));
        });
        return processedList;
      })()
    });
  }
};

module.exports = ProfileActions;
