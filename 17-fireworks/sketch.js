// Fireworks OOP Demo

const NUMBER_OF_FIREWORKS = 10000;

class Particle {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.size = 2;
    this.dx = dx;
    this.dy = dy;

    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.opacity = 255;
  }
  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.opacity);
    circle(this.x, this.y, this.size);
  }
  update() {
    //move the particle
    this.x += this.dx;
    this.y += this.dy;

    //apply basic gravity
    this.dy += 0.05;

    //fade away over time
    this.opacity--;
  }
  livingnessInOppositeLand() {
    return this.opacity <= 0;
  }
}

let theFireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  for (let firework of theFireworks) {
    if (firework.livingnessInOppositeLand()) {
      //delete it 
      let index = theFireworks.indexOf(firework);
      theFireworks.splice(index, 1);
    }
    else {
      //move and display it
      firework.update();
      firework.display();
    }
  }
}

function mousePressed() {
  let angle = 0;
  
  for (let i = 0; i < NUMBER_OF_FIREWORKS; i++) {
    let speed = random(1, 3);
    let dx = cos(angle) * speed;
    let dy = sin(angle) * speed;
    let someFirework = new Particle(mouseX, mouseY, dx, dy);
    theFireworks.push(someFirework);

    angle += 360 / NUMBER_OF_FIREWORKS;
  }
}