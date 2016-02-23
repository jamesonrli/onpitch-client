jest.dontMock("../stores/user_store")

const React = require('react');
const ReactDOM = require('react-dom')
const TestUtils = require('React-addons-test-utils')

describe("User Store", () => {
	
	const OnPitchConstants = require('../common/constants');
	var UserStore, AppDispatcher, callback
	
	const testUser = {
		"firstName": "test-firstName",
		"lastName": "test-lastName"
	}
	
	const actionSignIn = {
		source: "DATA_ACTION",
		action: {
			actionType: OnPitchConstants.SIGN_IN,
			data: testUser
		}
	}
	
	const actionSignOut = {
		source: "DATA_ACTION",
		action: {
			actionType: OnPitchConstants.SIGN_IN,
			data: false
		}
	}
	
	beforeEach(function() {
		UserStore = require("../stores/user_store")
		AppDispatcher = require("../dispatcher/app_dispatcher")
		callback = AppDispatcher.register.mock.calls[0][0]	
	})
	
	it("initializes with no user", () => {
		var currentUser = UserStore.getCurrentUser()
		var isSignedIn = UserStore.isSignedIn()
		
		expect(currentUser).toEqual({})							
		expect(isSignedIn).toBeFalsy()
	})
	
	it("has user signed in", () => {
		callback(actionSignIn)		
		
		expect(UserStore.getCurrentUser()).toEqual(testUser)
		expect(UserStore.isSignedIn()).toBeTruthy()
	})
	
	it("has user signed out (after signing in)", () => {
		expect(UserStore.isSignedIn()).toBeFalsy()
		
		callback(actionSignIn)
		
		expect(UserStore.isSignedIn()).toBeTruthy()
		
		callback(actionSignOut)

		expect(UserStore.isSignedIn()).toBeFalsy()
	})
})