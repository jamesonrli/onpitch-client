var React = require('react');

var CardList = React.createClass({
  render: function() {
    return (
      <div className='cardList container-fluid'>
        {this.props.items.map(function(item, i) {
          return (
            <div key={i} className='clickableArea cardBlock container col-md-6' onClick={item.clickHandler}>
              <div className="col-xs-4">
                <img className='cardImage thumbnail' src={item.imageURL} />
              </div>
              <div className='cardDetails col-xs-8'>
                <p className="list-group-item-heading">{item.name}</p>
                <p className="list-group-item-text">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
});

exports.CardList = CardList;
