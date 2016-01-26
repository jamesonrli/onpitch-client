var React = require('react');
var ReactDOM = require('react-dom');

var OnPitchConstants = require('./common/constants');
var Profile = require('./components/profile').Profile;
var Landing = require('./components/landing').Landing;
var NavBar = require('./components/navbar').NavBar;
var Search = require('./components/search').Search;
var SearchResult = require('./components/search_result').SearchResult;

var MainStore = require('./stores/main_store');

var App = React.createClass({

  getInitialState: function() {
    return ({
      currentPage: MainStore.getCurrentPage()
    });
  },

  componentDidMount: function() {
    MainStore.addChangeListener(OnPitchConstants.PAGE_CHANGE, this._onChange);
  },

  componentWillUnmount: function() {
    MainStore.removeChangeListener(OnPitchConstants.PAGE_CHANGE, this._onChange);
  },

  render: function() {
    return (
      <div>
        <NavBar />
        <div>
          {(() => {
            switch(this.state.currentPage) {
              case OnPitchConstants.PAGE_PROFILE: return <Profile />;
              case OnPitchConstants.PAGE_LANDING: return <Landing />;
              case OnPitchConstants.PAGE_SIGN_UP: return <SignUp />;
              case OnPitchConstants.PAGE_SEARCH: return <Search />;
              case OnPitchConstants.PAGE_SEARCH_RESULT: return <SearchResult />;
              default: return '';
            }
          })()}
        </div>
      </div>
    );
  },

  _onChange: function() {
    this.setState({currentPage: MainStore.getCurrentPage()});
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('container')
);
