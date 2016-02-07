var React = require('react');
var OnPitchConstants = require('../common/constants');
var SearchActions = require('../actions/search_actions');
var SearchStore = require('../stores/search_store');
var ProfileStore = require('../stores/profile_store');
var MainActions = require('../actions/main_actions');

var CardList = require("./card_list").CardList;

function prepareResultForCardList(searchResult) {
  return searchResult.map(function(result, i) {
    return {
      name: result.userId.firstName + " " + result.userId.lastName,
      description: result.headline,
      imageURL: result.userId.image,

      clickHandler: function() {
        console.log("result item clicked");
        ProfileStore.setCurrentProfile(result.userId.objectId);
        MainActions.changePage(OnPitchConstants.PAGE_PROFILE);
      }

    };
  });
}

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
      <CardList items={prepareResultForCardList(this.state.searchResults)} />
    </div>
    );
  },

  _onSearchResults: function() {
    console.log(SearchStore.getSearchResults());
    this.setState({searchResults: SearchStore.getSearchResults()});
  }

});

exports.SearchResult = SearchResult;
