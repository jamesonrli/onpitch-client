var React = require('react');
var OnPitchConstants = require('../common/constants');

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
      projects: ProfileStore.getCurrentProjects()
    };
  },

  componentDidMount: function() {
    ProfileStore.addChangeListener(OnPitchConstants.PROFILE_CHANGE, this._onChangeProfile);
    ProfileStore.addChangeListener(OnPitchConstants.PROJECTS_CHANGE, this._onChangeProjects);
  },

  componentWillUnmount: function() {
    ProfileStore.removeChangeListener(OnPitchConstants.PROFILE_CHANGE, this._onChangeProfile);
    ProfileStore.removeChangeListener(OnPitchConstants.PROJECTS_CHANGE, this._onChangeProjects);
  },

  render: function() {
    return (
      <div>
        <ProfileIntro profile={this.state.profile}/>
        <ProfileProjects projects={this.state.projects}/>
      </div>
    );
  },

  _onChangeProfile: function() {
    this.setState({
      profile: ProfileStore.getCurrentProfile(),
    });
  },

  _onChangeProjects: function() {
    this.setState({
      projects: ProfileStore.getCurrentProjects()
    });
  }
});

var ProfileIntro = React.createClass({
  render: function() {
    return (
      <div className='profileIntro container'>
        <img className='profileImage thumbnail col-sm-4' src={this.props.profile.imageURL} />
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
                <img className='profileProjectImage thumbnail' src={project.imageURL} />
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
