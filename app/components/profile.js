var React = require('react');
var OnPitchConstants = require('../common/constants');

var CommentBox = require('./comments').CommentBox;
var CardList = require('./card_list').CardList;

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
        <CardList items={this.state.projects}/>
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

var ProfileActions = require('../actions/profile_actions');
function updateEditables(binder) {
  // name edit
  $('#profileNameEdit').editable({
    type: 'text',
    title: 'Enter your name',
    placement: 'right',
    value: ((binder.props.profile.firstName || '') + ' ' + (binder.props.profile.lastName || '')).trim(),
    success: function(response, newValue) {
      console.log(binder.props.profile);
      binder.setState({
        profile: {
          firstName: newValue.split(' ')[0] || '',
          lastName: newValue.split(' ')[1] || ''
        }
      });
      ProfileActions.userChanges(binder.props.profile.userId, {
        firstName: newValue.split(' ')[0] || '',
        lastName: newValue.split(' ')[1] || ''
      });
    }
  });

  // headline edit
  $('#profileHeadlineEdit').editable({
    type: 'textarea',
    title: 'Enter your message',
    placement: 'right',
    value: binder.props.profile.headline || '',
    success: function(response, newValue) {
      binder.setState({
        profile: {
          headline: newValue
        }
      });
      ProfileActions.profileChanges(binder.props.profile.profileId, {
        headline: newValue
      });
    }
  });
}

var ProfileIntro = React.createClass({
  componentDidMount: function() {
    updateEditables(this);
  },

  componentDidUpdate: function() {
    updateEditables(this);
  },

  render: function() {
    return (
      <div className='profileIntro container'>
        <div className='col-sm-8'>
          <img className='profileImage thumbnail' src={this.props.profile.imageURL} />
          <p className='profileDisplayName'>
            <a href='#' id='profileNameEdit' className='editable editable-click'>{this.props.profile.firstName + ' ' + this.props.profile.lastName}</a>
          </p>
          <p className='profileHeadlineMessage'><a href='#' id='profileHeadlineEdit' className='editable editable-click'>{this.props.profile.headline}</a></p>
        </div>
        <div className='col-sm-2'>
          <button className='btn btn-sm'>Edit Profile</button>
        </div>
        <div className='col-sm-2'>
          <ProfileInfluenceScore profile={this.props.profile}/>
        </div>
      </div>
    );
  }
});

var ProfileInfluenceScore = React.createClass({
  getInitialState: function() {
    return {
      score: ProfileStore.getCurrentProfileScore()
    };
  },

  componentDidMount: function() {
    ProfileStore.addChangeListener(OnPitchConstants.PROFILE_CHANGE, this._onChangeProfile);
    ProfileStore.addChangeListener(OnPitchConstants.PROFILE_SCORE_CHANGE, this._onChangeProfileScore);
  },

  componentWillUnmount: function() {
    ProfileStore.removeChangeListener(OnPitchConstants.PROFILE_CHANGE, this._onChangeProfile);
    ProfileStore.removeChangeListener(OnPitchConstants.PROFILE_SCORE_CHANGE, this._onChangeProfileScore);
  },

  render: function() {
    return (
      <div>
        <p>
          <a href='#'>{'Influence: ' + this.state.score + '/100'}</a>
        </p>
      </div>
    );
  },

  _onChangeProfileScore: function() {
    this.setState({
      score: ProfileStore.getCurrentProfileScore()
    });
  },

  _onChangeProfile: function() {
    ProfileStore.getCurrentProfileScore();
  }

});

exports.Profile = Profile;
