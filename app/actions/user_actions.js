var AppDispatcher = require('../dispatcher/app_dispatcher');
var OnPitchConstants = require('../common/constants');
var UtilConstants = require("../../server/utils/util-constants");

//https://developers.google.com/identity/sign-in/web/reference
//https://developers.google.com/api-client-library/javascript/

//https://parse.com/docs/js/guide#users-querying

var addUser = function(data) {
	Parse.initialize(UtilConstants.PARSE_APP_ID, UtilConstants.PARSE_JS_KEY);
	
	var userObj = new Parse.Query(Parse.User);
	userObj.equalTo("username", data.username);
	userObj.find({
		error: function(err) {
			console.log(err);
		}
	})
	.then(function (result) {
		
		//only one matching username is expected
		if (!result[0]) { 						
			var newUser = new Parse.User();
			newUser.set("username", data.username);
			newUser.set("password", data.password);
			newUser.set("email", data.email);
			newUser.set("firstName", data.firstName);
			newUser.set("lastName", data.lastName);
			newUser.set("image", data.image);
			newUser.set("gender", data.gender);
			newUser.set("url", data.url);
			
			newUser.signUp(null, {
				success: function(newUser) {
					console.log(newUser + " has signed up.");
				},
				error: function(user, err) {
					console.log(user, ": ", err)
				}
			})
		}
		else {
			Parse.User.logIn(data.username, data.password).then(function(user) {				
				user.set("username", data.username);
				user.set("password", data.password);
				user.set("email", data.email);
				user.set("firstName", data.username);
				user.set("lastName", data.lastName);
				user.set("image", data.image);
				user.set("gender", data.gender);
				user.set("url", data.url);
				user.save();
			});
		}
	});
	
}

var gSignIn = function() {
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
							"password": "onpitch_pw",
							"image" : res.image.url.replace("sz=50", "sz=500"),
							"id": res.id,
							"gender": res.gender,
							"email": res.emails[0].value, // emails:Array{type:String, value:String},
							"url": res.url,
							"username": res.emails[0].value.split("@")[0]
						}
						
						addUser(user);
						
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
}

var UserActions = {
	signOut: function() {
		if (!gapi.auth2) {
			gapi.load("auth2", function() {
				 gapi.auth2.init({"client_id" : UtilConstants.GOOGLE_CLIENT_ID})
				 .then(function() {
					 gapi.auth2.getAuthInstance().signOut();
				 })
			});
		}
		else {
			gapi.auth2.getAuthInstance().signOut();
		}
				
		AppDispatcher.handleDataAction({
			actionType: OnPitchConstants.SIGN_IN,
			data: false
		});
	},
	
	signIn: function() {
		if (!gapi.auth2)  {
			gapi.load("auth2", function() {
				gapi.auth2.init({"client_id" : UtilConstants.GOOGLE_CLIENT_ID})
				.then(function() {
					gSignIn();
				});
			});
		}
		else {
			gSignIn();
		}		
	},
	
	signUp: function() {
		
	}
}

module.exports = UserActions;