// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

// const letters = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;
const letters = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(random(width), random(height));
    this.target = createVector(x, y);
    this.origin = this.pos.copy();
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.r = 8;
    this.maxspeed = 10;
    this.maxforce = 1;
    this.text = letters[int(random(0, letters.length - 1))];
    this.change = 0;
  }

  behaviors() {
    var arrive;
    // arrive = this.arrive(this.target);
    
    if (value > 0) {
      arrive = this.arrive(this.target);
    } else {
      arrive = this.arrive(this.origin);
    }
    var mouse = createVector(mouseX, mouseY);
    var flee = this.flee(mouse);

    arrive.mult(1);
    flee.mult(5);

    this.applyForce(arrive);
    this.applyForce(flee);
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }
  
  changeText() {
    return text(this.text = letters[int(random(0, letters.length - 1))], this.x, this.y);
  }

  keepText() {
    return text(this.text, this.x, this.y);
  }

  maybeRandom() {
    if (int(random(0, 100)) < 25) {
      this.changeText();
    } else {
      this.keepText();
    }
  }

  show() {
   
    ellipseMode(CENTER);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
    textAlign(CENTER, CENTER);
    text(this.text, this.pos.x, this.pos.y);

    if (this.change == 0) {
     
      stroke(255, 255, 255);
      textSize(this.r);
     
      if (frameCount % changeLetterOn == 0) { 
        this.keepText();
      } else {
        this.maybeRandom();
      }
    } else {
      // fill(255, 0, 0);
      stroke(255, 0, 0);
      textSize(this.r);
      
      this.keepText();
      
    }
  }


  arrive(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    var speed = this.maxspeed;
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxspeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  }

  flee(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if (d < 50) {
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }
}