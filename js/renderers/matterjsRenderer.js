var THREE = require('three'),
    _ = require('underscore'),
    Matter = require('matterjs'),
    renderUtils = require('../renderUtils.js'),
    utils = new renderUtils();

//Move all the threejs stuff here.

var matterjsRenderer = {
    frameCount: 0,
    renderer: undefined,
    currentScene: undefined,
    // rotation: {
    //     x: 1,
    //     y: 1
    // },
    // position: {
    //     x: 0,
    //     y: 0,
    //     z: 0
    // },
    
    create: function(options) {
        var defaults = {
            controller: matterjsRenderer,
            element: null,
            canvas: null,
            options: {
                width: 800,
                height: 600,
                pixelRatio: 1,
                background: '#fafafa',
                wireframeBackground: '#222',
                hasBounds: false,
                enabled: true,
                wireframes: true,
                showSleeping: true,
                showDebug: false,
                showBroadphase: false,
                showBounds: false,
                showVelocity: false,
                showCollisions: false,
                showSeparations: false,
                showAxes: false,
                showPositions: false,
                showAngleIndicator: false,
                showIds: false,
                showShadows: false,
                showVertexNumbers: false,
                showConvexHulls: false,
                showInternalEdges: false
            }
        };

        return this.initRenderer(defaults, options);
    },
    initRenderer: function(defaults, options) {
        //Renderobject we will return to MatterJS, containing everything we will need to render including 
        //ThreeJS scene, camera, etc. 
        //------
        //Want to be able to switch here based on options and return different renderobjects
        var renderObject = _.extend(defaults, options);

        //Initialize renderer
        if(renderObject.renderer == void 0) {
            renderObject.renderer = renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
        }

        //Initialize scene
        renderObject.scene = new THREE.Scene();

        //Initialize axes
        renderObject.scene.add(utils.buildAxes(100));

        //Initialize lighting
        var dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(-30, 50, 40);
        renderObject.scene.add(dirLight);

        //Initialize camera     
        renderObject.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderObject.camera.position.x = 100;
        renderObject.camera.position.y = 200;
        renderObject.camera.position.z = 300;
        renderObject.camera.lookAt(new THREE.Vector3(0, 0, 0));
        renderObject.camera.theta = 0;
        renderObject.camera.phi = 0;

        renderObject.objectMap = {

        };

        return renderObject;
    },
    world: function(engine) {
        //console.time('ms');
        //console.log('inside render loop', this.frameCount++);
        var renderObject = engine.render,
            renderer = renderObject.renderer,
            objectMap = renderObject.objectMap,
            scene = renderObject.scene,
            camera = renderObject.camera;


        _.each(engine.world.bodies, function(physObject) {
            //this assumes that items remain once added. need to handle removing items from the world
            if(!objectMap[physObject.id]) {
                var geometryA = new THREE.BoxGeometry(80, 80, 80);
                //var geometryA = new THREE.BoxGeometry(50, 50, 50);
                var materialA = new THREE.MeshPhongMaterial({
                    color: 0x00ff00
                });
                var box = new THREE.Mesh(geometryA, materialA);
                //flip y axis and rotation, left-hand rule vs right-hand rule of physics engine vs gl renderer
                //offsetting the physics area ( 800x600 ) to put its center at our world origin.
                box.position.set(physObject.position.x - 400, -physObject.position.y + 300, 0);
                box.rotation.z = -physObject.angle;
                scene.add(box);
                objectMap[physObject.id] = box;

            } else {
                //Object was already created in our threeJS scene
                //transform our threejs object
                var box = objectMap[physObject.id];
                box.position.set(physObject.position.x - 400, -physObject.position.y + 300, 0);
                box.rotation.z = -physObject.angle;
            }

        });

        this.rotateCamera(renderObject);
        renderObject.renderer.render(renderObject.scene, renderObject.camera);
        //var time = console.timeEnd('ms');
        //console.log(time);
    },
    clear: function(renderer) {
        console.log('clearing');
    },
    rotateCamera: function(renderObject) {
        var c = renderObject.camera;
        c.zoom = 500;
        c.position.x = c.zoom * Math.sin(c.theta);
        c.position.z = c.zoom * Math.cos(c.theta);
        c.position.y = c.zoom * Math.cos(c.phi);
        c.lookAt(new THREE.Vector3(0, 0, 0));

        // c.theta += 0.1;
        // c.phi += 0.1;
    }
};

module.exports = matterjsRenderer;
