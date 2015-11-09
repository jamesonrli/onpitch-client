var AppDispatcher = require('../dispatcher/app_dispatcher');
var OnPitchConstants = require('../common/constants');
var UtilConstants = require("../../utils/util-constants");

var MainActions = {

  changePage: function(newPage) {
    AppDispatcher.handleViewAction({
      actionType: OnPitchConstants.PAGE_CHANGE,
      data: newPage
    });
  },   
};

module.exports = MainActions;
