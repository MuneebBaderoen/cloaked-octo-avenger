var _ = require('underscore'),
	Events = ('../events.js');

var State = function(options){
	// this.layer = options.layer;
	this.validation = {};
	this.attributes = {};
	return this;
}

_.extend(State.prototype, Events.prototype, {
	set: function (key, value){
		var previous = this.attributes[key];
		this.attributes[key] = new Attribute(value, previous);
		this.trigger('state:' + key + ' state', this.attributes[key]);
	},
	get: function(key){
		return this.attributes[key];
	}	
});

module.exports = State;