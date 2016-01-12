var React = require('react');
var OnPitchConstants = require('../common/constants');
var MainActions = require('../actions/main_actions');
var UserStore = require('../stores/user_store');
var UserActions = require('../actions/user_actions');
var SearchActions = require('../actions/search_actions');

var SearchBox = require('./search_box').SearchBox;

var DEFAULT_PROFILE_PIC = "";

var NavBar = React.createClass({
  getInitialState: function() {
    var currUser = UserStore.getCurrentUser();

    return ({
      profilePic: currUser ? currUser['image'] : DEFAULT_PROFILE_PIC,
      isSignedIn: currUser ? "show" : "hide",
      isSignedOut: currUser ? "hide" : "show"
    });
  },

  componentDidMount: function() {
    UserStore.addChangeListener(OnPitchConstants.SIGN_IN, this._onChange);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(OnPitchConstants.SIGN_IN, this._onChange);
  },

  _onChange: function () {
    var currUser = UserStore.getCurrentUser();

    this.setState({
      profilePic: currUser ? currUser['image'] : DEFAULT_PROFILE_PIC,
      isSignedIn: currUser ? "show" : "hide",
      isSignedOut: currUser ? "hide" : "show"
    });
  },

  myProfileHandler: function() {
    MainActions.changePage(OnPitchConstants.PAGE_PROFILE);
  },

  landingHandler: function() {
    MainActions.changePage(OnPitchConstants.PAGE_LANDING);
  },

  signOutHandler: function() {
   UserActions.signOut(OnPitchConstants.SIGN_IN);
  },

  signInHandler: function() {
   UserActions.signIn(OnPitchConstants.SIGN_IN);
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
			<div className="navbar-form">
				<ul className="nav navbar-nav">
					<li><SearchBox /></li>
					<li className={this.state.isSignedIn}><button onClick={this.myProfileHandler} className="btn">My Profile</button></li>
				</ul>
				
				<ul className="nav navbar-nav pull-right">
					<li className={this.state.isSignedIn}  onClick={this.myProfileHandler}>
						<img src={this.state.profilePic} className="img-square" width="30" height="30"></img>
					</li>
					<li className={this.state.isSignedIn}>
						<button className="btn btn-sm btn-default" onClick={this.signOutHandler}>Log Out</button></li>
					<li className={this.state.isSignedOut}>
						<button className="btn btn-sm btn-default" onClick={this.signInHandler}>Log In</button>
					</li>				
				</ul>
			</div>
          </div>
        </div>
      </div>
    );
  }
});

exports.NavBar = NavBar;
