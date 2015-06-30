var _ = require('underscore'),
    Events = require('../events.js'),
    Attribute = require('./attribute.js');

var State = function (options) {
    // this.layer = options.layer;
    this.validation = {};
    this.attributes = {};
}

_.extend(State.prototype, Events.prototype, {
    set: function (key, value) {
        var attr = this.attributes[key];

        if (attr) {
            attr.set(value);
        } else {
            this.attributes[key] = new Attribute(value);
        }

        this.trigger('state:' + key + ' state', this.attributes[key]);
    },
    get: function (key) {
        return this.attributes[key];
    }
});

module.exports = State;
