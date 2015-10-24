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
var ProjectData = require('../data/project').ProjectData;
var ProfileBox = React.createClass({
  getInitialState: function() {
    return {
      user: new UserData("John Smith", "This is my awesome profile", "/url/to/profile/image"),
      projects: [
        new ProjectData("My Awesome Project", "This is amazing project description", "/url/to/project/image"),
        new ProjectData("My Awesome Project", "This is amazing project description", "/url/to/project/image"),
        new ProjectData("My Awesome Project", "This is amazing project description", "/url/to/project/image")
      ]
    }
  },

  render: function() {
    return (
      <div>
        <ProfileIntro user={this.state.user}/>
        <ProfileProjects projects={this.state.projects}/>
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
        <button className='btn btn-sm'>Send Message</button>
      </div>
    );
  }
});

var ProfileProjects = React.createClass({
  render: function() {
    return (
      <div className='profileProjectList container-fluid'>
        {this.props.projects.map(function(project, i) {
          return (
            <div key={i} className='profileProjectBlock container col-sm-6'>
              <div className="col-xs-4">
                <img className='profileProjectImage thumbnail' style={{width:'100px'},{height:'100px'}} src='http://icons.iconarchive.com/icons/hopstarter/3d-cartoon-vol3/256/Internet-Explorer-icon.png' />
              </div>
              <div className='profileProjectDetails col-xs-8'>
                <p className="list-group-item-heading">{project.name}</p>
                <p className="list-group-item-text">{project.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
});

exports.Profile = Profile;
