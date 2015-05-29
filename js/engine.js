var matterRenderer = require('./renderers/matterjsRenderer.js');
var THREE = require('three');
var _ = require('underscore');
var Matter = require('matterjs');
var InputManager = require('./input.js')

var Engine = function(init, update) {
    //attributes declared here, functions declared on Engine prototype
    this.renderer = undefined;
    this.currentScene = undefined;
    this.camera = undefined;
    this.input = new InputManager({
        engine: this
    });

    this.initialize(init, update);
}

_.extend(Engine.prototype, {
    initialize: function(initCallback, updateCallback) {
        //Matter js world initialization
        this.physEngine = Matter.Engine.create({
            render: {
                controller: matterRenderer
            }
        });

        //Use matter js renderer
        //we should be able to see the same interaction
        // this.physEngine = Matter.Engine.create(document.body);
        var boxA = Matter.Bodies.rectangle(200, 300, 80, 80);
        var boxB = Matter.Bodies.rectangle(250, 50, 80, 80);
        var ground = Matter.Bodies.rectangle(300, 450, 850, 50, {
            isStatic: true
        });

        Matter.World.add(this.physEngine.world, [boxA, boxB, ground]);

        // boxA3.position.set(400, 200);
        // boxB3.position.set(450, 50);

        Matter.Engine.run(this.physEngine);

        // if(initCallback)
        //     initCallback();
    }
});

new Engine();
