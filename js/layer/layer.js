var _ = require('underscore'),
	Events = require('../events.js'),
	Layers = require('./layers.js');

var Layer = function(label, options){
	if(typeof label !== 'string'){
		console.warn('label must be a string');
	}

	var defaults = {
		bounds: undefined,
		position: undefined,
		scene: undefined,
		camera: undefined,
		events: undefined
	}

	this.options = _.extend(defaults, options || {});
	this._initialize();
};

_.extend(Layer.prototype, Layers.prototype, {
	_initialize: function() {
		if(this.options.initialize){
			this.options.initialize();
		}
	},
	_update: function() {
		if(this.options.update){
			this.options.update();
		}
	},
	_render: function() {
		if(this.options.render){
			this.options.render();
		}
	}
});

module.exports = Layer;