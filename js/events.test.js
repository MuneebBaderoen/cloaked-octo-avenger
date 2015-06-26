//dependencies
var _ = require('underscore'),	
	Events = require('./events.js'),
	TestClass;

describe('testing events receiver', function(){
	beforeEach(function(){
		//initialize events
		TestClass = function(){};

		_.extend(TestClass.prototype, Events.prototype, {

		});

	});

	it('should subscribe to an event when calling Global "on"', function(){
		var testReceiver = new TestClass();
		Events.on(testReceiver, 'testEvent', function callback(source, eventName){
			console.log(eventName+" received");
		});

		expect(Events.handlers).not.toBe({});
		expect(Events.handlers).toBe({
			'testEvent':callback
		});
	});

	it('should subscribe to an event when calling "on" via extended prototype', function(){
		var testReceiver = new TestClass();
		testReceiver.on(testReceiver, 'testEvent', function callback(source, eventName){
			console.log(eventName+" received");
		});

		expect(Events.handlers)
	});

	it('should subscribe to multiple events when space separated', function(){
		var testReceiver = new TestClass();
		Events.on(testReceiver, 'testEventOne testEventTwo', function callback(source, eventName){
			console.log(eventName+" received");
		});
	});

	it('should register events object when calling this.listen()', function(){
		expect(1).toBe(2);
		// var testReceiver = new TestClass();
		// Events.on(testReceiver, 'testEventOne testEventTwo', function callback(source, eventName){
		// 	console.log(eventName+" received");
		// });
	});

});