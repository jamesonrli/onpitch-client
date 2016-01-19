// jest.autoMockOff();
jest.dontMock('../components/comments');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('React-addons-test-utils');

describe('Comments', () => {
  const CommentParent = require('../components/comments');
  const CommentBox = CommentParent.CommentBox;
  const CommentBoxDOM = TestUtils.renderIntoDocument(<CommentBox />);
  const CommentList = CommentParent.CommentList;
  const CommentForm = CommentParent.CommentForm;
  const Comment = CommentParent.Comment;

  it('Checks for rendered components', () => {
    var commentList = TestUtils.findRenderedComponentWithType(CommentBoxDOM, CommentList);
    expect(commentList).toBeTruthy();

    var commentForm = TestUtils.findRenderedComponentWithType(CommentBoxDOM, CommentForm);
    expect(commentForm).toBeTruthy();
  });

  it('Checks for new comment entry', () => {
    var commentSubmitButton = TestUtils.findRenderedDOMComponentWithTag(CommentBoxDOM, 'button');
    var commentTextArea = TestUtils.findRenderedDOMComponentWithTag(CommentBoxDOM, 'textarea');
    const newCommentBody = 'hello, new comment';

    // set a comment
    commentTextArea.value = newCommentBody;
    expect(commentTextArea.value).toBe(newCommentBody);

    TestUtils.Simulate.click(commentSubmitButton);
    // clear the comment form after submitting comment
    expect(commentTextArea.value).toBe('');

    // find the new comment in the comment list
    var currentCommentList = CommentBoxDOM.state.commentList;
    expect(currentCommentList[currentCommentList.length - 1]).toBe(newCommentBody);
  });

});
