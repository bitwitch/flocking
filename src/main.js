var boids = []; 
var alignSlider, cohesionSlider, separationSlider;


function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	alignSlider = createSlider(0, 5, 1, 0.1);
	cohesionSlider = createSlider(0, 5, 1, 0.1);
	separationSlider = createSlider(0, 5, 1, 0.1);
	for (var i=0; i<300; i++) {
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

	// print FPS
	fill(255);
	stroke(0);
	text("FPS: " + frameRate().toFixed(2), 10, height - 10);
}
