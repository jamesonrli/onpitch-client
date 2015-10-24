// main.js
var React = require('react');
var ReactDOM = require('react-dom');

var Profile = require('./components/profile').Profile;
var Landing = require('./components/landing').Landing;

var App = React.createClass({
  getInitialState: function() {
    return {
      showProfile: false,
      showLanding: true
    };
  },

  disableAllPages: function() {
    this.setState({showProfile: false, showLanding: false});
  },

  myProfileHandler: function() {
    this.disableAllPages();
    this.setState({showProfile: true});
  },

  landingHandler: function() {
    this.disableAllPages();
    this.setState({showLanding: true});
  },
  
  render: function() {
    return (
      <div>
        <h1>Welcome to OnPitch</h1>
		<div className='navbar navbar-default' role='navigation'>
			<div className='container'>
				<button onClick={this.myProfileHandler} className='btn btn-sm navbar-btn'>My Profile</button>
				<button onClick={this.landingHandler} className='btn btn-sm'>My Landing</button>
			</div>
		</div>
        <div> {/* replace with navbar */}
		  {this.state.showProfile ? <Profile /> : ""}
		  {this.state.showLanding ? <Landing /> : ""}
        </div>		
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('container')
);
