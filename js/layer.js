var _ = require('underscore'),
	Events = require('./events.js');

var Layer = function(){
	var defaults = {
		bounds: undefined,
		position: undefined,
		sprite: undefined,
		events: undefined,
	}
};

_.extend(Layer.prototype, {
	initialize: function() {

	},
	update: function() {

	},
	render: function() {

	}
});

module.exports = Layer;