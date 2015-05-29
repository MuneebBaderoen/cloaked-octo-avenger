var Hammer = require('hammerjs');

var InputManager = function(options) {
    options = options || {};
    this.engine = options.engine;
    //default initialization
    this.inputListener = new Hammer(document.getElementsByTagName('body')[0]);

    //options passed in
    //Three.Scene object to check for touch interactions
    this.scene = options.scene || {};

    this.inputListener.on('swipe', _.bind(function(ev) {
        console.log('swipe fired', ev);
    }, this));

    this.inputListener.on('panup pandown', _.bind(function(ev) {
        console.log('panup fired', ev);
        this.engine.physEngine.render.controller.camera.phi += ev.velocityY / 10;
    }, this));

    this.inputListener.on('panleft panright', _.bind(function(ev) {
        console.log('panup fired', ev);
        this.engine.physEngine.render.controller.camera.theta += ev.velocityX / 10;
    }, this));
}

_.extend(InputManager.prototype, {
    addListener: function(eventName, callback) {
        //this.trigger('OctoInputEvent', {});
        this.inputListener.on(eventName, callback);
    }
});

module.exports = InputManager;
