var _ = require('underscore');


var Attribute = function (value, previous) {
    this.value = value;
    this.previous = previous;
}

_.extend(Attribute.prototype, {
    is: function (value) {
        return this.value === value;
    },
    was: function (value) {
        return this.previous === value;
    },
    set: function (value) {
        if (this.value) {
            this.previous = this.value;
        }

        this.value = value;
    },
    get: function () {
        return this.value;
    }
});

module.exports = Attribute;
