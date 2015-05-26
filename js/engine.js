var matterRenderer = require('./renderers/matterjsRenderer.js');
var THREE = require('three');
var _ = require('underscore');
var Matter = require('matterjs');

var Engine = function(init, update) {
    //attributes declared here, functions declared on Engine prototype
    this.renderer = undefined;
    this.currentScene = undefined;
    this.camera = undefined;
    this.input = undefined;

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
        var boxA = Matter.Bodies.rectangle(400, 200, 80, 80);
        var boxB = Matter.Bodies.rectangle(450, 50, 80, 80);
        var ground = Matter.Bodies.rectangle(400, 610, 810, 60, {
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
