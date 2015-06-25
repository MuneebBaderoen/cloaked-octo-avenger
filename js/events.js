var _ = require('underscore');

var Events = function(){
	this.handlers = {};
}

_.extend(Events.prototype, {
	//function to be called by all game engine classes that wish to register event handlers
	//event handlers are declared in the attributes of the object returned by the constructor
	/*
	events:{
		'state:global': function(attribute, stateObject){
			if(attribute.was('menu') && attribute.is('game')){
				stateObject.set('game', 'loading');
				this.getLayer('game').initialize();
			}
		}
	}
	*/
	on: function(listeningObject, events, handler){
		_.each(events.split(' '), function(eventName){
			this.handlers[eventName].push({
				object: listeningObject,
				callback: handler
			});
		});	
	},
	trigger: function(events, data){
		_.each(events.split(' '), function(eventName){
			_.each(this.handlers[eventName], function(handler){
				//event callback is to be fired with the original listening object as the context
				//data is an array of arguments to be received from the trigger call
				//e.g. Events.trigger('state:key state', [arg1, arg2, arg3]);
				handler.callback.apply(handler.object, data);
			});
		});
	},
	listen: function(eventsObject){
		var on = this.on,
			events = eventsObject || this.events;

		_.each(_.keys(eventsObject), function(events){
			var callback = eventsObject[events];
			on(events, callback);
		});
	}

});

module.exports = Events;