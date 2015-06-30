var _ = require('underscore'),
    Layer = require('./layer.js'),
    Layers = require('./layers.js');

describe('Test suite for layer manager', function () {
    var layersInstance,
        testClass;

    beforeEach(function () {
        layersInstance = new Layers();

        testClass = function () {

        }

        _.extend(testClass.prototype, Layers.prototype, {

        });
    });

    it('should add a layer to the list of layers', function () {
        expect(layersInstance.layers.length)
            .toBe(0);

        layersInstance.addLayer(new Layer());

        expect(layersInstance.layers.length)
            .toBe(1);
    });

    afterEach(function () {

    });
});
