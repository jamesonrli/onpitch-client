jest.dontMock("../stores/main_store")

const React = require('react');
const ReactDOM = require('react-dom')
const TestUtils = require('React-addons-test-utils')

describe("Main Store", () => {

	const OnPitchConstants = require('../common/constants');
	var MainStore
	var AppDispatcher
	var callback
	
	const actionChangeToProfile = {
		source: "VIEW_ACTION",
		action: {
			actionType: OnPitchConstants.PAGE_CHANGE,
			data: OnPitchConstants.PAGE_PROFILE
		}
	}
	
	beforeEach(function() {
		MainStore = require("../stores/main_store")
		AppDispatcher = require('../dispatcher/app_dispatcher')
		callback = AppDispatcher.register.mock.calls[0][0]		
	})
	
	it('initializes current page to landing page', () => {
		var currentPage = MainStore.getCurrentPage()
		expect(currentPage).toBe(OnPitchConstants.PAGE_LANDING)
	})
	
	it('changes to the page', () => {
		callback(actionChangeToProfile)
		var currentPage = MainStore.getCurrentPage()
		expect(currentPage).toBe(OnPitchConstants.PAGE_PROFILE)	
	})
})