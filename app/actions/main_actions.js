var AppDispatcher = require('../dispatcher/app_dispatcher');
var OnPitchConstants = require('../common/constants');
var UtilConstants = require("../../server/utils/util-constants");

var MainActions = {

  // newPage: is a PAGE_constant from OnPitchConstants
  changePage: function(newPage) {
    AppDispatcher.handleViewAction({
      actionType: OnPitchConstants.PAGE_CHANGE,
      data: newPage
    });
  },   
};

module.exports = MainActions;
