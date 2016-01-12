jest.autoMockOff();

const React = require('react');
const ReactDom = require('react-dom')
const TestUtils = require('React-addons-test-utils')

describe('Landing', () => {		
	const Landing = require('../components/landing').Landing
	const landing = TestUtils.renderIntoDocument(<Landing />)

	it('Default login ', () => {
		expect(landing.state.greeting).toBe("OnPitch")
		expect(landing.state.isSignedIn).toContain("show")
	});
});