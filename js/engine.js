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
        this.renderer = this.getRenderer();
        this.currentScene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

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

        //Threejs initialization
        var geometryA = new THREE.BoxGeometry(1, 1, 1);
        var materialA = new THREE.LineBasicMaterial();
        var boxA3 = new THREE.Mesh(geometryA, materialA);

        var geometryB = new THREE.BoxGeometry(1, 1);
        var materialB = new THREE.LineBasicMaterial();
        var boxB3 = new THREE.Mesh(geometryB, materialB);

        boxA3.position.set(400, 200);
        boxB3.position.set(450, 50);

        this.currentScene.add(boxA3);
        this.currentScene.add(boxB3);

        this.camera.position.z = 5;
        Matter.Engine.run(this.physEngine);

        // if(initCallback)
        //     initCallback();

        this.render.call(this);
    },

    update: function() {
        // boxA3.position.set(400,200);
        // boxB3.position.set(450,50);
    },
    getRenderer: function() {
        //if renderer undefined, init it and return it, else return it
        if(this.renderer == void 0) {
            this.renderer = renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
        }
        return this.renderer;
    },
    render: function() {
        requestAnimationFrame(_.bind(this.render, this));
        this.update();
        this.renderer.render(this.currentScene, this.camera);
    }

});

new Engine();
