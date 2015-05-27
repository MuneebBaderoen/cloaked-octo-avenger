// var THREE = require('three');
// var _ = require('underscore');
// var Matter = require('matterjs');

//Move all the threejs stuff here.

var MatterjsRenderer = {
    frameCount: 0,
    renderer: undefined,
    currentScene: undefined,
    rotation: {
        x: 1,
        y: 1
    },
    position: {
        x: 0,
        y: 0,
        z: 0
    },
    objectMap: {

    },
    initRenderer: function() {
        //Initialize renderer
        if(this.renderer == void 0) {
            this.renderer = renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
        }

        //Initialize scene
        this.scene = new THREE.Scene();

        //Initialize axes
        this.scene.add(this.buildAxes(100));

        //Initialize lighting
        var dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(-30, 50, 40);
        this.scene.add(dirLight);

        //Initialize camera		
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.x = 100;
        this.camera.position.y = 200;
        this.camera.position.z = 300;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    },
    create: function(options) {
        var defaults = {
            controller: MatterjsRenderer,
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

        var renderObject = _.extend(defaults, options);

        renderObject.scene = new THREE.Scene();
        renderObject.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        // //render.canvas = render.renderObject || _createCanvas(render.options.width, render.options.height);
        // //render.context = render.canvas.getContext('2d');
        renderObject.textures = {};

        // render.bounds = render.bounds || { 
        //     min: { 
        //         x: 0,
        //         y: 0
        //     }, 
        //     max: { 
        //         x: render.options.width,
        //         y: render.options.height
        //     }
        // };

        // // if (render.options.pixelRatio !== 1) {
        // //     Render.setPixelRatio(render, render.options.pixelRatio);
        // // }

        // if (_.isElement(render.element)) {
        //     render.element.appendChild(render.canvas);
        // } else {
        //     Common.log('Render.create: options.element was undefined, render.canvas was created but not appended', 'warn');
        // }

        this.initRenderer();

        return renderObject;
    },
    world: function(engine) {
        console.time('ms');
        //console.log('inside render loop', this.frameCount++);
        var objectMap = this.objectMap,
            scene = this.scene,
            camera = this.camera;

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

        this.renderer.render(this.scene, this.camera);
        var time = console.timeEnd('ms');
        console.log(time);
    },
    buildAxes: function(length) {
        var axes = new THREE.Object3D();

        axes.add(this.buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(length, 0, 0), 0xFF0000, false)); // +X
        axes.add(this.buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-length, 0, 0), 0xFF0000, true)); // -X
        axes.add(this.buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, length, 0), 0x00FF00, false)); // +Y
        axes.add(this.buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -length, 0), 0x00FF00, true)); // -Y
        axes.add(this.buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, length), 0x0000FF, false)); // +Z
        axes.add(this.buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -length), 0x0000FF, true)); // -Z

        return axes;

    },
    buildAxis: function(src, dst, colorHex, dashed) {
        var geom = new THREE.Geometry(),
            mat;

        if(dashed) {
            mat = new THREE.LineDashedMaterial({
                linewidth: 3,
                color: colorHex,
                dashSize: 3,
                gapSize: 3
            });
        } else {
            mat = new THREE.LineBasicMaterial({
                linewidth: 3,
                color: colorHex
            });
        }

        geom.vertices.push(src.clone());
        geom.vertices.push(dst.clone());
        geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

        var axis = new THREE.Line(geom, mat, THREE.LinePieces);

        return axis;

    },
    clear: function(renderer) {
        console.log('clearing');
    }
};

module.exports = MatterjsRenderer;
