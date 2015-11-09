var OnPitchConstants = require('../common/constants');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _currentUser = null;

function setCurrentUser(data) {
	_currentUser = data;
}

var TempStore = assign(new EventEmitter(), {
 
	getCurrentUser: function() {
		return _currentUser; 
	},
  
	emitChange: function(actionType) {
		this.emit(actionType);
	},

	addChangeListener: function(actionType, callback) {
		this.on(actionType, callback);
	},

	removeChangeListener: function(actionType, callback) {
		this.removeListener(actionType, callback);
	},

	dispatchIndex: AppDispatcher.register(function(payload) {
		var action = payload.action;
		var data = action.data;
	
		switch(action.actionType) {
			case OnPitchConstants.SIGN_IN: {
				setCurrentUser(data);
				TempStore.emitChange(OnPitchConstants.SIGN_IN);
			}
		}
		
		return true;
	})
});

module.exports = TempStore;
