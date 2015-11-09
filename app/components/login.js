var React = require('react');
var MainActions = require('../actions/main_actions');
var MainStore = require('../stores/main_store');
var OnPitchConstants = require('../common/constants');

// Automatically signs user through google. 
	// May need to change to prompt each time.
var gSignIn = function() {
	var googleUser = gapi.auth2.getAuthInstance();
	if (googleUser && !googleUser.isSignedIn.get()) googleUser.signIn();
}

var Login = React.createClass({	
	getInitialState: function() {
		var currUser = MainStore.getCurrentUser() ;
		
		return ({
			user: currUser ? currUser : {"image": "../../public/img/night.jpg"}
		});
	},

	componentDidMount: function() {
		MainStore.addChangeListener(OnPitchConstants.SIGN_IN, this._onChange);
	},

	componentWillUnmount: function() {
		MainStore.removeChangeListener(OnPitchConstants.SIGN_IN, this._onChange);
	},	
	
	signUpHandler: function() {
		MainActions.changePage(OnPitchConstants.PAGE_SIGN_UP);
	},

	signInHandler: function() {
		MainActions.signIn(OnPitchConstants.SIGN_IN);
	},
	
	render: function() {
		return (
			<div>
				<div>
					<img src={this.state.user.image} className="img-circle" width="250" height="250"></img>
				</div>
				<div className='btn-group'>
					<button className='btn btn-sm btn-primary' onClick={this.signUpHandler}> Sign Up </button>
					<button className='btn btn-sm btn-default' onClick={this.signInHandler}> Login </button>
				</div>
			</div>
		);
	},
	
	_onChange: function () {
		this.setState({user: MainStore.getCurrentUser()});
	}
});

exports.Login = Login;
