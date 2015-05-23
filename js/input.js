(function() {

    var InputManager = function(options) {
        //default initialization
        this.inputListener = new Hammer(document.getElementsByTagName('body')[0]);

        //options passed in
        //Three.Scene object to check for touch interactions
        this.scene = options.scene
    }

    _.extend(InputManager.prototype, {
        addListener: function(eventName, callback) {
            this.inputListener.on(eventName, callback);
        }
    });

})();
