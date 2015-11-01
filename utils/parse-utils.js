var UtilConstants = require('./util-constants');
var HttpUtils = require('./http-utils');

// endpoints reference: https://www.parse.com/docs/rest/guide/

var ParseUtils = {
  updateProfile: function(profileId, profileChanges, onResult) {
    var putOptions = {
      host: UtilConstants.PARSE_HOST,
      method: UtilConstants.PUT,
      'content-type': 'application/json',
      headers: {
        'X-Parse-Application-Id': UtilConstants.PARSE_APP_ID,
        'X-Parse-REST-API-Key': UtilConstants.PARSE_REST_KEY
      },
      path: '/1/classes/Profile/' + profileId
    };

    HttpUtils.makeRequest(putOptions,
      function(result) {
        // on complete
        console.log('request complete' + JSON.stringify(result));
      },
      function(err) {
        // on err
        console.log('request failed: ' + err);
      },
      JSON.stringify(profileChanges)
    );
  },

  updateUser: function(userId, profileChanges, onResult) {
    var putOptions = {
      host: UtilConstants.PARSE_HOST,
      method: UtilConstants.PUT,
      'content-type': 'application/json',
      headers: {
        'X-Parse-Application-Id': UtilConstants.PARSE_APP_ID,
        'X-Parse-REST-API-Key': UtilConstants.PARSE_REST_KEY
      },
      path: '/1/classes/_User/' + userId
    };

    HttpUtils.makeRequest(putOptions,
      function(result) {
        // on complete
        console.log('request complete' + JSON.stringify(result));
      },
      function(err) {
        // on err
        console.log('request failed: ' + err);
      },
      JSON.stringify(profileChanges)
    );
  },

  getUserProfile: function(userId, onResult) {
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
        // on complete, create action here
        if(result.results.length > 0) {
          onResult(result.results[0]);
        }
      },
      function(error) {
        // on error
        console.error(error);
      });
  },

  getUserProjects: function(userId, onResult) {
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
      path: '/1/classes/Project?where=' + encodeURIComponent(restrict) + '&include=userId'
    };

    HttpUtils.makeRequest(getOptions,
      function(result) {
        // on complete, create action here
        if(result.results.length > 0) {
          onResult(result.results);
        }
      },
      function(error) {
        // on error
        console.error(error);
      });
  }
};

module.exports = ParseUtils;
