var AppDispatcher = require('../dispatcher/app_dispatcher');
var OnPitchConstants = require('../common/constants');

var MainActions = {

  changePage: function(newPage) {
    AppDispatcher.handleViewAction({
      actionType: OnPitchConstants.PAGE_CHANGE,
      pageName: newPage
    });
  }
};

module.exports = MainActions;
