const letters = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`
class Bubble {

  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
    this.homeX = x;
    this.homeY = y;
    this.text = letters[int(random(0, letters.length - 1))];
    this.change = 0;

  }



  intersect(px, py, pr) {
    let d = dist(px, py, this.x, this.y);
    if (d < pr) {
      this.brightness = 255;
      textAlign(CENTER, CENTER);
      fill(255, 0, 0);
      textSize(this.r);
      text(this.text, this.x, this.y);
      this.x = this.x + random(-2, 2);
      this.y = this.y + random(-2, 2);
      this.change = 1;

    } else {
      this.brightness = 0;
      this.x = this.homeX;
      this.y = this.homeY;
      this.change = 0;
    }

  }

  // move() {
  //   this.x = this.x + random(-2, 2);
  //   this.y = this.y + random(-2, 2);
  // }
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

  show(freezeFrame) {
    ellipseMode(CENTER);
    // stroke(255);
    // strokeWeight(4);
    fill(this.brightness, 125);
    ellipse(this.x, this.y, this.r * 2);
    textAlign(CENTER, CENTER);

    if (this.change == 0) {
      fill(255, 255, 255);
      // stroke(255, 255, 255);
      textSize(this.r);
      if (freezeFrame) {
        // text(this.text, this.x, this.y);
        this.keepText();
      } else {
        // text(this.text = letters[int(random(0, letters.length - 1))], this.x, this.y);
        // this.changeText();
        this.maybeRandom();
      }
    } else {
      fill(255, 0, 0);
      // stroke(255, 0, 0);
      textSize(this.r);
      // text(this.text, this.x, this.y);
      // this.keepText();
      text(this.text = appleLetters[int(random(0, appleLetters.length - 1))], this.x, this.y);
    }
  }
}