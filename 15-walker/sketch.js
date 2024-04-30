// Walker OOP Demo
// Griffin Bartsch
// 30/4/24

class Walker {
  constructor(x, y, theColour) {
    this.x = x;
    this.y = y;
    this.stepSize = 5;
    this.colour = theColour;
    this.radius = 5;
  }
  move() {
    let choice = random(100);
    if (choice < 25) {
      //move up
      this.y -= this.stepSize;
    }
    else if (choice < 50) {
      //move down
      this.y += this.stepSize;
    }
    else if (choice < 75) {
      //move right
      this.x += this.stepSize;
    }
    else {
    //move left
      this.x -= this.stepSize;
    }
  }
  display() {
    fill(this.colour);
    circle(this.x, this.y, this.radius*2);
  }
}

let maram;
let griffin;
let seth;

function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);
  maram = new Walker(width/2, height/2, "red");
  griffin = new Walker(200, 400, "black");
  seth = new Walker(1200, 400, "green");
}

function draw() {
  // background(220);
  maram.move();
  griffin.move();
  seth.move();

  maram.display();
  griffin.display();
  seth.display();
}