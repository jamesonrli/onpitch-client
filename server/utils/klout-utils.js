var UtilConstants = require('./util-constants');
var HttpsUtils = require('./https-utils');

// klout docs: http://developer.klout.com/io-docs
var KloutUtils = {
  getProfileScore: function(scoreId, onResult, onError) {
    var getOptions = {
      host: UtilConstants.PARSE_HOST,
      method: UtilConstants.GET,
      path: '/identity.json/gp/' + scoreId + '?key=' + UtilConstants.KLOUT_API_KEY
    };

    HttpsUtils.makeRequest(getOptions,
      function(result) {
        console.log(result);
        onResult(result);
      },
      function(error) {
        console.error(error);
        onError(error);
      }
    );
  }
};

module.exports = KloutUtils;
