var _ = require('underscore');
	//Events = require('./events.js');

var Layers = function(){};

_.extend(Layers.prototype, {
	layers: [],
	addLayer: function(layer){
		//body
	},
	getLayer: function(layerLabel){
		//body
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
});

module.exports = Layers;