var matterjsRenderer = require('./render/matterjsRenderer.js'),
    THREE = require('three'),
    _ = require('underscore'),
    Matter = require('matterjs'),
    InputManager = require('./input.js'),
    State = require('./state/state.js'),
    Events = require('./events.js'),
    Layers = require('./layer/layers.js'),
    Layer = require('./layer/layer.js');

var Engine = function (options, init, update) {
    //attributes declared here, functions declared on Engine prototype
    // this.renderer = undefined;
    // this.currentScene = undefined;
    // this.camera = undefined;
    var defaults = {
        //components
        input: (function () {
                return new InputManager({
                    engine: this
                })
            })
            .apply(this),
        events: {
            'testEvent': function (source, data) {
                console.log(source, data);
            }
        },
        renderer: matterjsRenderer,
        state: new State(),
        //callbacks
        onInit: undefined, //function(){},
        onStart: undefined, //function(){},,
        update: undefined //needs a custom game loop to find a home
    };

    this.options = _.extend(defaults, options || {});

    this.initialize();
}

_.extend(Engine.prototype, Events.prototype, Layers.prototype, {
    initialize: function () {
        this.listen();


        //Matter js world initialization
        this.physics = Matter.Engine.create({
            render: {
                controller: this.options.renderer
            }
        });

        //Use matter js renderer
        //we should be able to see the same interaction
        // this.physics = Matter.Engine.create(document.body);
        var boxA = Matter.Bodies.rectangle(200, 300, 80, 80);
        boxA.originalBounds = {
            w: 80,
            h: 80
        };
        var boxB = Matter.Bodies.rectangle(250, 50, 80, 80);
        boxB.originalBounds = {
            w: 80,
            h: 80
        };
        var ground = Matter.Bodies.rectangle(300, 450, 850, 50, {
            isStatic: true
        });
        ground.originalBounds = {
            w: 850,
            h: 50
        };

        Matter.World.add(this.physics.world, [boxA, boxB, ground]);

        if (this.options.onInit) {
            this.options.onInit();
        }

        //need to implement the custom game loop to be able to fire this off at the right spot
        //currently the only place to execute a user specified update callback is in the renderer
        // if(this.options.update)
        //     this.options.update();
    },
    start: function (onStart) {
        Matter.Engine.run(this.physics);
        //this.trigger('testEvent', ['testData']);
    },
    getCamera: function () {
        return this.physics.render.camera;
    },
    setState: function (key, value) {
        this.state.set(key, value);
    },
    getState: function (key) {
        if (key)
            return this.options.state.get(key);
        else
            return this.state;
    }

});

Engine.Layer = Layer;

module.exports = Engine;
