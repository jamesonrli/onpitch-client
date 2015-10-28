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

  commentSubmitHandler: function(comment) {
    // rerender is triggered after state is set, according to docs
    this.setState(function(prevState, currentProp) {
      var newList = prevState.commentList;
      newList.push(new CommentData("Peter1", "11/3/15 1:50PM", comment));
      return {commentList: newList};
    });
  },

  render: function() {
    return (
      <div className='commentBox'>
        <CommentList comments={this.state.commentList} />
        <CommentForm commentSubmitHandler={this.commentSubmitHandler} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    return (
      <div className='commentList'>
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

var Comment = React.createClass({
  render: function() {
    return (
      <div className='comment'>
        <div className='commentInner'>
          <div className='commentHeader row'>
            <p className='commentAuthor commentHeaderItem col-xs-2'>{this.props.author}</p>
            <p className='commentCreated commentHeaderItem col-xs-3'>{this.props.createdDate}</p>
          </div>
          <p className='commentBody'>{this.props.body}</p>
        </div>
        <hr className='commentDivider'/>
      </div>
    )
  }
});

var CommentForm = React.createClass({
  onSubmitComment: function() {
    var newCommentText = this.refs.newComment.value;

    if(newCommentText) {
      this.props.commentSubmitHandler(newCommentText);
    }

    this.refs.newComment.value = ''; // clear comment box
  },

  render: function() {
    return (
      <div>
        <form>
          <div className='form-group'>
            <label htmlFor='comment-body-input'>New Comment</label>
            <textarea className='form-control' rows='3' ref='newComment'></textarea>
          </div>
        </form>
        <button onClick={this.onSubmitComment} className='btn btn-default'>Add Comment</button>
      </div>
    );
  }
});

exports.CommentBox = CommentBox;
