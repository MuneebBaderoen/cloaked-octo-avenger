var _ = require('underscore');

var State = function(options){
	// this.layer = options.layer;
	this.validation = {};
	this.attributes = {};
	return this;
}

_.extend(State.prototype, {
	set: function (key, value){
		var previous = this.attributes[key];
		this.attributes[key] = new Attribute(value);
		//events.trigger(statechanged, {attribute: key, previous: previous, current: value});
	},
	get: function(key){
		return this.attributes[key];
	}	
});

module.exports = State;