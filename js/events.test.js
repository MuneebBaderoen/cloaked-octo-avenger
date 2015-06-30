//dependencies
var _ = require('underscore'),
    Events = require('./events.js');


describe('Test suite for Events.js', function () {
    var TestClass,
        eventsInstance,
        testReceiver;

    beforeEach(function () {
        //initialize events
        TestClass = function () {};

        _.extend(TestClass.prototype, Events.prototype, {

        });

        testReceiver = new TestClass();
        eventsInstance = new Events();
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

            testReceiver.on('testEvent', callback);

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
            testReceiver.on('testEvent', function callback(source, eventName) {
                // console.log(eventName + " received");
            });

            expect(_.keys(Octo.handlers)
                    .length)
                .toBe(1);
        });

        it('should subscribe to multiple events when space separated', function () {
            var testReceiver = new TestClass();
            var eventsInstance = new Events();


            var length = _.keys(Octo.handlers)
                .length;
            testReceiver.on('testEventOne testEventTwo', function callback(source, eventName) {
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
            expect(_.keys(Octo.handlers)
                    .length)
                .toBe(1);
        });
    });

    describe('Test Removing Subscriptions', function () {


        var callbackCount,
            callbacksExecuted;

        beforeEach(function () {
            window.Octo.handlers = {};
            testReceiver.events = {
                'listenEvent': function (source, data) {
                    callbackCount++;
                    callbacksExecuted.push('listenEvent')
                },
                'otherEvent': function (source, data) {
                    callbackCount++;
                    callbacksExecuted.push('otherEvent')
                },
                'anotherEvent': function (source, data) {
                    callbackCount++;
                    callbacksExecuted.push('anotherEvent')
                }
            };

            testReceiver.listen();

            anotherReceiver = new TestClass();
            anotherReceiver.events = {
                'anotherEvent': function (source, data) {
                    callbackCount++;
                    callbacksExecuted.push('anotherEvent')
                }
            }
            anotherReceiver.listen();

            callbackCount = 0;
            callbacksExecuted = [];
        });

        it('should remove all handlers if global "off" is not passed any params ', function () {
            eventsInstance.off();
            expect(Octo.handlers)
                .toEqual({});
        });

        it('should remove all objects for a listeningObject if "off" called with no params via extended prototype', function () {
            expect(_.keys(Octo.handlers))
                .toContain('listenEvent');
            expect(_.keys(Octo.handlers))
                .toContain('otherEvent');
            expect(_.keys(Octo.handlers))
                .toContain('anotherEvent');
            expect(_.keys(Octo.handlers)
                    .length)
                .toBe(3);

            testReceiver.off();

            expect(_.keys(Octo.handlers))
                .toContain('anotherEvent');
            expect(_.keys(Octo.handlers)
                    .length)
                .toBe(1);
        });

        it('should remove all handlers for an event when passed an event name', function () {
            expect(Octo.handlers['anotherEvent'].length)
                .toBe(2);

            testReceiver.stopListening('anotherEvent');

            expect(Octo.handlers['anotherEvent'].length)
                .toBe(1);
        });

        it('should remove all handlers for an event when passed multiple space separated event names', function () {
            expect(_.keys(Octo.handlers))
                .toContain('anotherEvent');

            expect(Octo.handlers['anotherEvent'].length)
                .toBe(2);

            testReceiver.stopListening('otherEvent listenEvent');

            expect(Octo.handlers['anotherEvent'].length)
                .toBe(2);
            expect(_.keys(Octo.handlers)
                    .length)
                .toBe(1);

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
    });

    describe('Test Receiving Events', function () {
        var callbackCount,
            callbacksExecuted;

        beforeEach(function () {
            window.Octo.handlers = {};
            testReceiver.events = {
                'listenEvent': function (source, data) {
                    callbackCount++;
                    callbacksExecuted.push('listenEvent')
                },
                'otherEvent': function (source, data) {
                    callbackCount++;
                    callbacksExecuted.push('otherEvent')
                },
                'anotherEvent': function (source, data) {
                    callbackCount++;
                    callbacksExecuted.push('anotherEvent')
                }
            };

            testReceiver.listen();

            callbackCount = 0;
            callbacksExecuted = [];
        });

        it('should execute a callback if an object subscribed', function () {
            testReceiver.trigger('listenEvent', {});
            expect(callbacksExecuted)
                .toContain('listenEvent');
            expect(callbackCount)
                .toBe(1);
        });

        it('should fire all callbacks if multiple events are triggered', function () {
            testReceiver.trigger('listenEvent anotherEvent', {});

            expect(callbacksExecuted)
                .toContain('listenEvent');
            expect(callbacksExecuted)
                .toContain('anotherEvent');
            expect(callbackCount)
                .toBe(2);
        });
    });

});
