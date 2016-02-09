jest.dontMock('../components/search_box')

const React = require('react');
const ReactDOM = require('react-dom')
const TestUtils = require('React-addons-test-utils')

describe('SearchBox', () => {
			
	const SearchBox = require('../components/search_box').SearchBox
	const searchBox = TestUtils.renderIntoDocument(<SearchBox />)
	const search_box = searchBox.refs.input
	const SearchActions = require("../actions/search_actions")
	const MainActions = require("../actions/main_actions")
	
	it('Search bar: no input', () => {
		expect(searchBox.state.searchValue).toBe("")
	});
	
	it('Search bar: has input', () => {
		search_box.value = "Peter Tran"
		TestUtils.Simulate.change(search_box)
		expect(searchBox.state.searchValue).toBe("Peter Tran")
	});
	
	it('Click search', () => {
		var searchButton = TestUtils.scryRenderedDOMComponentsWithTag(searchBox, "a")[0]
		TestUtils.Simulate.click(searchButton)
		expect(MainActions.changePage).toBeCalled()
		expect(SearchActions.searchUsers).toBeCalled()
	})
});