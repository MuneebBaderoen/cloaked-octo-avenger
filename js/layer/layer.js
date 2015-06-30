var _ = require('underscore'),
    Events = require('../events.js');

var Layer = function (options) {

    var defaults = {
        bounds: undefined,
        position: undefined,
        scene: undefined,
        camera: undefined,
        events: undefined
    }

    this.options = _.extend(defaults, options || {});
    this._initialize();
};

_.extend(Layer.prototype, Events.prototype, {
    label: undefined,
    _initialize: function () {
        this.label = this.options.label;
        this.listen();

        if (this.options.initialize) {
            this.options.initialize();
        }
    },
    _update: function () {
        if (this.options.update) {
            this.options.update();
        }
    },
    _render: function () {
        if (this.options.render) {
            this.options.render();
        }
    }
});

module.exports = Layer;
