var React = require('react');
var MainActions = require('../actions/main_actions');
var OnPitchConstants = require('../common/constants');

var NavBar = React.createClass({

  myProfileHandler: function() {
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
            <a className="navbar-brand" href="#">OnPitch</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><a onClick={this.landingHandler}>Landing</a></li>
              <li><a onClick={this.myProfileHandler}>My Profile</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

exports.NavBar = NavBar;
