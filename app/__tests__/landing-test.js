// jest.autoMockOff();
jest.dontMock('../components/landing')

const React = require('react');
const ReactDOM = require('react-dom')
const TestUtils = require('React-addons-test-utils')

const INTRO = "Hello! This is our Senior Project: OnPitch. The project is meant to serve as an online marketplace where ideas are backed by sponsors.";
const WHO = "Jameson Li (jrli@calpoly.edu) & Peter Tran (ptran13@calpoly.edu) We are looking to improve our front-end skills. If you have feedback, then we would love to hear from you!";
const TECH = "This project could not have been made without:"
const THANKS = "Thank you for taking a look at our website!";


describe('Landing', () => {		
	const Landing = require('../components/landing').Landing	
	const landing = TestUtils.renderIntoDocument(<Landing />)
	const DEFAULT_IMG = "http://files.parsetfss.com/97567fb5-086d-4a0c-8c60-a70917bff8c6/tfss-cd8b6a00-0049-44e1-8f46-cf0695988277-sunset.jpg";

	it('Check all default states', () => {
		expect(landing.state.userPic.image).toBe(DEFAULT_IMG)
		expect(landing.state.greeting).toBe("OnPitch")
		expect(landing.state.isSignedIn).toContain("show")
	});
	
});

describe('Scroll', () => {
	
	var Scroll = require('../components/landing').Scroll	
	var scroll = TestUtils.renderIntoDocument(<Scroll />)
	
	it ('Default tab', () => {
		expect(scroll.state.tab).toBe(INTRO)			
	});
	
	it('Simulate Clicks', () => {
		var tabs = TestUtils.scryRenderedDOMComponentsWithTag(scroll, "li")				
		
		// expect(tabs[0].textContent).toBe("Introduction")
		// expect(tabs[1].textContent).toBe("Who We Are")
		// expect(tabs[2].textContent).toBe("More Info")
		
		TestUtils.Simulate.click(tabs[2])
		expect(scroll.state.tab).toBe(TECH)
		
		TestUtils.Simulate.click(tabs[1])
		expect(scroll.state.tab).toBe(WHO)
		
		TestUtils.Simulate.click(tabs[0])
		expect(scroll.state.tab).toBe(INTRO)
		
		TestUtils.Simulate.click(tabs[3])
		expect(scroll.state.tab).toBe(THANKS)
	});
});