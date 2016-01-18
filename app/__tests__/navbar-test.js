jest.dontMock('../components/navbar')

const React = require('react');
const ReactDOM = require('react-dom')
const TestUtils = require('React-addons-test-utils')

describe('Navbar', () => {
		const NavBar = require('../components/navbar').NavBar
		const navbar = TestUtils.renderIntoDocument(<NavBar />)
		const DEFAULT_PROFILE_PIC = "http://files.parsetfss.com/97567fb5-086d-4a0c-8c60-a70917bff8c6/tfss-cd8b6a00-0049-44e1-8f46-cf0695988277-sunset.jpg";
		
		it ('Check all default states', () => {
			expect(navbar.state.isSignedIn).toBeFalsy()
			expect(navbar.state.loggedIn).toContain("hide")
			expect(navbar.state.profilePic).toBe(DEFAULT_PROFILE_PIC)
		})

		it('User logs in', () => {
			var loginNode = TestUtils.scryRenderedDOMComponentsWithTag(navbar, "li")
						
			// expect(navbar.state.isSignedIn).toBeTruthy()
		});
		
		describe('SearchBox', () => {
			const SearchBox = require('../components/search_box').SearchBox
			const searchBox = TestUtils.renderIntoDocument(<SearchBox />)
			
			it('Search bar: no input', () => {
				
			});
			
			it('Search bar: has input', () => {
				
			});
		});
});