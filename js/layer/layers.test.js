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

        layersInstance.layers = [];
    });

    afterEach(function () {});

    it('should add a layer to the list of layers', function () {
        expect(layersInstance.layers.length)
            .toBe(0);

        layersInstance.addLayer(new Layer());

        expect(layersInstance.layers.length)
            .toBe(1);
    });

    it('should only allow instances of Layer to be added on "addLayer"', function () {
        expect(layersInstance.layers.length)
            .toBe(0);

        layersInstance.addLayer({});

        expect(layersInstance.layers.length)
            .toBe(0);
    });

    it('should return a layer on "getLayer" if it exists', function () {
        layersInstance.addLayer(new Layer({
            label: 'testLayer'
        }));

        var testLayer = layersInstance.getLayer('testLayer');

        expect(testLayer)
            .toBeDefined();
        expect(testLayer instanceof Layer)
            .toBe(true);

    });

    it('should return undefined on "getLayer" if the layer does not exist', function () {
        var testLayer = layersInstance.getLayer('testLayer');


        expect(testLayer instanceof Layer)
            .toBe(false);
        expect(testLayer)
            .not
            .toBeDefined();
    });

    afterEach(function () {

    });
});
