// Traffic Light Starter Code
// Griffin Bartsch
// 2/28/24

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let state = 1;
let lastSwitch = 0;
let oneTime = 2500;
let twoTime = 1000;
let threeTime = 2500;

function setup() {
  createCanvas(100, 300);
}

function draw() {
  background(255);
  checkState();
  drawOutlineOfLights();
  displayCorrectLight();
}

function checkState() {
  if (state === 1 && millis() > lastSwitch + oneTime) {
    state = 2;
    lastSwitch = millis();
  }
  if (state === 2 && millis() > lastSwitch + twoTime) {
    state = 3;
    lastSwitch = millis();
  }
  if (state === 3 && millis() > lastSwitch + threeTime) {
    state = 1;
    lastSwitch = millis();
    }
}

function displayCorrectLight() {
  if (state === 1) {
    fill("green");
    ellipse(width / 2, height / 2 + 65, 50, 50); //bottom
  } else if (state === 2) {
    fill("yellow");
    ellipse(width / 2, height / 2, 50, 50); //middle
  } else if (state === 3) {
    fill("red");
    ellipse(width / 2, height / 2 - 65, 50, 50); //top
  }
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width / 2, height / 2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width / 2, height / 2 - 65, 50, 50); //top
  ellipse(width / 2, height / 2, 50, 50); //middle
  ellipse(width / 2, height / 2 + 65, 50, 50); //bottom
}
