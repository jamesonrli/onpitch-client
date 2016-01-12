var React = require('react');
var OnPitchConstants = require('../common/constants');
var SearchActions = require('../actions/search_actions');
var SearchStore = require('../stores/search_store');
var MainActions = require('../actions/main_actions');

var SearchResult = React.createClass({

  getInitialState: function() {
    return ({
      searchResults: SearchStore.getSearchResults()
    });
  },

  componentDidMount: function() {
    SearchStore.addChangeListener(OnPitchConstants.USER_SEARCH_RESULT, this._onSearchResults);
  },

  componentWillUnmount: function() {
    SearchStore.removeChangeListener(OnPitchConstants.USER_SEARCH_RESULT, this._onSearchResults);
  },

  render: function() {
    return (
		<div>
		  <h1>Search Results</h1>
		  <div>
			{this.state.searchResults.map(function(user, i) {
				return <p>{user.username}</p>
			  }, this)
			}
		  </div>
	  </div>
    );
  },

  _onSearchResults: function() {
    console.log(SearchStore.getSearchResults());
    this.setState({searchResults: SearchStore.getSearchResults()});
  }

});

exports.SearchResult = SearchResult;
