var React = require('react');
var OnPitchConstants = require('../common/constants');
var SearchActions = require('../actions/search_actions');
var SearchStore = require('../stores/search_store');
var ProfileStore = require('../stores/profile_store');
var MainActions = require('../actions/main_actions');

var CardList = require("./card_list").CardList;

var SearchResult = React.createClass({

	prepareResultForCardList: function(searchResult) {
		if (searchResult && searchResult.map) { //Needed to fix error in Jest
			
			return searchResult.map(function(result, i) {
				return {
				  name: result.userId.firstName + " " + result.userId.lastName,
				  description: result.headline,
				  imageURL: result.userId.image,

				  clickHandler: function() {
					ProfileStore.setCurrentProfile(result.userId.objectId);
					MainActions.changePage(OnPitchConstants.PAGE_PROFILE);
				  }

				};
			});
		}
		else {
			// Not expected to go in here ever.
		}
	},

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
      <CardList items={this.prepareResultForCardList(this.state.searchResults)} />
    </div>
    );
  },

  _onSearchResults: function() {
    this.setState({searchResults: SearchStore.getSearchResults()});
  }

});

exports.SearchResult = SearchResult;
