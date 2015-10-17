var React = require('react');
var CommentData = require('../data/comment').CommentData;

var CommentBox = React.createClass({
  getInitialState: function() {
    return {
      commentList: [
        new CommentData("Peter", "11/1/12 11:12AM", "This is a comment"),
        new CommentData("Peter", "11/2/12 12:50PM", "This is a comment")
      ]
    }
  },

  addComment: function() {
    // rerender is triggered after state is set, according to docs
    this.setState(function(prevState, currentProp) {
      var prevList = prevState.commentList;
      prevList.push(new CommentData("Peter1", "11/3/15 1:50PM", "This is a new comment"));
      return {commentList: prevList};
    });
  },

  render: function() {
    return (
      <div class='commentBox'>
        <h3>This is the CommentBox</h3>
        <CommentList comments={this.state.commentList} />
        <CommentForm />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    return (
      <div class='commentList'>
        <h4>This is the CommentList</h4>
        <hr className='commentDivider'/>
        {this.props.comments.map(function(comment, i) {
          return (
            <Comment key={i} author={comment.author} createdDate={comment.createdDate} body={comment.body} />
          );
        }, this)}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div class='commentForm'>
        <h4>This is the CommentForm</h4>
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className='comment'>
        <div className='commentInner'>
          <div className='commentHeader row'>
            <p className='commentAuthor commentHeaderItem col-xs-1'>{this.props.author}</p>
            <p className='commentCreated commentHeaderItem col-xs-2'>{this.props.createdDate}</p>
          </div>
          <p className='commentBody'>{this.props.body}</p>
        </div>
        <hr className='commentDivider'/>
      </div>
    )
  }
})

exports.CommentBox = CommentBox;
exports.CommentList = CommentList;
exports.CommentForm = CommentForm;
