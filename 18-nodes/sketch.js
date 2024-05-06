// Connected Nodes OOP Demo
//
// 6/5/24

let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let somePoint = new MovingPoint(width/2, height/2);
  points.push(somePoint);
}

function draw() {
  background(0);
  for (let point of points) {
    point.update();
    point.connectTo(points);
    point.display();
  }
}

class MovingPoint {
  constructor(x, y) {
    this.speed = 5;
    this.radius = 15;
    this.minRadius = 15;
    this.maxRadius = 50;
    this.reach = 150;
    this.x = x;
    this.y = y;
    this.xTime = random(0, 1000);
    this.yTime = random(0, 1000);
    this.deltaTime = 0.01;
    this.colour = color(random(255), random(255), random(255));
  }
  display() {
    noStroke();
    fill(this.colour);
    circle(this.x, this.y, this.radius*2);
  }

  update() {
    this.move();
    this.wrap();
    this.changeTheSizeOfTheCircleBasedOnTheMouseProximity();
  }

  connectTo(poinstArray) {
    for (let otherPoint of poinstArray) {
      //avoid drawing a line to pointself (oneself but point)
      if(this !== otherPoint) {
        let pointDistance = dist(this.x, this.y, otherPoint.x, otherPoint.y);
        if (pointDistance < this.reach) {
          stroke(this.colour);
          line(this.x, this.y, otherPoint.x, otherPoint.y);
        }
      }
    }
  }

  wrap() {
    //wrap around the screen if exited
    if (this.x < 0) {
      //you fell off (left)
      this.x += width;
    }
    else if (this.x > width) {
      //you fell off (right)
      this.x -= width;
    }
    else if (this.y < 0) {
      //you fell off (top)
      this.y += height;
    }
    else if (this.y > height) {
      //you fell off (bottom)
      this.y -= height;
    }
  }

  move() {
    //pick random direction of movement
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);
   
    //scale the movement speed
    this.dx = map(dx, 0, 1, -this.speed, this.speed);
    this.dy = map(dy, 0, 1, -this.speed, this.speed);
 
    //move point
    this.x += this.dx;
    this.y += this.dy;
    
    //move on the graph
    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }

  changeTheSizeOfTheCircleBasedOnTheMouseProximity() {
    let mouseDistance = dist(this.x, this.y, mouseX, mouseY);
    if (mouseDistance < this.reach) {
      let theSize = map(mouseDistance, 0, this.reach, this.maxRadius, this.minRadius);
      this.radius = theSize;
    }
    else {
      this.radius = this.minRadius;   
    }
  }
}

function mousePressed() {
  let somePoint = new MovingPoint(mouseX, mouseY);
  points.push(somePoint);
}