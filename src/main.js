var configSidebar    = document.getElementById('configSidebar');
var alignSlider      = document.getElementById('alignSlider');
var cohesionSlider   = document.getElementById('cohesionSlider');
var separationSlider = document.getElementById('separationSlider');

window.addEventListener('keypress', handlerToggleSidebar); 

var boids = [];

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	for (var i=0; i<200; i++) {
		boids.push(new Boid());
	}
}

function draw() {
	background(51); 

	// TODO(shaw): update based on a snapshot of boids to avoid update 
	// rippling into itself	for a single frame
	for (var i=0; i<boids.length; i++) {
		boids[i].flock(boids);
		boids[i].update();
		boids[i].show();
	}

	// print FPS
	fill(255);
	stroke(0);
	text("FPS: " + frameRate().toFixed(2), 10, height - 10);
}

function handlerToggleSidebar(e) {
	if (e.key == "`" || e.key == "~") {
		configSidebar.classList.toggle('active');
	}
}