var React = require('react');

var INTRO = "Hello, this is an intro tab!";
var WHO = "I AM YO FATHER.";
var MORE = "I AM YO MOTHA ALSO";

var Login = require('./login.js').Login;
var Landing = React.createClass({
  render: function() {
    return (
    <div className='container'>
      <div className="text-center">
        <Header />
        <Login />
      </div>
      <div className="form-group">&nbsp;</div>{/*used for vertical spacing*/}
      <Scroll />
    </div>
    );
  }
});

var Header = React.createClass({
    render: function() {
      return (
        <h1>OnPitch</h1>
      );
    }
});

var Scroll = React.createClass({
  getInitialState: function() {
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
    this.setState({tab : MORE});
  },

  render: function() {
    var text = this.state.tab;
    return (

      <div className="n tabs-left">
        <div className='container-fluid'>
          <div>
            <ul className="nav nav-tabs">
              <li onClick={this.setT1}><a href='#t1'>Introduction</a></li>
              <li onClick={this.setT2}><a href='#t2'>Who We Are</a></li>
              <li onClick={this.setT3}><a href='#t3'>More Info</a></li>
            </ul>
          </div>
          <div className="col-sm-8">{text}</div>
        </div>
      </div>
    );
  }
});

exports.Landing = Landing;
