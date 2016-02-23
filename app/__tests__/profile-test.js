
jest.dontMock("../components/profile")

const React = require("react")
const ReactDOM = require('react-dom')
const TestUtils = require('React-addons-test-utils')

describe("Profile", () => {
	const ProfileParent = require("../components/Profile")
	const Profile = ProfileParent.Profile
	const ProfileDOM = TestUtils.renderIntoDocument(<Profile />)
	const ProfileBox = ProfileParent.ProfileBox
	
	it("Check for rendered components", () => {
	})
	
	describe("ProfileBox", () => {

		// const ProfileStore = require("../stores/profile_store")
		
		//console.log(ProfileParent)
		
		it("Check default states", () => {											
			// expect(profileBox.getInitialState).toBeCalled()
			// expect(ProfileStore.getCurrentProfile).toBeCalled()
			// expect(ProfileStore.getCurrentProjects).toBeCalled()
		})
	})	
})