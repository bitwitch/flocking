/* Dependencies: 
 *   boid.js
 */

var scene, camera, renderer, boids, debugControls, stats;

document.addEventListener("DOMContentLoaded", function(event) {

	setup();
	animate();

});

function setup() {
	boids = [];
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.z = 585;
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );

	document.body.appendChild( renderer.domElement );
	
	for (var i=0; i<500; i++) {
		var b = new Boid();
		boids.push(b);
		scene.add(b.mesh);
	}
	

	debugControls = new THREE.OrbitControls(camera, renderer.domElement);

	stats = new Stats();
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild( stats.dom );

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

	stats.begin();

	draw();
	debugControls.update();
	renderer.render( scene, camera );

	stats.end();
}



