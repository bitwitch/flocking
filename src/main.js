const boids = []; 


function setup() {
	createCanvas(640, 360);
	for (var i=0; i<100; i++) {
		boids.push(new Boid());
	}
}

function draw() {
	background(51); 

	// TODO(shaw): update based on a snapshot of boids to avoid update 
	// rippling into itself	for a single frame
	for (var i=0; i<boids.length; i++) {
		boids[i].screenWrap();
		boids[i].flock(boids);
		boids[i].update();
		boids[i].show();
	}
}