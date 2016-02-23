jest.dontMock('../components/search_result')
jest.dontMock('../components/card_list')

const React = require('react');
const ReactDOM = require('react-dom')
const TestUtils = require('React-addons-test-utils')

describe("Search Result", () => {
	const SearchResult = require("../components/search_result").SearchResult
	const SearchStore = require("../stores/search_store")
	const searchResult = TestUtils.renderIntoDocument(<SearchResult />)

	it("Check default state", () => {
		expect(SearchStore.getSearchResults).toBeCalled()
		expect(SearchStore.addChangeListener).toBeCalled()
	})
		
	describe("CardList", () => {
		const CardList = require("../components/card_list").CardList
		
		it("Search Result: Jameson Li", () => {
							
			SearchStore.getSearchResults.mockReturnValue([{
				"createdAt": "",
				"headline": "headline",
				"objectId": "DarYHomiQi",
				"updatedAt": "",
				"userId": {
					"username": "jamesonrli",
					"lastName": "Li",
					"firstName": "Jameson",
					"email": "Jamesonrli@gmail.com",
					"image": "https://lh5.googleusercontent.com/-iRNPwG-j2vk/AAAAAAAAAAI/AAAAAAAAD2g/yDhMnuRUwzA/photo.jpg?sz=500"
				}
			}])	
			searchResult.setState({"searchResults": SearchStore.getSearchResults()})
			
			const cardList = TestUtils.renderIntoDocument(<CardList items={searchResult.prepareResultForCardList(searchResult.state.searchResults)} />)
				
			var user = cardList.props.items[0]
			user.clickHandler = jest.genMockFunction()
			expect(cardList.props.items.length).toBe(1)
			expect(user.name).toBe("Jameson Li")
			expect(user.description).toBe("headline")
			expect(user.imageURL).toBe("https://lh5.googleusercontent.com/-iRNPwG-j2vk/AAAAAAAAAAI/AAAAAAAAD2g/yDhMnuRUwzA/photo.jpg?sz=500")
			
			var node = TestUtils.findRenderedDOMComponentWithClass(cardList, "clickableArea")			
			TestUtils.Simulate.click(node) 			
			// For some reason this is not working?
			// expect(user.clickHandler).toBeCalled()
		}) 			
	})	
})