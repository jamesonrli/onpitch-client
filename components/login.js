var gapi_clientId = "43916539739-kg913v794v0egih5l4en19eermk35qgl.apps.googleusercontent.com";
var SCOPE = ["https://www.googleapis.com/auth/plus.login"];

var React = require('react');

var Login = React.createClass({
  render: function() {
    return (
      <div className='btn-group'>
        <button className='btn btn-sm btn-primary'> Sign Up </button>
        <button className='btn btn-sm btn-default'> Login </button>
      </div>
    );
  }
});



// Initializes gapi.auth
var handleSignIn = function(googleUser) {
  gapi.load('auth', function() {
    gapi.auth.authorize(
    {
      'client_id': gapi_clientId,
      'scope': SCOPE,
      'immediate': false
    });
  });
};

// Authenticates user
var initAuth = function() {
  gapi.load("auth2", function() {
    gapi.auth2.init({"client_id": gapi_clientId}).then(function() {
      var googleUser = gapi.auth2.getAuthInstance();

      if (!googleUser.isSignedIn.get()) {
        googleUser.signIn();
      }
    });
  });
};


exports.Login = Login;
