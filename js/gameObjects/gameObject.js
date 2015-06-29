var _ = require('underscore');
//Events = require('./events.js');

var GameObject = function (options) {
    var options = options || {};


};

_.extend(GameObject.prototype, {
    sprite: undefined,
    position: {
        x: 0,
        y: 0
    },
    bounds: {
        w: 0,
        h: 0
    },
    rotation: {
        theta: 0,
        phi: 0
    },
    setBounds: function (width, height) {
        this.bounds = {
            w: width,
            h: height
        };
        return this;
    },
    setPosition: function (posX, posY) {
        this.position = {
            x: posX,
            y: posY
        };
        return this;
    },
    setSprite: function (sprite) {
        // sprite = sprite instanceof Sprite ? sprite : undefined;
        this.sprite = sprite ? sprite : undefined;
        return this;
    },
    setRotation: function (theta, phi) {
        //clamp rotations
        this.rotation = {
            theta: theta % (2 * Math.PI),
            phi: phi % Math.PI
        };
        return this;
    }
});

module.exports = GameObject;
