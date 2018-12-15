class Boid {
	constructor() {
		this.position = createVector(random(width), random(height));
		this.velocity = p5.Vector.random2D(); 
		this.velocity.setMag(random(1, 2));
		this.acceleration = createVector();
		this.maxForce = 0.015;
		this.maxSpeed = 4;
	}

	// Alignment: steer towards the average heading of local flockmate
	align(boids) {
		var perceptionRadius = 50; 
		var steering = createVector(); 
		var total = 0; 
		for (var i=0; i<boids.length; i++) {
			var other = boids[i];
			var d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
			if (other !== this && d <= perceptionRadius) {
				steering.add(other.velocity);
				total++;
			}
		}
		if (total > 0) {
			steering.div(total);
			steering.setMag(this.maxSpeed);
			steering.sub(this.velocity);
			steering.limit(this.maxForce);
		}
		return steering;
	}	

    flock(boids) {
		var alignment = this.align(boids);
        this.acceleration = alignment;
	}
	
	screenWrap() {
		if (this.position.x > width) {
			this.position.x = 0;
		} else if (this.position.x < 0) {
			this.position.x = width;
		} 

		if (this.position.y > height) {
			this.position.y = 0;
		} else if (this.position.y < 0) {
			this.position.y = height;
		} 

	}

	update() {
		this.position.add(this.velocity);
		this.velocity.add(this.acceleration); 
	}

	show() {
		strokeWeight(8); 
		stroke(202, 177, 146);
		point(this.position.x, this.position.y);
	}
}
