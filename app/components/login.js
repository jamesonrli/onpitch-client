var gapi_clientId = "423598233004-n12724b6r8rg16sjtm8cb0c7vttkckiq.apps.googleusercontent.com";
var SCOPE = ["https://www.googleapis.com/auth/plus.login"];

var React = require('react');
var MainActions = require('../actions/main_actions');
var OnPitchConstants = require('../common/constants');

var Login = React.createClass({

	// Loads needed APIs
	googleAuth: function () {
		gapi.load("auth2", function() {
			gapi.auth2.init({"client_id" : gapi_clientId, "cookie_policy": "none"});
		});
		
		gapi.load('client').then(function() {
			gapi.client.load('plus', 'v1');
		});				
	},

	// Automatically signs user through google. 
	// May need to change to prompt each time.
	googleSignIn: function() {
		var googleUser = gapi.auth2.getAuthInstance();
		if (googleUser && !googleUser.isSignedIn.get()) googleUser.signIn();
	},
		
	//Signs current user out
	signOut: function() {
		gapi.auth2.getAuthInstance().signOut();
	},
	
	// Pre-req: successfull googleAuth
	googleProfilePic: function() {
		var myImage;		
		var request = gapi.client.plus.people.get({'userId':'me'});
		request.then(function(resp) {
			myImage = resp.result.image.url;				
		});
	},
	
	signUpHandler: function() {
		MainActions.changePage(OnPitchConstants.PAGE_SIGN_UP);
	},

	render: function() {
		return (
			<div className='btn-group'>
				<button className='btn btn-sm btn-primary' onClick={this.signUpHandler}> Sign Up </button>
				<button className='btn btn-sm btn-default' onClick={this.googleAuth}> Login </button>
			</div>
		);
	}
});

exports.Login = Login;
