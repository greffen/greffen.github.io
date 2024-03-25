// Bubble Movement Demo
// Object Notation and Arrays Demo
// 3/25/24

let theBubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  for (let i = 0; i < 5; i++) {
    spawnBubble();
  }

  //spawn new bubble every 1/2 second
  window.setInterval(spawnBubble, 500);
}

function draw() {
  background(255);
  //moveBubblesRandomly();
  moveBubblesWithNoise();
  displayBubbles();
}

function spawnBubble() {
  let someBubble = {
    size: random(10, 30),
    x: random(width),
    y: random(height),
    speed: 3,
    r: random(255),
    g: random(255),
    b: random(255),
    timeX: random(1000000000),
    timeY: random(1000000000),
    deltaTime: 0.001
  };
  theBubbles.push(someBubble);
}

function displayBubbles() {
  for (let bubble of theBubbles) {
    fill(bubble.r, bubble.g, bubble.b, bubble.alpha);
    circle(bubble.x, bubble.y, bubble.size);
  }
}

function moveBubblesRandomly() {
  for (let bubble of theBubbles) {
    let choice = random (100);
    if (choice < 25) {
      //move up
      bubble.y -= bubble.speed;
    }
    else if (choice < 50) {
      //move down
      bubble.y += bubble.speed;
    }
    else if (choice < 75) {
      //move left
      bubble.x -= bubble.speed;
    }
    else {
      //move right
      bubble.x += bubble.speed;
    }
  }
}

function moveBubblesWithNoise() {
  for (let bubble of theBubbles) {
    //figure out where to be
    let x = noise(bubble.timeX) * width;
    let y = noise(bubble.timeY) * height;

    //set the bubble objects location
    bubble.x = x;
    bubble.y = y;

    //increment timeX and timeY
    bubble.timeX += bubble.deltaTime;
    bubble.timeY += bubble.deltaTime;
  }
}