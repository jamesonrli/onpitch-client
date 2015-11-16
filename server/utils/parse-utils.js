var UtilConstants = require('./util-constants');
var HttpsUtils = require('./https-utils');

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

    HttpsUtils.makeRequest(putOptions,
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

    HttpsUtils.makeRequest(putOptions,
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

  newUserProfile: function(userId, onResult, onError) {
    var postOptions = {
      host: UtilConstants.PARSE_HOST,
      method: UtilConstants.POST,
      'content-type': 'application/json',
      headers: {
        'X-Parse-Application-Id': UtilConstants.PARSE_APP_ID,
        'X-Parse-REST-API-Key': UtilConstants.PARSE_REST_KEY,
      },
      path: '/1/classes/Profile'
    };

    var content = {
      userId: {
        __type: 'Pointer',
        className: '_User',
        objectId: userId
      },
    };

    HttpsUtils.makeRequest(postOptions,
      function(result) {
        console.log(result);
        onResult(result);
      },
      function(error) {
        console.log(error);
        onError(error);
      },
      JSON.stringify(content)
    );
  },

  getUserProfile: function(userId, onResult, orError) {
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

    HttpsUtils.makeRequest(getOptions,
      function(result) {
        // on complete, create action here
        if(result.results.length > 0) {
          onResult(result.results[0]);
        }
      },
      function(error) {
        // on error
        console.error(error);
        onError(error);
      });
  },

  getUserProjects: function(userId, onResult, onError) {
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

    HttpsUtils.makeRequest(getOptions,
      function(result) {
        // on complete, create action here
        if(result.results.length > 0) {
          onResult(result.results);
        }
      },
      function(error) {
        // on error
        console.error(error);
        onError(error);
      }
    );
  },

  getUserComments: function(userId, onResult, onError) {
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
      path: '/1/classes/Comment?where=' + encodeURIComponent(restrict) + '&include=authorId&order=-date'
    };

    HttpsUtils.makeRequest(getOptions,
      function(result) {
        onResult(result.results);
      },
      function(error) {
        console.error(error);
        onError(error);
      }
    );
  },

  newComment: function(params, onResult, onError) {
    var postOptions = {
      host: UtilConstants.PARSE_HOST,
      method: UtilConstants.POST,
      'content-type': 'application/json',
      headers: {
        'X-Parse-Application-Id': UtilConstants.PARSE_APP_ID,
        'X-Parse-REST-API-Key': UtilConstants.PARSE_REST_KEY,
      },
      path: '/1/classes/Comment'
    };

    var content = {
      authorId: {
        __type: 'Pointer',
        className: '_User',
        objectId: params.authorId
      },
      userId: {
        __type: 'Pointer',
        className: '_User',
        objectId: params.profileUserId
      },
      body: params.comment
    };

    HttpsUtils.makeRequest(postOptions,
      function(result) {
        console.log(result);
        onResult(result);
      },
      function(error) {
        console.log(error);
        onError(error);
      },
      JSON.stringify(content)
    );
  }
};

module.exports = ParseUtils;
