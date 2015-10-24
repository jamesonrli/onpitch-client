var React = require('react');

var Login = require('./login.js').Login;
var Landing = React.createClass({
	render: function() {
		return (
			<div className="text-center container-fluid">
				<Header />								
				<Login />
			</div>		
		);
	}
});

var Header = React.createClass({
		render: function() {
			return (				
				<h1>OnPitch</h1>									
			);
		}
});

var Scroll = React.createClass({
	render: function() {
		return (
			<div class="navbar navbar-default navbar-fixed-top" role="navigation"> 
				<li class="active">Home</li>
				<li>Profile</li>
				<li>Messages</li>
			</div>
		);
	}
});

exports.Landing = Landing;