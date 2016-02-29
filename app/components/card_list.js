var React = require('react');

var renderCard = function (item, i) {
	return (
		<div key={i} className='clickableArea cardBlock container col-md-6' onClick={item.clickHandler}>
		  <div className="col-xs-4">
			<img className='cardImage thumbnail' src={item.imageURL} />
		  </div>
		  <div className='cardDetails col-xs-8'>
			<h3 className="list-group-item-heading">{item.name}</h3>
			<p className="list-group-item-text">{item.description}</p>
		  </div>
		</div>
	  );
}

var CardList = React.createClass({
  render: function() {	  
    return (
      <div className='cardList container-fluid'>
        {this.props.items ? this.props.items.map(renderCard) : null}
      </div>
    );
  }
});

exports.CardList = CardList;
