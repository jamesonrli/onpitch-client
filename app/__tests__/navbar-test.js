jest.dontMock('../components/navbar')

const React = require('react');
const ReactDOM = require('react-dom')
const TestUtils = require('React-addons-test-utils')

describe('Navbar', () => {
	
	const NavBar = require('../components/navbar').NavBar
	const navbar = TestUtils.renderIntoDocument(<NavBar />)
	const DEFAULT_PROFILE_PIC = "http://files.parsetfss.com/97567fb5-086d-4a0c-8c60-a70917bff8c6/tfss-cd8b6a00-0049-44e1-8f46-cf0695988277-sunset.jpg";
	const MainActions = require("../actions/main_actions")
	const ProfileStore = require("../stores/profile_store")
	const UserActions = require("../actions/user_actions")

	it ('Check all default states', () => {
		expect(navbar.state.isSignedIn).toBeFalsy()
		expect(navbar.state.loggedIn).toContain("hide")
		expect(navbar.state.profilePic).toBe(DEFAULT_PROFILE_PIC)
	})

	it('Click login button', () => {
		var loginButton = navbar.refs.loginButton
		TestUtils.Simulate.click(loginButton)
		expect(UserActions.signIn).toBeCalled()
	});
	
	it('Click logo', () => {
		var logoButton = navbar.refs.logoButton
		TestUtils.Simulate.click(logoButton)
		expect(MainActions.changePage).toBeCalled()			
	})
	
	it('Click profile button', () => {
		var profileButton = navbar.refs.profileButton
		TestUtils.Simulate.click(profileButton)	
		
		expect(MainActions.changePage).toBeCalled()			
		expect(ProfileStore.setCurrentProfile).toBeCalled()
	})		
});

