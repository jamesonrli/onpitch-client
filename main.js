// main.js
var React = require('react');
var ReactDOM = require('react-dom');

var Profile = require('./components/profile').Profile;

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
        <button onClick={this.myProfileHandler} className='btn btn-sm'>My Profile</button>
        <div> {/* replace with navbar */}
          {this.state.showProfile ? <Profile /> : ""}
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('container')
);
