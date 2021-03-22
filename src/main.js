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
	var aspect = window.innerWidth / window.innerHeight;
	var cameraOffsetZ = 585; 
    
	camera = new THREE.PerspectiveCamera(
		75,         // fov                                   
		aspect,     // aspect ratio 
		0.1,        // near 
		1000        // far 
	);
	 
	camera.position.z = cameraOffsetZ;	

	// map world units to screen units so the plane that the boids 
	// live on is always fullscreen
	var vFOV = camera.fov * Math.PI / 180;
  var planeHeight = 2 * Math.tan(vFOV / 2) * cameraOffsetZ;
	var planeWidth  = planeHeight * aspect;

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );

	document.body.appendChild( renderer.domElement );
	
	for (var i=0; i<500; i++) {
		var b = new Boid(planeWidth, planeHeight);
		boids.push(b);
		scene.add(b.mesh);
	}
	
	// debugControls = new THREE.OrbitControls(camera, renderer.domElement);

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
}

function animate() {
	requestAnimationFrame( animate );

	stats.begin();

	draw();
	// debugControls.update();
	renderer.render( scene, camera );

	stats.end();
}



