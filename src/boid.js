/* Dependencies
 *   config.js
 */

class Boid {
	constructor() {
		this.position = createVector(random(width), random(height));
		this.velocity = p5.Vector.random2D(); 
		this.velocity.setMag(random(1, 2));
		this.acceleration = createVector();
		this.maxForce = 0.1;
		this.maxSpeed = 4;
	}
	
    flock(boids) {
		var perceptionRadius = parseInt(perceptionRadiusSlider.value);
		var alignment  = createVector();
		var cohesion   = createVector(); 
		var separation = createVector(); 
		var total      = 0; 
		for (var i=0; i<boids.length; i++) {
			var other = boids[i];
			var d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
			if (other !== this && d <= perceptionRadius) {
				// Alignment: steer towards the average heading of local flockmate
				alignment.add(other.velocity);

				// Cohesion: steer to move toward the average position of local flockmates
				cohesion.add(other.position);

                // Separation: steer to avoid crowding local flockmates
				var sep = p5.Vector.sub(this.position, other.position);
				// force inversely proportional to distance
				sep.div(d);
				separation.add(sep); 

				total++;
			}
		}
		if (total > 0) {
			alignment.div(total);
			alignment.setMag(this.maxSpeed);
			alignment.sub(this.velocity);
			alignment.limit(this.maxForce);
			
			cohesion.div(total);
			cohesion.sub(this.position);
			cohesion.setMag(this.maxSpeed);
			cohesion.sub(this.velocity);
			cohesion.limit(this.maxForce);
			
			separation.div(total);
			separation.setMag(this.maxSpeed);
			separation.sub(this.velocity);
			separation.limit(this.maxForce);
		}
		
		// scale by the config slider values
		alignment.mult(parseInt(alignSlider.value));
		cohesion.mult(parseInt(cohesionSlider.value));
		separation.mult(parseInt(separationSlider.value));

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
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
		this.screenWrap();
		this.position.add(this.velocity);
		this.velocity.add(this.acceleration);
		this.acceleration.mult(0);
	}

	show() {
		strokeWeight(8); 
		stroke(202, 177, 146);
		point(this.position.x, this.position.y);
	}
}
