var THREE = require('three'),
    _ = require('underscore'),
    Matter = require('matterjs'),
    renderUtils = require('./renderUtils.js'),
    utils = new renderUtils();

//Move all the threejs stuff here.

var matterjsRenderer = {
    frameCount: 0,
    create: function(options) {
        var defaults = {
            controller: matterjsRenderer,
            element: null,
            canvas: null,
            options: {
                //width: 300,
                //height: 600,
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
            renderObject.renderer = renderer = new THREE.WebGLRenderer({
                antialias:true
            });
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

        //Sprite test
        var shrewTex = new THREE.ImageUtils.loadTexture('shrew.png');
        var shrewMaterial = new THREE.SpriteMaterial({
            map: shrewTex,
            useScreenCoordinates: true
        });
        var shrewSprite = new THREE.Sprite(shrewMaterial);
        shrewSprite.position.set(50,50, 0);
        shrewSprite.scale.set(100,100,1);

        renderObject.scene.add(shrewSprite);

        //Initialize camera     
        renderObject.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
        // renderObject.camera = new THREE.OrthographicCamera(400, -400, 300, -300, 0.1, 10000);
        renderObject.camera.position.x = 0;
        renderObject.camera.position.y = 0;
        renderObject.camera.position.z = 4;
        renderObject.camera.lookAt(new THREE.Vector3(0, 0, 0));
        renderObject.camera.theta = 0;
        renderObject.camera.phi = 0;

        renderObject.objectMap = {};

        renderObject.spriteMap = {};

        return renderObject;
    },
    world: function(engine) {
        //console.time('ms');
        //console.log('inside render loop', this.frameCount++);
        var renderObject = engine.render,
            renderer = renderObject.renderer,
            objectMap = renderObject.objectMap,
            scene = renderObject.scene,
            camera = renderObject.camera,
            bodies = Matter.Composite.allBodies(engine.world),
            prepareBody = this.prepareBody;


        //TODO: relocate to update function passed into engine
        //TODO: write custom gameloop function
        // this.rotateCamera(renderObject);

        //frustum culling goes here (if perspective camera)
        //rectangle bounds culling goes here (if orthographic cam)

        //one day occlusion culling will go here

        //render step
        _.each(bodies, function(physObject) {
            prepareBody(physObject, renderObject);
        });


        renderObject.renderer.render(renderObject.scene, renderObject.camera);
        //var time = console.timeEnd('ms');
        //console.log(time);
    },
    clear: function(renderer) {
        console.log('clearing');
    },
    //Prepare functions
    //Since the rendering isnt actually handled here, and is offloaded to the ThreeJS rendering of the scene, all we're doing
    //is ensuring that the data from the physics engine is correctly mapped across to the representation we have in the ThreeJS
    //scene
    prepareBody: function(physObject, renderObject){
        var objectMap = renderObject.objectMap,
            scene = renderObject.scene,
            box;

        //if theres nothing to draw, skip
        // if(!physObject.visible){
        //     return;
        // }
 
        
        //this assumes that items remain once added. need to handle removing items from the world
        if(!objectMap[physObject.id]) {
            var geometryA = new THREE.BoxGeometry(physObject.originalBounds.w, physObject.originalBounds.h, 80);
            var materialA = new THREE.MeshPhongMaterial({
                color: 0x00ff00
            });
            box = new THREE.Mesh(geometryA, materialA);
            scene.add(box);
            objectMap[physObject.id] = box;
        } 

        //Object was already created in our threeJS scene
        //flip y axis and rotation, left-hand rule vs right-hand rule of physics engine vs gl renderer
        if(!box){
            box = objectMap[physObject.id];            
        }
        box.position.set(physObject.position.x, -physObject.position.y, 0);
        box.rotation.z = -physObject.angle;
        return box;
    },
    prepareComposite: function(physObject, objectMap){

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
