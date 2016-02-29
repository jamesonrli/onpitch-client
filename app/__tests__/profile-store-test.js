jest.dontMock("../stores/profile_store")
jest.dontMock("../data/profile")

const React = require('react');
const ReactDOM = require('react-dom')
const TestUtils = require('React-addons-test-utils')

describe("Profile Store", () => {
	const OnPitchConstants = require("../common/constants")
	const Profile = require("../data/profile")
	var ProfileStore, AppDispatcher, callback

	const actionProfileChange = {
		source: "DATA_ACTION",
		action: {
			action_type: OnPitchConstants.PROFILE_CHANGE,
			profileData: new Profile("a", "apple", "ann", "", "", "")
		}
	}
	
	beforeEach(function() {
		ProfileStore = require("../stores/profile_store")
		AppDispatcher = require("../dispatcher/app_dispatcher")
		callback = AppDispatcher.register.mock.calls[0][0]	
		
		ProfileStore.getUserId = jest.genMockFn()
		ProfileStore.getUserId.mockImpl(function() {
			return (ProfileStore._userId) ? true : false
		})	
	})
	
	it("initializes with nulls", () => {
		expect(ProfileStore.getCurrentProfile()).toEqual(new Profile())
		expect(ProfileStore.getCurrentProjects()).toEqual([])
		expect(ProfileStore.getUserId()).toBeFalsy()
	})
	
	it("has a user profile", () => {
		callback(actionProfileChange)
		var testProfile = new Profile("a", "apple", "ann", "", "", "")
		//expect(ProfileStore.getCurrentProfile()).toEqual(testProfile)
	})
	
})
