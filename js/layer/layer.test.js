var Layer = require('./layer.js'),
    Events = require('../events.js');

describe('Tests suite for Layer.js', function () {
    var testClass,
        layerInstance,
        eventsInstance,
        callbackCount,
        callbacksExecuted;

    beforeEach(function () {
        eventsInstance = new Events();

        callbackCount = 0;
        callbacksExecuted = [];

        layerInstance = new Layer({
            events: {
                'listenEvent': function (source, data) {
                    callbackCount++;
                    callbacksExecuted.push('listenEvent');
                }
            },
            initialize: function () {
                callbackCount++;
                callbacksExecuted.push('initialize');
            },
            update: function () {
                callbackCount++;
                callbacksExecuted.push('update');
            },
            render: function () {
                callbackCount++;
                callbacksExecuted.push('render');
            }
        });


    });

    afterEach(function () {
        layerInstance.stopListening();
    });


    it('should be listening if any events are specified', function () {
        eventsInstance.trigger('listenEvent', {});
        expect(callbackCount)
            .toBe(2);
    });

    it('should trigger callbacks for events added after init', function () {
        layerInstance.on('testEvent', function () {
            callbackCount++;
            callbacksExecuted.push('testEvent');
        });

        eventsInstance.trigger('testEvent listenEvent', {});

        //will have fired initialize
        expect(callbackCount)
            .toBe(3);
    });

    it('should fire initialize callback if it is specified', function () {
        expect(callbackCount)
            .toBe(1)
        expect(callbacksExecuted)
            .toContain('initialize');
    });

    it('should run normal update if callback is not specified', function () {
        layerInstance = new Layer({});
        layerInstance._update();
        expect(callbackCount)
            .toBe(1)
        expect(callbacksExecuted)
            .not.toContain('update');
    });

    it('should fire update callback if it is specified', function () {
        //will have fired initialize
        layerInstance._update();

        expect(callbackCount)
            .toBe(2)
        expect(callbacksExecuted)
            .toContain('update');
    });

    it('should run normal render if callback is not specified', function () {
        layerInstance = new Layer({});
        layerInstance._render();
        expect(callbackCount)
            .toBe(1)
        expect(callbacksExecuted)
            .not.toContain('render');
    });

    it('should fire render callback if it is specified', function () {
        //will have fired initialize
        layerInstance._render();

        expect(callbackCount)
            .toBe(2)
        expect(callbacksExecuted)
            .toContain('render');
    });

});
