var _ = require('underscore'),
    Attribute = require('./attribute.js'),
    State = require('./state.js'),
    stateInstance,
    testClass;

describe('Test suite for State.js', function () {
    beforeEach(function () {
        stateInstance = new State();

        testClass = function () {

        };

        _.extend(testClass.prototype, State.prototype, {

        });

    });

    it('should add an attribute on "set"', function () {
        stateInstance.set('testKey', 'testValue');
        expect(_.keys(stateInstance.attributes)
                .length)
            .toBe(1);
        expect(_.keys(stateInstance.attributes))
            .toContain('testKey');
    });

    it('should update an attribute if the key exists already', function () {
        stateInstance.set('testKey', 'initialValue');
        stateInstance.set('testKey', 'testValue');

        expect(_.keys(stateInstance.attributes)
                .length)
            .toBe(1);
        expect(_.keys(stateInstance.attributes))
            .toContain('testKey');
    });

    it('should have a previous value on the attribute when updating', function () {
        stateInstance.set('testKey', 'initialValue');
        stateInstance.set('testKey', 'testValue');

        expect(_.keys(stateInstance.attributes)
                .length)
            .toBe(1);
        expect(_.keys(stateInstance.attributes))
            .toContain('testKey');

        expect(stateInstance.attributes['testKey'].previous)
            .toBeDefined();
    });

    it('should return an Attribute on "get"', function () {
        stateInstance.set('testKey', 'testValue');
        var attr = stateInstance.get('testKey');

        expect(attr instanceof Attribute)
            .toBe(true);
    });

    afterEach(function () {

    });
});
