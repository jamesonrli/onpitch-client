var React = require('react');

var OnPitchConstants = require('../common/constants');
var CommentData = require('../data/comment').CommentData;
var CommentStore = require('../stores/comment_store');
var CommentActions = require('../actions/comment_actions');

var ProfileStore = require('../stores/profile_store');

var CommentBox = React.createClass({
  getInitialState: function() {
    return {
      commentList: CommentStore.getCurrentComments()
    };
  },

  componentDidMount: function() {
    CommentStore.addChangeListener(OnPitchConstants.COMMENTS_CHANGE, this._onChangeComments);
    CommentStore.subscribeEvents();
  },

  componentWillUnmount: function() {
    CommentStore.removeChangeListener(OnPitchConstants.COMMENTS_CHANGE, this._onChangeComments);
  },

  commentSubmitHandler: function(comment) {
    CommentActions.newComment(ProfileStore.getUserId(), ProfileStore.getUserId(), comment); // todo: get author id when login store is available
  },

  render: function() {
    return (
      <div className='commentBox'>
        <CommentList comments={this.state.commentList} />
        <CommentForm commentSubmitHandler={this.commentSubmitHandler} />
      </div>
    );
  },

  _onChangeComments: function() {
    this.setState({
      commentList: CommentStore.getCurrentComments()
    });
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
    var dateObj = this.props.createdDate;

    return (
      <div className='comment'>
        <div className='commentInner'>
          <div className='commentHeader row'>
            <p className='commentAuthor commentHeaderItem col-xs-2'>{this.props.author}</p>
            <p className='commentCreated commentHeaderItem col-xs-3'>
              {
                (dateObj.getMonth() + 1) + '/' + dateObj.getDate() + '/' + dateObj.getFullYear() + ' ' +
                dateObj.getHours() + ':' + dateObj.getMinutes() // move this to utils
              }
            </p>
          </div>
          <p className='commentBody'>{this.props.body}</p>
        </div>
        <hr className='commentDivider'/>
      </div>
    );
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
