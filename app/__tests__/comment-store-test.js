jest.dontMock("../stores/comment_store")

const React = require('react');
const ReactDOM = require('react-dom')
const TestUtils = require('React-addons-test-utils')

describe("Comment Store", () => {
	
	const OnPitchConstants = require('../common/constants');
	var CommentStore, AppDispatcher, callback
	
	var genComment = function(text) {
		return new Comment
	}
	
	const actionNewComment = {
		source: "DATA_ACTION",
		action: {
			actionType: OnPitchConstants.COMMENTS_CHANGE,
			commentsData: "Hello World"
		}
	}
	
	const actionSwitchProfile = {
		source: "DATA_ACTION",
		action: {
			actionType: OnPitchConstants.PROFILE_CHANGE,			
		}
	}
	
	beforeEach(function() {
		CommentStore = require("../stores/comment_store")
		AppDispatcher = require("../dispatcher/app_dispatcher")
		callback = AppDispatcher.register.mock.calls[0][0]			
	})
	
	it("initializes", () => {
		var comments = CommentStore.getCurrentComments()
		expect(comments).toEqual([])		
	})
	
	it("adds a new comment", () => {
		callback(actionNewComment)
		var comments = CommentStore.getCurrentComments()
		expect(comments).toBe("Hello World")				
	})
	
	it("switches profile", () => {
		callback(actionSwitchProfile)
		var comments = CommentStore.getCurrentComments()
		expect(comments).toEqual([])		 
		
		callback(actionNewComment)
		callback(actionSwitchProfile)
		comments = CommentStore.getCurrentComments()
		expect(comments).toEqual([])		 
	})
})


