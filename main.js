// main.js
var React = require('react');
var ReactDOM = require('react-dom');

var CommentBox = require('./components/comments').CommentBox;

var HelloWorld = React.createClass({
  onClickHander: function() {
    this.refs['commentBox'].addComment();
    this.render();
  },

  render: function() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <CommentBox ref='commentBox'/>
        <button onClick={this.onClickHander}>Clickme</button>
      </div>
    );
  }
});

ReactDOM.render(
  <HelloWorld />,
  document.getElementById('container')
);
