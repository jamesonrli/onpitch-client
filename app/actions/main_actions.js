var AppDispatcher = require('../dispatcher/app_dispatcher');
var OnPitchConstants = require('../common/constants');
var UtilConstants = require("../../utils/util-constants");

//https://developers.google.com/identity/sign-in/web/reference
//https://developers.google.com/api-client-library/javascript/

var MainActions = {

  changePage: function(newPage) {
    AppDispatcher.handleViewAction({
      actionType: OnPitchConstants.PAGE_CHANGE,
      data: newPage
    });
  },
  
  signIn: function() {
	  gapi.load("auth2", function() {
		 gapi.auth2.init({
			 "client_id" : UtilConstants.GOOGLE_CLIENT_ID,
			 "cookie_policy" : "none"
		 })
		 .then(function() {
			var googleUser = gapi.auth2.getAuthInstance();

			// Check for gapi authorization
			if (googleUser) {
				
				// Prompts for user login
				googleUser.signIn({'prompt': 'consent'})
				.then(function() {
					
					// Load gapi.client library
					gapi.load("client", function() {
						
						// Load gapi.client.plus library
						gapi.client.load("plus", "v1").then(function() {
							
							// Retrieve authorized user's profile
							gapi.client.plus.people.get({'userId':'me'})
							.then(function(resp) {
								var res = resp.result;
								var user = {
									"firstName": res.name.givenName,
									"lastName": res.name.familyName,
									"image" : res.image.url.replace("sz=50", "sz=500"),
									"id": res.id,
									"gender": res.gender,
									"email": res.emails, // emails:Array{type:String, value:String},
									"url": res.url
								}
								
								//Send basic user information object to Store								
								AppDispatcher.handleDataAction({
									actionType: OnPitchConstants.SIGN_IN,
									data: user
								});
							});
						});
					});					
				});
			}
		 });
	  });
  }
};

module.exports = MainActions;
