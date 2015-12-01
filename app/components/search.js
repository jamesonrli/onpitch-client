var React = require('react');

var Search = React.createClass({
	render: function() {
		return (
			<div className="container">
				<h1>Advance Search</h1>
				<div className="container-fluid">
					<form className="form-group">
						<input type="text" placeholder="Who are you looking for?" className="form-control"></input>
					</form>
					<div className="panel panel-default">
						<div className="panel-heading">Options will go here?</div>
						<div className="panel-body">							
							<div className="col-md-3">
								<li>opt 1</li>
								<li>opt 2</li>
								<li>opt 3</li>
							</div>
							<div className="col-md-3">
								<li>opt 4</li>
								<li>opt 5</li>
								<li>opt 6</li>
							</div>
							<div className="col-md-3">
								<li>opt 7</li>
								<li>opt 8</li>
								<li>opt 9</li>
							</div>
							<div className="col-md-3">
								<li>opt 10</li>
								<li>opt 11</li>
								<li>opt 12</li>
							</div>
						</div>
					</div>
					<button type="button" className="btn btn-primary">Search</button>
					<button type="button" className="btn btn-default">Cancel</button>
				</div>
			</div>
		);
	}
});

exports.Search = Search;
