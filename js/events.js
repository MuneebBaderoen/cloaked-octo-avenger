var _ = require('underscore'),
    Hammer = require('hammerjs');

var Events = function () {};

//Need to find a better way to store these and dispatch these events.
//Not sure how to use browser dispatch event and how I subscribe to the event.
//I'm guessing i can still use this class as a wrapper for the subscription and dispatching 
//and then still keep the events object in the other classes e.g. Engine, Layer, etc.
//www.sitepoint.com/javascript-custom-events/
window.Octo = window.Octo || {};
window.Octo.handlers = window.Octo.handlers || {};

_.extend(Events.prototype, {
    inputListener: new Hammer(document.getElementsByTagName('body')[0]),
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
    on: function (events, handler) {
        var self = this;

        if (arguments.length < 2) {
            console.error('missing parameters. Function requires (eventNames, handler)');
            return;
        }

        _.each(events.split(' '), function (eventName) {
            //create the key if it doesnt exist
            if (!Octo.handlers[eventName]) {
                Octo.handlers[eventName] = [];
            }

            //if touch listener
            //will evaluate to false if there are no matches (returns null)
            if (eventName.match('touch')) {
                self.inputListener.on(eventName.split(':')[1], function (touchEvent) {
                    self.trigger(eventName, [touchEvent]);
                })
            }

            //append the new callback
            Octo.handlers[eventName].push({
                obj: self,
                callback: handler
            });
        });
    },
    off: function (events) {
        var self = this;

        //allow for events to be specified on its own
        if (_.isUndefined(events) && this instanceof Events) {
            //remove all handlers if off is called without params on an instance of Events
            //and not via extending the prototype
            Octo.handlers = {};
            return;
        }

        //handler arrays matching the event name
        var matchingHandlers = events ? _.pick(Octo.handlers, events.split(' ')) : Octo.handlers;

        //remove all handlers for that object
        _.each(matchingHandlers, function (eventHandlerArray, key) {
            //subtract the handler objects from the array which have the calling object as their listening object
            var diff = _.difference(eventHandlerArray, _.where(eventHandlerArray, {
                obj: self
            }));

            //if there are no more objects listening for this event, delete the key
            if (_.isEmpty(diff)) {
                delete Octo.handlers[key]
            } else {
                Octo.handlers[key] = diff;
            }
        });
    },
    trigger: function (events, data) {
        //if the trigger call is made from an object, and not from the 'static' Events class,
        //then the source will be appended as the first element 
        if (!_.isArray(data)) {
            data = [data];
        }
        data.unshift(this);

        _.each(events.split(' '), function (eventName) {
            _.each(Octo.handlers[eventName], function (handler) {
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
    listen: function (eventsObject) {
        var self = this,
            eventsObject = eventsObject || self.events || self.options.events;

        _.each(_.keys(eventsObject), function (events) {
            var callback = eventsObject[events];
            self.on.call(self, events, callback);
        });
    },
    stopListening: function (events) {
        //alias to make usage more readable
        //listen(), stopListening() vs listen(), off()
        //since listen will call 'on' without user knowledge
        this.off(events);
    }

});

module.exports = Events;
