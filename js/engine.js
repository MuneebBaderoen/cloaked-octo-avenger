(function() {
    window.Engine = function(init) {
        //attributes declared here, functions declared on Engine prototype
        this.renderer = undefined;
        this.currentScene = undefined;
        this.camera = undefined;

        this.initialize(init);
    }

    _.extend(window.Engine.prototype, {
        initialize: function(callback) {
            this.renderer = this.getRenderer();
            this.currentScene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            //callback();
            //callback start
            var geometry = new THREE.BoxGeometry(1, 1, 1);
            var material = new THREE.LineBasicMaterial();
            this.cube = cube = new THREE.Mesh(geometry, material);
            var box = new THREE.BoxHelper(cube);

            this.currentScene.add(cube);
            this.currentScene.add(box);
            this.camera.position.z = 5;

            //callback end
            this.render.call(this);
        },
        update: function() {
            this.cube.rotation.x += 0.01;
            this.cube.rotation.y += 0.01;
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
})();
