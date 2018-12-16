/* Dependencies: 
 *   boid.js
 */

var scene, camera, renderer, debugControls, boids;

document.addEventListener("DOMContentLoaded", function(event) {

	setup();
	animate();

});

function setup() {
	boids = [];
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.z = 700;
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );

	debugControls = new THREE.OrbitControls(camera, renderer.domElement);

	var axesHelper = new THREE.AxesHelper( 5 );
	scene.add( axesHelper );

	document.body.appendChild( renderer.domElement );
	
	for (var i=0; i<200; i++) {
		var b = new Boid();
		boids.push(b);
		scene.add(b.mesh);
	}

}

// TODO(shaw): handle window resize

function draw() {
	// TODO(shaw): update based on a snapshot of boids to avoid update 
	// rippling into itself	for a single frame
	for (var i=0; i<boids.length; i++) {
		boids[i].flock(boids);
		boids[i].update();
	}

	// print FPS
	// fill(255);
	// stroke(0);
	// text("FPS: " + frameRate().toFixed(2), 10, height - 10);
}

function animate() {
	requestAnimationFrame( animate );
	
	draw();

	debugControls.update();
	renderer.render( scene, camera );
}



