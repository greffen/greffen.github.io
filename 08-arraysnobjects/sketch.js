// Arrays and Object Notation
// Griffin Bartsch
// 3/29/24
//
// Extra for Experts:
// Implements audio (and by extension the p5 audio library), uses the lerp function in default p5js,  

let cookies = 0;
let clickSounds = [];
let totalClickSounds = 7;
let cookieIMG;
let cookieSize = 360;
let currentClickValue = 1;
let radius = 180;
let currentRadius = 120;


function preload() {
  //adds the sounds to the clickSounds array
  for (let i = 0; i < totalClickSounds; i++) {
    clickSounds[i] = loadSound("Audio Files/click" + i + ".mp3");
  }
  //loads the cookie image
  cookieIMG = loadImage("Image Files/cookie.png");

}

function setup() {
  imageMode(CENTER);
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  //ellipse(width/18 + 180, height/4 + 170, cookieSize); //fake cookie hitbox thing
  drawCookieCount();
  thatBounceEffect();
}

function playCookieClick() {
  //code for actually playing the sounds
  let randomNum;
  randomNum = int(random(0, totalClickSounds));
  clickSounds[randomNum].play();
}

function mousePressed() {
  //did you click on the cookie check
  let clickedInCookie = pointCircle(mouseX, mouseY, width/18 + 180, height/4 + 170);
  if (clickedInCookie) {
    playCookieClick();
    currentRadius = 80;
    cookies = cookies + currentClickValue;
  }
  else {
    //do nothing
  }
}

function pointCircle(px, py, cx, cy) {
  //the small amount of "are you clicking on the cookie" math
  let d = dist(px, py, cx, cy);
  if(d <= cookieSize/2) {
    return true; 
  }
  return false;
}

function drawCookieCount() {
  //text formatting
  noStroke();
  fill(255);
  textSize(80);
  textAlign(CENTER, CENTER);
  //displaying number of clicks
  text(cookies, width/2, height/2);
}

function thatBounceEffect() {
  //draws the cookie and makes it "bounce" on click
  currentRadius = lerp(currentRadius, radius, 0.3);
  image(cookieIMG, width/18 + 180, height/4 + 170, currentRadius * 2, currentRadius * 2);
}


//do something with the title that you added
//add particles (this will hopefully be the object notation)
//add gameplay
//add upgrades
//add autoclicker
//add acheivments (or even save files?)