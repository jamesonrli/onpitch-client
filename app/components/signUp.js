var React = require('react');

var SignUp = React.createClass({
	render: function(){
		return (
			<div className='text-center container'>
				<div className='span3'>
					<h1>Ready to Pitch?</h1>
					<SignUpForm />
				</div>
			</div>
		);
	}
});

var SignUpForm = React.createClass({
	render: function() {
		return (
			<div>
				<form role='form'>
					<div className='form-group'>
						<input type="text" defaultValue="Email" className="form-control"></input>
					</div>
					<div className='form-group'>
						<input type="text" defaultValue="Password" className="form-control"></input>						
					</div>
					<div className='form-group'>
						<input type="text" defaultValue="Confirm Password" className="form-control"></input>
					</div>
					<div className='btn-group'>
						<button className="btn btn-md btn-primary">Submit</button>
						<button className="btn btn-md btn-default">Cancel</button>
					</div>
				</form>
			</div>
		);
	}
});

exports.SignUp = SignUp;