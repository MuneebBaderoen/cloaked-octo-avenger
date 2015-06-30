var Layer = require('./layer.js'),
    Events = require('../events.js');

describe('Tests suite for Layer.js', function () {
    var testClass,
        layerInstance,
        eventsInstance,
        callbackCount,
        callbacksExecuted;

    beforeEach(function () {
        layerInstance = new Layer({
            events: {
                'listenEvent': function (source, data) {
                    callbackCount++;
                    callbacksExecuted.push('listenEvent');
                }
            }
        });

        eventsInstance = new Events();

        callbackCount = 0;
        callbacksExecuted = [];
    });

    afterEach(function () {
        layerInstance.stopListening();
    });


    it('should be listening if any events are specified', function () {
        eventsInstance.trigger('listenEvent', {});
        expect(callbackCount)
            .toBe(1);
    });

    it('should trigger callbacks for events added after init', function () {
        layerInstance.on('testEvent', function () {
            callbackCount++;
            callbacksExecuted.push('testEvent');
        });

        eventsInstance.trigger('testEvent listenEvent', {});

        expect(callbackCount)
            .toBe(2);
    });


});
