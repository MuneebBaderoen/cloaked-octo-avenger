var matterjsRenderer = require('./renderers/matterjsRenderer.js'),
    THREE = require('three'),
    _ = require('underscore'),
    Matter = require('matterjs'),
    inputManager = require('./input.js'),
    eventsModule = require('./events.js'),
    Events = new eventsModule();

var Engine = function(options, init, update) {
    //attributes declared here, functions declared on Engine prototype
    // this.renderer = undefined;
    // this.currentScene = undefined;
    // this.camera = undefined;
    var defaults = {

    },
    options = options || {};


    this.input = new inputManager({
        engine: this
    });

    this.initialize(options);
}

_.extend(Engine.prototype, eventsModule.prototype, {
    initialize: function(options) {
        this.listen();

        //Matter js world initialization
        this.physEngine = Matter.Engine.create({
            render: {
                controller: matterjsRenderer
            }
        });

        //Use matter js renderer
        //we should be able to see the same interaction
        // this.physEngine = Matter.Engine.create(document.body);
        var boxA = Matter.Bodies.rectangle(200, 300, 80, 80);
        boxA.originalBounds = {
            w:80,
            h:80
        };
        var boxB = Matter.Bodies.rectangle(250, 50, 80, 80);
        boxB.originalBounds = {
            w:80,
            h:80
        };
        var ground = Matter.Bodies.rectangle(300, 450, 850, 50, {
            isStatic: true
        });
        ground.originalBounds = {
            w:850,
            h:50        
        };

        Matter.World.add(this.physEngine.world, [boxA, boxB, ground]);

        // boxA3.position.set(400, 200);
        // boxB3.position.set(450, 50);

        if(options.initialize){
            options.initialize();
        }

        Matter.Engine.run(this.physEngine);

        //need to implement the custom game loop to be able to fire this off at the right spot
        //currently the only place to execute a user specified update callback is in the renderer
        // if(options.update)
        //     options.update();
    }
});

new Engine();
