var React = require('react');
var OnPitchConstants = require('../common/constants');
var MainActions = require('../actions/main_actions');
var UserStore = require('../stores/user_store');
var ProfileStore = require('../stores/profile_store');
var UserActions = require('../actions/user_actions');
var ProfileActions = require('../actions/profile_actions');
var SearchActions = require('../actions/search_actions');

var SearchBox = require('./search_box').SearchBox;

const DEFAULT_PROFILE_PIC = "http://files.parsetfss.com/97567fb5-086d-4a0c-8c60-a70917bff8c6/tfss-cd8b6a00-0049-44e1-8f46-cf0695988277-sunset.jpg";

var NavBar = React.createClass({
  getInitialState: function() {
    var loginUpdate = UserStore.isSignedIn();

    return ({
      isSignedIn: loginUpdate,
      loggedIn: "btn btn-default btn-md " + (loginUpdate ? "show" : "hide"),
      profilePic: loginUpdate ? UserStore.getCurrentUser().image : DEFAULT_PROFILE_PIC
    });
  },

  componentDidMount: function() {
    UserStore.addChangeListener(OnPitchConstants.SIGN_IN, this._onChange);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(OnPitchConstants.SIGN_IN, this._onChange);
  },

  _onChange: function () {
    var loginUpdate = UserStore.isSignedIn();

    this.setState({
      isSignedIn: loginUpdate,
      loggedIn: "btn btn-default btn-md " + (loginUpdate ? "show" : "hide"),
      profilePic: loginUpdate ? UserStore.getCurrentUser().image : DEFAULT_PROFILE_PIC
    });
  },

  signOutHandler: function() {
    UserActions.signOut(OnPitchConstants.SIGN_IN);
	MainActions.changePage(OnPitchConstants.PAGE_LANDING);
  },

  signInHandler: function() {
    UserActions.signIn(OnPitchConstants.SIGN_IN);
  },

  myProfileHandler: function() {
    ProfileStore.setCurrentProfile(UserStore.getCurrentUserId());
    MainActions.changePage(OnPitchConstants.PAGE_PROFILE);
  },

  landingHandler: function() {
    MainActions.changePage(OnPitchConstants.PAGE_LANDING);
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
          <a ref="logoButton" className="navbar-brand" onClick={this.landingHandler}>OnPitch</a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <div className="navbar-form">
            <ul className="nav navbar-nav">
              <li><SearchBox /></li>
              <li>
                <button ref="profileButton" onClick={this.myProfileHandler} className={this.state.loggedIn}>
                  My Profile
                </button>
              </li>
            </ul>

			<div className="navbar-form">
				<ul className="nav navbar-nav pull-right">
				  <li>
					<img src={this.state.profilePic} width="35" height="35"></img>
				  </li>
				  <li>
					<button ref="loginButton" className="btn btn-md btn-default" onClick={this.state.isSignedIn ? this.signOutHandler : this.signInHandler}>
					  {this.state.isSignedIn ? "Log Out" : "Log In" }
					</button>
				  </li>
				</ul>
			</div>
          </div>
        </div>
      </div>
    </div>
  );
  }
});

exports.NavBar = NavBar;
