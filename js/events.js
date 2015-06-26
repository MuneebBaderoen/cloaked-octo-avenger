var _ = require('underscore');

var Events = function(){};

//Need to find a better way to store these and dispatch these events.
//Not sure how to use browser dispatch event and how I subscribe to the event.
//I'm guessing i can still use this class as a wrapper for the subscription and dispatching 
//and then still keep the events object in the other classes e.g. Engine, Layer, etc.
//www.sitepoint.com/javascript-custom-events/
window.Octo = window.Octo || {};
window.Octo.handlers = window.Octo.handlers || {};

_.extend(Events.prototype, {
	//handlers: {},
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
		// var self = this;

		if(arguments.length<3){
			console.error('missing parameters. Function requires (listeningObject, eventNames, handler)');
		}

		_.each(events.split(' '), function(eventName){
			//create the key if it doesnt exist
			if(!Octo.handlers[eventName]){
				Octo.handlers[eventName] = [];
			}

			//append the new callback
			Octo.handlers[eventName].push({
				obj: listeningObject,
				callback: handler
			});
		});	
	},
	trigger: function(events, data){
		//if the trigger call is made from an object, and not from the 'static' Events class,
		//then the source will be appended as the first element	
		data.unshift(this);

		_.each(events.split(' '), function(eventName){
			_.each(Octo.handlers[eventName], function(handler){
				//event callback is to be fired with the original listening object as the context
				//data is an array of arguments to be received from the trigger call
				//e.g. Events.trigger('state:key state', [arg1, arg2, arg3]);
				handler.callback.apply(handler.obj, data);
			});
		});

		//for later
		//something like this
		/*
		var event = document.createEvent();
		event.data(data)
		event.dispatchEvent();

		//-----
		listen for changes and execute registered handler, might be async where
		my implementation is definitely sychronous
		*/
	},
	listen: function(eventsObject){
		var self = this, 
			on = self.on,
			eventsObject = eventsObject || self.events;

		_.each(_.keys(eventsObject), function(events){
			var callback = eventsObject[events];
			on(self, events, callback);
		});
	}

});

module.exports = Events;