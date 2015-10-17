var React = require('react');

var CommentBox = React.createClass({
  render: function() {
    return (
      <div class="commentBox">
        <h3>This is the CommentBox</h3>
        <CommentList />
        <CommentForm />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    return (
      <div class="commentList">
        <h4>This is the CommentList</h4>
        <hr className="commentDivider"/>
        <Comment author="Peter" createdDate="3/1/15 11:00AM">This is a comment</Comment>
        <Comment author="Peter" createdDate="3/1/15 11:30AM">This is a commentThis is a commentThis is a commentThis is a commentThis is a commentThis is a commentThis is a commentThis is a commentThis is a commentThis is a commentThis is a commentThis is a commentThis is a commentThis is a commentThis is a commentThis is a commentThis is a commentThis is a commentThis is a commentThis is a commentThis is a comment</Comment>
        <Comment author="Peter" createdDate="3/1/15 1:10PM">This is a comment</Comment>
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div class="commentForm">
        <h4>This is the CommentForm</h4>
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <div className="commentInner">
          <div className="commentHeader row">
            <p className="commentAuthor commentHeaderItem col-xs-1">{this.props.author}</p>
            <p className="commentCreated commentHeaderItem col-xs-2">{this.props.createdDate}</p>
          </div>
          <p className="commentBody">{this.props.children}</p>
        </div>
        <hr className="commentDivider"/>
      </div>
    )
  }
})

exports.CommentBox = CommentBox;
exports.CommentList = CommentList;
exports.CommentForm = CommentForm;
