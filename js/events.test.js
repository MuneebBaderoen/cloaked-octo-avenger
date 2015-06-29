//dependencies
var _ = require('underscore'),
    Events = require('./events.js');


describe('Test suite for Events.js', function () {
    var TestClass,
        EventInstance,
        testReceiver;

    beforeEach(function () {
        //initialize events
        TestClass = function () {};

        _.extend(TestClass.prototype, Events.prototype, {

        });

        testReceiver = new TestClass();
        eventInstance = new Events();

        window.Octo.handlers = {};
    });

    it('should not have any callbacks registered on initialization', function () {
        expect(Octo.handlers)
            .toEqual({});
    });

    it('should subscribe to an event when calling Global "on"', function () {
        function callback(source, eventName) {
            console.log(eventName + " received");
        }

        eventInstance.on(testReceiver, 'testEvent', callback);

        expect(Octo.handlers)
            .not.toEqual({});
        expect(Octo.handlers)
            .toEqual({
                'testEvent': [{
                    obj: testReceiver,
                    callback: callback
                }]
            });
    });

    it('should subscribe to an event when calling "on" via extended prototype', function () {
        var testReceiver = new TestClass();
        testReceiver.on(testReceiver, 'testEvent', function callback(source, eventName) {
            console.log(eventName + " received");
        });

        expect(Octo.handlers)
    });

    it('should subscribe to multiple events when space separated', function () {
        var testReceiver = new TestClass();
        var eventInstance = new Events();


        var length = _.keys(Octo.handlers)
            .length;
        eventInstance.on(testReceiver, 'testEventOne testEventTwo', function callback(source, eventName) {
            console.log(eventName + " received");
        });
        expect(length + 2)
            .toBe(_.keys(Octo.handlers)
                .length);
    });

    it('should register events object when calling this.listen()', function () {
        testReceiver.events = {
            'listenEvent': function (source, data) {
                console.log('Made it into the event callback');
                expect(data)
                    .toBeTruthy();
            }
        };

        testReceiver.listen();
        testReceiver.trigger('listenEvent', [{
            data: 'success'
        }]);
    });

    it('should clear all handlers if not passed any params', function () {
        expect(1)
            .toBe(2);
    });

    it('should remove all handlers for an event when passed an event name', function () {
        expect(1)
            .toBe(2);
    });

    it('should remove all handlers for a specific object when passed an object', function () {
        expect(1)
            .toBe(2);
    });

});
