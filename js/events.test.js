//dependencies
var _ = require('underscore'),
    Events = require('./events.js');


describe('Test suite for Events.js', function () {
    var TestClass,
        eventInstance,
        testReceiver;

    beforeEach(function () {
        //initialize events
        TestClass = function () {};

        _.extend(TestClass.prototype, Events.prototype, {

        });

        testReceiver = new TestClass();
        eventInstance = new Events();
    });

    it('should not have any callbacks registered on initialization', function () {
        expect(Octo.handlers)
            .toEqual({});
    });

    describe('Test Subscribing to Events', function () {
        beforeEach(function () {
            window.Octo.handlers = {};

        });

        it('should subscribe to an event when calling Global "on"', function () {
            function callback(source, eventName) {
                // console.log(eventName + " received");
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
                // console.log(eventName + " received");
            });

            expect(_.keys(Octo.handlers)
                    .length)
                .toBe(1);
        });

        it('should subscribe to multiple events when space separated', function () {
            var testReceiver = new TestClass();
            var eventInstance = new Events();


            var length = _.keys(Octo.handlers)
                .length;
            eventInstance.on(testReceiver, 'testEventOne testEventTwo', function callback(source, eventName) {
                // console.log(eventName + " received");
            });
            expect(length + 2)
                .toBe(_.keys(Octo.handlers)
                    .length);
        });

        it('should register events object when calling this.listen()', function () {
            testReceiver.events = {
                'listenEvent': function (source, data) {
                    // console.log('Made it into the event callback');
                    expect(data)
                        .toBeTruthy();
                }
            };

            testReceiver.listen();
            testReceiver.trigger('listenEvent', [{
                data: 'success'
            }]);
        });

        afterEach(function () {

        });
    });

    describe('Test Removing Subscriptions', function () {
        beforeEach(function () {
            window.Octo.handlers = {};
            testReceiver.events = {
                'listenEvent': function (source, data) {
                    // console.log('Made it into the event callback');
                    expect(data)
                        .toBeTruthy();
                }
            };

            testReceiver.listen();
        });

        it('should remove all handlers if not passed any params', function () {
            eventInstance.off();
            expect(Octo.handlers)
                .toBe({});
        });

        it('should remove all handlers for an event when passed an event name', function () {

            expect(_.keys(Octo.handlers))
                .toContain('testEvent');
        });

        it('should remove all handlers for a specific object when passed an object', function () {
            expect(1)
                .toBe(2);
        });

        afterEach(function () {

        });
    });

    describe('Test Triggering Events', function () {
        beforeEach(function () {
            window.Octo.handlers = {};

        });

        it('should allow objects to be passed as data when triggering events', function () {
            testReceiver.events = {
                'listenEvent': function (source, data) {
                    expect(typeof data)
                        .toBe('object');

                    // console.log('callbacks are able to receive objects', data);
                }
            };

            testReceiver.listen();
            testReceiver.trigger('listenEvent', {
                data: 'success'
            });
        });

        it('should allow functions to be passed as data when triggering events', function () {
            testReceiver.events = {
                'listenEvent': function (source, data) {
                    expect(typeof data)
                        .toBe('function');
                    data();
                }
            };

            testReceiver.listen();
            testReceiver.trigger('listenEvent', function () {
                // console.log('callbacks are able to receive functions')
            });
        });

        afterEach(function () {

        });
    });

    describe('Test Receiving Events', function () {
        beforeEach(function () {
            window.Octo.handlers = {};

        });

        it('should description', function () {
            expect(1)
                .toBe(2);
        });

        afterEach(function () {

        });
    });

});
