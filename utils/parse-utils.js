var UtilConstants = require('./util-constants');
var WebApiUtils = require('./web-api-utils');

// endpoints reference: https://www.parse.com/docs/rest/guide/

module.exports = {
  getUserProfile: function(userId) {
    var restrict = JSON.stringify({
      user: {
        __type: 'Pointer',
        className: 'User',
        objectId: userId
      }
    });

    var getOptions = {
      host: UtilConstants.PARSE_HOST,
      method: UtilConstants.GET,
      header: {
        'X-Parse-Application-Id': UtilConstants.PARSE_APP_ID,
        'X-Parse-REST-API-Key': UtilConstants.PARSE_REST_KEY
      },
      path: '/1/classes/Profile?where=' + restrict
    };

    WebApiUtils.makeRequest(getOptions,
      function(result) {
        // on complete, create action here
        console.log(result);
      },
      function(error) {
        // on error
        console.error(error);
      });
  }
};
