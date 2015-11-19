var React = require('react');
var MainActions = require('../actions/main_actions');
var MainStore = require('../stores/main_store');
var UserActions = require('../actions/user_actions');
var UserStore = require('../stores/user_store');
var OnPitchConstants = require('../common/constants');

var DEFAULT_IMG = "http://files.parsetfss.com/97567fb5-086d-4a0c-8c60-a70917bff8c6/tfss-cd8b6a00-0049-44e1-8f46-cf0695988277-sunset.jpg";

var Login = React.createClass({	
	getInitialState: function() {
		var currUser = UserStore.getCurrentUser();

		return ({
			user: currUser ? currUser : {"image": DEFAULT_IMG}
		});
	},

	componentDidMount: function() {
		UserStore.addChangeListener(OnPitchConstants.SIGN_IN, this._onChange);
	},

	componentWillUnmount: function() {
		UserStore.removeChangeListener(OnPitchConstants.SIGN_IN, this._onChange);
	},	
	
	signUpHandler: function() {
		MainActions.changePage(OnPitchConstants.PAGE_SIGN_UP);
	},

	signInHandler: function() {
		UserActions.signIn(OnPitchConstants.SIGN_IN);
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
		var currUser = UserStore.getCurrentUser()
		this.setState({user: currUser ? currUser : {"image": DEFAULT_IMG}});
	}
});

exports.Login = Login;
