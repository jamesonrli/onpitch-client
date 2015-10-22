var React = require('react');

// var Login = require('./components/login.js').Login;
var Landing = React.createClass({
	render: function() {
		return (
			<div className="text-center container">
				<Header />								
				<Login />
				<div>
					<Scroll />
				</div>
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

var Login = React.createClass({
	render: function() {
		return (
			<div className='btn-group'>				
				<button className='btn btn-sm btn-primary'> Sign Up </button>
				<button className='btn btn-sm btn-default'> Login </button>				
			</div>
		);
	}
});

var Scroll = React.createClass({
	render: function() {
		return(
			<ul className="nav nav-pills">
				<li role="presentation">Who</li>
				<li role="presentation">What</li>
				<li role="presentation">Why</li>
			</ul>
		);
	}
});

exports.Landing = Landing;