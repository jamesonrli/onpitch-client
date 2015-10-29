var UtilConstants = require('./util-constants');
var HttpUtils = require('./http-utils');

// endpoints reference: https://www.parse.com/docs/rest/guide/

var ParseUtils = {
  getUserProfile: function(userId) {
    var restrict = JSON.stringify({
      userId: {
        __type: 'Pointer',
        className: '_User',
        objectId: userId
      }
    });

    var getOptions = {
      host: UtilConstants.PARSE_HOST,
      method: UtilConstants.GET,
      headers: {
        'X-Parse-Application-Id': UtilConstants.PARSE_APP_ID,
        'X-Parse-REST-API-Key': UtilConstants.PARSE_REST_KEY
      },
      path: '/1/classes/Profile?where=' + encodeURIComponent(restrict) + '&include=userId'
    };

    HttpUtils.makeRequest(getOptions,
      function(result) {
        var ProfileActions = require('../app/actions/profile_actions');

        // on complete, create action here
        if(result.results.length > 0) {
          ProfileActions.updateProfile(result.results[0]);
        }
      },
      function(error) {
        // on error
        console.error(error);
      });
  }
};

module.exports = ParseUtils;