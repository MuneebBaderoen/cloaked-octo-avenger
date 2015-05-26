// var THREE = require('three');
// var _ = require('underscore');
// var Matter = require('matterjs');

//Move all the threejs stuff here.

var MatterjsRenderer = {
    frameCount: 0,
    renderer: undefined,
    rotation: {
        x: 1,
        y: 1
    },
    getRenderer: function() {
        if(this.renderer == void 0) {
            this.renderer = renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
        }
        return this.renderer;
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

        this.getRenderer();
        return renderObject;
    },
    world: function(engine) {
        console.time('ms');
        console.log('inside render loop', this.frameCount++);
        var time = console.timeEnd('ms');
        console.log(time);

        var scene = this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.camera.position.z = 5;

        //_.each(engine.world.bodies, function(physObject) {
        // var bb = physObject.bounds;

        var geometryA = new THREE.BoxGeometry(1, 1, 1);
        var materialA = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });
        var box = new THREE.Mesh(geometryA, materialA);

        scene.add(box);
        //});

        this.rotation.x += 0.05;
        this.rotation.y += 0.05;

        box.rotation.x = this.rotation.x;
        box.rotation.y = this.rotation.y;

        this.renderer.render(this.scene, this.camera);

    },
    clear: function(renderer) {
        console.log('clearing');
    }
};

module.exports = MatterjsRenderer;
