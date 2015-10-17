// main.js
var React = require('react');
var ReactDOM = require('react-dom');

var CommentBox = require('./components/comments').CommentBox;

var HelloWorld = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <CommentBox />
      </div>
    );
  }
});

ReactDOM.render(
  <HelloWorld />,
  document.getElementById('container')
);
