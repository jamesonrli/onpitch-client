var React = require('react');
var OnPitchConstants = require('../common/constants');
var MainActions = require('../actions/main_actions');
var UserStore = require('../stores/user_store');
var UserActions = require('../actions/user_actions');

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

  searchHandler: function() {
	MainActions.changePage(OnPitchConstants.PAGE_SEARCH);
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
			<form className="navbar-form navbar-left" role="search">
				<div className="form-group">
				  <input type="text" className="form-control" placeholder="Search"></input>
				</div>
				<button type="submit" className="btn btn-default glyphicon glyphicon-search" onClick={this.searchHandler}></button>
			</form>
            <ul className="nav navbar-nav">
				<li className={this.state.isSignedIn}><a onClick={this.myProfileHandler}>My Profile</a></li>
            </ul>			
			
			<ul className="nav navbar-nav pull-right">
				<li className={this.state.isSignedIn}><a onClick={this.myProfileHandler}><img src={this.state.profilePic} className="img-square" width="30" height="30"></img></a></li>
				<li className={this.state.isSignedIn}><a><button className="btn btn-sm btn-default" onClick={this.signOutHandler}>Log Out</button></a></li>
				<li className={this.state.isSignedOut}>
					<form className="navbar-form"><button className="btn btn-sm btn-default" onClick={this.signInHandler}>Log In</button></form>
				</li>
			</ul>
          </div>
        </div>
      </div>
    );
  }
});

exports.NavBar = NavBar;
