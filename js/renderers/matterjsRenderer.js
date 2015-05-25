// var THREE = require('three');
// var _ = require('underscore');
// var Matter = require('matterjs');

//Move all the threejs stuff here.

var MatterjsRenderer = {
	frameCount: 0,
	create: function(){
		return {
			controller: MatterjsRenderer
		}
	},
	world: function(engine){
		console.time('ms');
		console.log('inside render loop', this.frameCount++);
		var time = console.timeEnd('ms');
		console.log(time);
	},
	clear: function(renderer){
		console.log('clearing');
	}
};

module.exports = MatterjsRenderer;