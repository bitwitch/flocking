/* Dependencies
 *   config.js
 */

var X_AXIS = new THREE.Vector3(1,0,0);
var Y_AXIS = new THREE.Vector3(0,1,0);
var Z_AXIS = new THREE.Vector3(0,0,1);

class Boid {
	constructor() {
		this.width = 10;
		this.height = 20;

		this.geometry = new THREE.ConeGeometry( this.width/2, this.height, 3 );
		this.material = new THREE.MeshBasicMaterial({ color: 0xCAB192 });
		this.mesh = new THREE.Mesh( this.geometry, this.material );

		// set random position in window 
		var x = Math.floor(Math.random() * ((window.innerWidth/2)+(window.innerWidth/2)+1)) - (window.innerWidth/2);
		var y = Math.floor(Math.random() * ((window.innerHeight/2)+(window.innerHeight/2)+1)) - (window.innerHeight/2);
		this.mesh.position.set(x, y, 0);

		// set random velocity
		this.velocity = new THREE.Vector3(2*(Math.random()-0.5), 2*(Math.random()-0.5), 0);
		this.velocity.setLength(Math.random() + 1);
		
		// zero acceleration
		this.acceleration = new THREE.Vector3();

		this.maxForce = 0.1;
		this.maxSpeed = 4;
	}
	
    flock(boids) {
		var alignment  = new THREE.Vector3();
		var cohesion   = new THREE.Vector3(); 
		var separation = new THREE.Vector3();
		var total = 0; 
		var perceptionRadius = parseInt(perceptionRadiusSlider.value);

		for (var i=0; i<boids.length; i++) {
			var other = boids[i];
			var d = this.mesh.position.distanceTo(other.mesh.position); 
			if (other !== this && d <= perceptionRadius) {
				// Alignment: steer towards the average heading of local flockmate
				alignment.add(other.velocity);

				// Cohesion: steer to move toward the average position of local flockmates
				cohesion.add(other.mesh.position);

                // Separation: steer to avoid crowding local flockmates
				var sep = new THREE.Vector3().subVectors(this.mesh.position, other.mesh.position);
				sep.divideScalar(d); // force inversely proportional to distance
				separation.add(sep); 

				total++;
			}
		}
		if (total > 0) {
			alignment.divideScalar(total);
			alignment.setLength(this.maxSpeed);
			alignment.sub(this.velocity);
			alignment.clampLength(0, this.maxForce);
			
			cohesion.divideScalar(total);
			cohesion.sub(this.mesh.position);
			cohesion.setLength(this.maxSpeed);
			cohesion.sub(this.velocity);
			cohesion.clampLength(0, this.maxForce);
			
			separation.divideScalar(total);
			separation.setLength(this.maxSpeed);
			separation.sub(this.velocity);
			separation.clampLength(0, this.maxForce);
		}
		
		// scale by the config slider values
		alignment.multiplyScalar(parseInt( alignSlider.value ));
		cohesion.multiplyScalar(parseInt( cohesionSlider.value ));
		separation.multiplyScalar(parseInt( separationSlider.value ));

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
	}
	
	screenWrap() {
		if (this.mesh.position.x > window.innerWidth/2) {
			this.mesh.position.x = -window.innerWidth/2;
		} else if (this.mesh.position.x < -window.innerWidth/2) {
			this.mesh.position.x = window.innerWidth/2;
		} 

		if (this.mesh.position.y > window.innerHeight/2) {
			this.mesh.position.y = -window.innerHeight/2;
		} else if (this.mesh.position.y < -window.innerHeight/2) {
			this.mesh.position.y = window.innerHeight/2;
		} 

	}

	update() {
		this.screenWrap();
		this.mesh.position.add(this.velocity);
		this.velocity.add(this.acceleration);
		this.mesh.quaternion.setFromUnitVectors(Y_AXIS, this.velocity.clone().normalize());
		this.acceleration.set(0, 0, 0);
	}
}
