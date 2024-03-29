var React = require('react');
var OnPitchConstants = require('../common/constants');
var SearchActions = require('../actions/search_actions');
var MainActions = require('../actions/main_actions');

var SearchBox = React.createClass({
  getInitialState: function() {
    return ({
      searchValue: ""
    });
  },

  componentDidMount: function() {
  },

  handleChange: function(event) {
    this.setState({searchValue: event.target.value});
  },

  handleSearch: function() {
    var searchVal = this.state.searchValue;
    
    if(searchVal) {
      MainActions.changePage(OnPitchConstants.PAGE_SEARCH_RESULT);
      SearchActions.searchUsers(searchVal);
    }
  },

  render: function() {
    return (      
        <div className="input-group">
          <input type="text" className="form-control" ref="input" value={this.state.searchValue} onChange={this.handleChange} placeholder="Search"></input>       
         <span className="btn btn-default input-group-addon" onClick={this.handleSearch}>
			<a className="glyphicon glyphicon-search" type="button"></a>
		 </span>
      </div>	  
    );
  }
});

exports.SearchBox = SearchBox;
