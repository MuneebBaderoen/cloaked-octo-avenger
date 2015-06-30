var Attribute = require('./attribute.js'),
    attributeInstance,
    testClass;

describe('Test suite for Attribute.js', function () {
    beforeEach(function () {
        attributeInstance = new Attribute();
    });

    it('should have a value after calling "set"', function () {
        attributeInstance.set('testValue');
        expect(attributeInstance.value)
            .toBeDefined();
    });

    it('should return bool - if value "is" current value', function () {
        attributeInstance.set('testValue');
        expect(attributeInstance.value)
            .toBeDefined();
        expect(attributeInstance.is('testValue'))
            .toBe(true);
        expect(attributeInstance.is('somethingElse'))
            .toBe(false);
    });

    it('should set the previous value if value is overwritten', function () {
        attributeInstance.set('testValue');
        attributeInstance.set('testValue2');

        expect(attributeInstance.previous)
            .toBeDefined();
        expect(attributeInstance.previous)
            .toBe('testValue');
        expect(attributeInstance.value)
            .toBe('testValue2');
    });

    it('should return bool - if value "was" previous value', function () {
        attributeInstance.set('previousValue');
        attributeInstance.set('currentValue');

        expect(attributeInstance.was('previousValue'))
            .toBe(true);
        expect(attributeInstance.was('somethingElse'))
            .toBe(false);
    });

    it('should return current value on "get"', function () {
        attributeInstance.set('testValue');
        expect(attributeInstance.get())
            .toBe('testValue');
    });


});
