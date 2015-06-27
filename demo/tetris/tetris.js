var OctoEngine = require('../../js/engine.js');


var Tetris = new OctoEngine({
	type: '2D',
	collision: 'bounds', //pixel || bounds
	bounds: 'axis', //axis-aligned 
	view: 'orthographic', // isometric || orthographic
	events:{
		'state:global': function(source, attribute){
			if(attribute.was('menu') && attribute.is('game')){
				stateObject.set('game', 'loading');
				this.getLayer('game').initialize();
			}
		},
		'state:game': function(source, attribute){
			if(attribute.was('play') && attribute.is('pause')){
				this.getLayer('HUD').showPauseMenu();
			}
		},
		'touch:panup touch:pandown': function(source, touchEvent){
			this.getCamera().phi += touchEvent.velocityY / 10;
		},
		'touch:panleft touch:panright': function(source, touchEvent){
			this.getCamera().theta += touchEvent.velocityX / 10;
		}
	},
	initialize: function(){
		//declare all those states and their initial values here.
		//add validation to the state object to ensure that it can only be one of the predefined values
	}
})

Tetris.addLayer(new OctoEngine.Layer({
	label: 'bg',
	sprite: 'images/background.png',
	initialize: function(){
		//should be able to specify shaders here, specify where in the pipeline they occur.
		//give the developer control over certain aspects of the pipeline
		//give the ability to add steps into the pipeline
		console.log('Initializing bg');

	},
	update: function(){
		
	},
	//preprocess
	render: function(){

	}
}));

Tetris.addLayer(new OctoEngine.Layer({
	label:'hud',
	sprite: 'images/background.png',
	initialize: function(){
		//should be able to specify shaders here, specify where in the pipeline they occur.
		//give the developer control over certain aspects of the pipeline
		//give the ability to add steps into the pipeline
		//load textures here
		console.log('Initializing HUD');
	},
	events:{
		statechanged: function(attribute, currentState, previousState){

		}
	},
	update: function(){
		if(Tetris.getState('game') != 'pause'){

		}
	},
	//preprocess
	render: function(){

	}
}));

Tetris.addLayer( new OctoEngine.Layer({
	label: 'game',
	index: 0,
	bounds: {},
	sprite: 'images/background.png',
	events:{
		'state:game': function(attribute, stateObject){
			if(attribute.is('loading')){
				this.update = loadingUpdate;
			}
		}
	},
	initialize: function(){
		//should be able to specify shaders here, specify where in the pipeline they occur.
		//give the developer control over certain aspects of the pipeline
		//give the ability to add steps into the pipeline
		console.log('Initializing game layer');

	},
	loadingUpdate: function(){
		
	},
	render: function(){

	}
}));


//takes array of indices of the current layers (excluding background - and potentially HUD)
//layers are composited in that order. left most layer in array is top
Tetris.orderLayers(['blocks']) 

module.exports = Tetris;