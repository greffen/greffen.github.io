// Terrain Generation
// Object Notation and Arrays Demo
// 18/3/24

let terrain = [];
let numberOfRectangles;
let rectangleWidth;

function setup() {
  createCanvas(windowWidth, windowHeight);
  numberOfRectangles = width;
  noStroke();
  rectangleWidth = width / numberOfRectangles;
  generateTerrain();
}

function draw() {
  background(220);

  for (let someRectangle of terrain) {
    rect(someRectangle.x, someRectangle.y, someRectangle.w, someRectangle.h);
  }
}

function spawnRectangle(leftSide, rectangleHeight) {
  let thisRectangle = {
    x: leftSide,
    y: height - rectangleHeight,
    w: rectangleWidth,
    h: rectangleHeight,
  };
  terrain.push(thisRectangle);
}

function generateTerrain() {
  let time = 0;
  // let deltaTime = 0.001; //for smooth terrain
  let deltaTime = 0.01; //for fun terrain
  
  for (let x = 0; x < width; x += rectangleWidth) {
    let theHeight = noise(time) * height;
    spawnRectangle(x, theHeight);
    time += deltaTime;
  }
}