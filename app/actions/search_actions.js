var AppDispatcher = require('../dispatcher/app_dispatcher');
var OnPitchConstants = require('../common/constants');
var UtilConstants = require("../../server/utils/util-constants");
var WebApiUtils = require('../utils/web-api-utils');

module.exports = {

  searchUsers: function(searchTerm) {
    WebApiUtils.searchUsers(searchTerm);
  },

  userSearchResults: function(results) {
    AppDispatcher.handleDataAction({
      actionType: OnPitchConstants.USER_SEARCH_RESULT,
      searchResult: results // todo: figure out how the results will be store and passed
    });
  }
};
