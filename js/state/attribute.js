var _ = require('underscore');


var Attribute = function(value, previous){
	this.value = value;
	this.previous = previous;
}

_.extend(Attribute.prototype, {
	is: function(value) {
		return this.value === value;
	},
	was: function(value) {
		return this.previous === value;
	}
});

module.exports = Attribute;


//attr.is('paused').was('play'))