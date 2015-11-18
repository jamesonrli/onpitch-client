var React = require('react');
var MainActions = require('../actions/main_actions');
var OnPitchConstants = require('../common/constants');
var TempStore = require('../stores/temp_store');
var TempActions = require('../actions/temp_actions');

var NavBar = React.createClass({
	getInitialState: function() {
		var currUser = TempStore.getCurrentUser();
		
		return ({
			signedIn: TempStore.getCurrentUser() ? "show" : "hide"
		});
	},

	componentDidMount: function() {
		TempStore.addChangeListener(OnPitchConstants.SIGN_IN, this._onChange);
	},

	componentWillUnmount: function() {
		TempStore.removeChangeListener(OnPitchConstants.SIGN_IN, this._onChange);
	},	
	
	_onChange: function () {
		this.setState({signedIn: TempStore.getCurrentUser() ? "show" : "hide"});
	},
	
  myProfileHandler: function() {
    MainActions.changePage(OnPitchConstants.PAGE_PROFILE);
  },

  landingHandler: function() {
    MainActions.changePage(OnPitchConstants.PAGE_LANDING);
  },

  signOutHandler: function() {
	 TempActions.signOut(OnPitchConstants.SIGN_IN); 
  },
  
  render: function() {
    return (
      <div className='navbar navbar-default' role='navigation'>
        <div className='container-fluid'>
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only"> Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" onClick={this.landingHandler}>OnPitch</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><a onClick={this.myProfileHandler}>My Profile</a></li>
            </ul>			
			<ul className="nav navbar-nav pull-right">
				<li className={this.state.signedIn}><a onClick={this.signOutHandler}>Log Out</a></li>
			</ul>
          </div>
        </div>
      </div>
    );
  }
});

exports.NavBar = NavBar;
