jest.dontMock("../stores/search_store")

const React = require('react');
const ReactDOM = require('react-dom')
const TestUtils = require('React-addons-test-utils')

describe("Search Store", () => {
	
	const OnPitchConstants = require('../common/constants');
	var SearchStore, AppDispatcher, callback
	
	const actionSearch = {
		source: "DATA_ACTION",
		action: {
			actionType: OnPitchConstants.USER_SEARCH_RESULT,
			searchResult: ["user01"]
		}
	}
	
	beforeEach(function() {
		SearchStore = require("../stores/search_store")
		AppDispatcher = require("../dispatcher/app_dispatcher")
		callback = AppDispatcher.register.mock.calls[0][0]			
	})
	
	it("initializes", () => {
		var searchResult = SearchStore.getSearchResults()
		expect(searchResult).toEqual([])		
	})
	
	it("contains search input", () => {
		callback(actionSearch)
		var searchResult = SearchStore.getSearchResults()
		expect(searchResult).toEqual(["user01"])				
	})
})


