var _ = require('underscore');
	//Events = require('./events.js');

var Layers = function(){};

_.extend(Layers.prototype, {
	layers: [],
	addLayer: function(layer){
		this.layers.push(layer);
	},
	getLayer: function(layerLabel){
		return _.where(this.layers, {label: layerLabel});
	},
	removeLayer: function(layerLabel){
		//body	
	},
	orderLayers: function(newOrder){
		var temp = [];
		_.each(newOrder, function(index) {
			if(typeof index === 'number'){
				temp.push(this.layers[index]);
			}

			if(typeof index === 'string'){
				temp.push(_.where(this.layers, {
					label: index
				}));
			}
		});
	},
	updateLayers: function(){
		_.each(this.layers, function(layer){
			_.result(layer._update());
		})
	}
});

module.exports = Layers;