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
var ProfileStore = require('../stores/profile_store');
var ProfileBox = React.createClass({
  getInitialState: function() {
    return {
      profile: ProfileStore.getCurrentProfile(),
      projects: [
        new ProjectData("My Awesome Project", "This is amazing project description", "/url/to/project/image"),
        new ProjectData("My Awesome Project", "This is amazing project description", "/url/to/project/image"),
        new ProjectData("My Awesome Project", "This is amazing project description", "/url/to/project/image")
      ]
    };
  },

  componentDidMount: function() {
    ProfileStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ProfileStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <ProfileIntro profile={this.state.profile}/>
        <ProfileProjects projects={this.state.projects}/>
      </div>
    );
  },

  _onChange: function() {
    this.setState({profile: ProfileStore.getCurrentProfile()});
  }
});

var ProfileIntro = React.createClass({
  render: function() {
    return (
      <div className='profileIntro container'>
        <img className='profileImage thumbnail col-sm-4' src='http://icons.iconarchive.com/icons/hopstarter/3d-cartoon-vol3/256/Internet-Explorer-icon.png' />
        <div className='col-sm-6'>
          <p className='profileDisplayName'>{this.props.profile.firstName + ' ' + this.props.profile.lastName}</p>
          <p className='profileHeadlineMessage'>{this.props.profile.headline}</p>
        </div>
        <div className='col-sm-2'>
          <button className='btn btn-sm'>Send Message</button>
          <button className='btn btn-sm'>Edit Profile</button>
        </div>
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
            <div key={i} className='profileProjectBlock container col-md-6'>
              <div className="col-xs-4">
                <img className='profileProjectImage thumbnail' src='http://icons.iconarchive.com/icons/hopstarter/3d-cartoon-vol3/256/Internet-Explorer-icon.png' />
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
