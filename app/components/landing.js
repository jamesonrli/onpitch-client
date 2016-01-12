var React = require('react');
var MainActions = require('../actions/main_actions');
var MainStore = require('../stores/main_store');
var UserStore = require('../stores/user_store');
var UserActions = require('../actions/user_actions');
var OnPitchConstants = require('../common/constants');

const DEFAULT_IMG = "http://files.parsetfss.com/97567fb5-086d-4a0c-8c60-a70917bff8c6/tfss-cd8b6a00-0049-44e1-8f46-cf0695988277-sunset.jpg";

const INTRO = "Hello! This is our Senior Project: OnPitch. The project is meant to serve as an online marketplace where ideas are backed by sponsors.";
const WHO = "Jameson Li (jrli@calpoly.edu) & Peter Tran (ptran13@calpoly.edu) We are looking to improve our front-end skills. If you have feedback, then we would love to hear from you!";
const TECH = "This project could not have been made without:"
const THANKS = "Thank you for taking a look at our website!";

var Landing = React.createClass({
  getInitialState: function() {
    var currUser = UserStore.getCurrentUser();

    return ({
      userPic: currUser ? currUser : {"image": DEFAULT_IMG},
      isSignedIn: currUser ? "hide" : "show",
      greeting: currUser ? ("Welcome Back "+currUser.firstName) : "OnPitch"
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

  _onChange: function () {
    var currUser = UserStore.getCurrentUser();

    this.setState({
      userPic: currUser ? currUser : {"image": DEFAULT_IMG},
      isSignedIn: currUser ? "hide" : "show",
      greeting: currUser ? ("Welcome Back "+currUser.firstName) : "OnPitch"
    });
  },

  render: function() {
    return (
    <div className='container'>
      <div className="text-center">
      <h1>{this.state.greeting}</h1>
      <div>
        <img src={this.state.userPic.image} className="img-circle" width="200" height="200"></img>
        <div className="form-group">&nbsp;</div>{/*used for vertical spacing*/}
        <div className={this.state.isSignedIn}>
          <div className="btn-group">
            <button className='btn btn-lg btn-primary' onClick={this.signUpHandler}> Sign Up </button>
            <button className='btn btn-lg btn-default' onClick={this.signInHandler}> Login </button>
          </div>
        </div>

      </div>
      <div className="form-group">&nbsp;</div>{/*used for vertical spacing*/}
      <Scroll />
      </div>


    </div>
    );
  }
});

var Scroll = React.createClass({
  getInitialState: function() {
    var currUser = UserStore.getCurrentUser();

    return ({
      tab : INTRO
    });
  },

  setT1: function(event) {
    this.setState({tab : INTRO})
  }, 

  setT2: function(event) {
    this.setState({tab : WHO})
  },

  setT3: function(event) {
    this.setState({tab : TECH});
  },
  
  setT4: function(event) {
    this.setState({tab : THANKS});
  },

  render: function() {
    return (
        <div className='container-fluid'>
          <div>
            <ul className="nav nav-tabs">
              <li onClick={this.setT1}><a href='#t1'>Introduction</a></li>
              <li onClick={this.setT2}><a href='#t2'>Who We Are</a></li>
			  <li onClick={this.setT3}><a href='#t3'>Techies</a></li>
              <li onClick={this.setT4}><a href='#t3'>Thanks</a></li>
            </ul>
          </div>
          <div className="panel panel-body">{this.state.tab}</div>
        </div>
      
    );
  }
});

exports.Landing = Landing;
exports.Scroll = Scroll;
