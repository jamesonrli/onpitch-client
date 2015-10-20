var React = require('react');

var CommentBox = require('./comments').CommentBox;
var Profile = React.createClass({
  render: function() {
    return (
      <div>
        <ProfileBox />
        <CommentBox />
      </div>
    );
  }
});

var UserData = require('../data/user').UserData;
var ProfileBox = React.createClass({
  getInitialState: function() {
    return {
      user: new UserData("John Smith", "This is my awesome profile", "/url/to/profile/image")
    }
  },

  render: function() {
    return (
      <div>
        <ProfileIntro user={this.state.user}/>
        <ProfileProjects />
      </div>
    );
  }
});

var ProfileIntro = React.createClass({
  render: function() {
    return (
      <div className='profileIntro'>
        {/* remove this style if possible :( */}
        <img className='profileImage thumbnail' style={{width:'100px'},{height:'100px'}} src='http://icons.iconarchive.com/icons/hopstarter/3d-cartoon-vol3/256/Internet-Explorer-icon.png' />
        <p className='profileDisplayName'>{this.props.user.name}</p>
        <p className='profileHeadlineMessage'>{this.props.user.headline}</p>
      </div>
    );
  }
});

var ProfileProjects = React.createClass({
  render: function() {
    return (<div></div>);
  }
});

exports.Profile = Profile;
