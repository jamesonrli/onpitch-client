var React = require('react');
var MainActions = require('../actions/main_actions');
var MainStore = require('../stores/main_store');
var TempActions = require('../actions/temp_actions');
var TempStore = require('../stores/temp_store');
var OnPitchConstants = require('../common/constants');

var Login = React.createClass({	
	getInitialState: function() {
		var currUser = TempStore.getCurrentUser();

		return ({
			user: currUser ? currUser : {"image": "../../public/img/night.jpg"}
		});
	},

	componentDidMount: function() {
		TempStore.addChangeListener(OnPitchConstants.SIGN_IN, this._onChange);
	},

	componentWillUnmount: function() {
		TempStore.removeChangeListener(OnPitchConstants.SIGN_IN, this._onChange);
	},	
	
	signUpHandler: function() {
		MainActions.changePage(OnPitchConstants.PAGE_SIGN_UP);
	},

	signInHandler: function() {
		TempActions.signIn(OnPitchConstants.SIGN_IN);
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
		this.setState({user: TempStore.getCurrentUser()});
		console.log(this.state.user.username);
	}
});

exports.Login = Login;
