// Arrays and Object Notation
// Griffin Bartsch
// 3/29/24
//
// Extra for Experts:
// Implements audio (and by extension the p5 audio library), uses the lerp function in default p5js,  

let cookies = 0;
let clickSounds = [];
let totalClickSounds = 7;
let cookieIMG, titleIMG;
let cookieSize = 360;
let currentClickValue = 1;
let radius = 180;
let currentRadius = 120;
let autoButton, clickButton;
let autoPrice = 25;
let clickPrice = 5;
let autoRate = 0; 



function preload() {
  //adds the sounds to the clickSounds array
  for (let i = 0; i < totalClickSounds; i++) {
    clickSounds[i] = loadSound("Audio Files/click" + i + ".mp3");
  }
  //loads the cookie image
  cookieIMG = loadImage("Image Files/cookie.png");
  titleIMG = loadImage("Image Files/title.png");
}

function setup() {
  imageMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  makeButtons();
}

function draw() {
  background(220);
  
  //ellipse(width/18 + 180, height/4 + 170, cookieSize); //fake cookie hitbox thing
  drawCookieCount();
  thatBounceEffect();
  image(titleIMG, width/2, height/4);
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
  //attempt at making the cookie count fit better
  // let number = 80;
  // let otherNumber = -5;
  // if (otherNumber < 0 && number > 30) {
  //   number--;
  //   otherNumber++;
  //   textSize(number);
  // }
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

function makeButtons() {
  autoButton = createButton("Upgrade Passive Cookie Baking\nPrice = " + autoPrice);
  autoButton.position(width/2 + width/4 , height/3);
  autoButton.size(300, 50);
  autoButton.mousePressed(buyAutoUpgrade);

  clickButton = createButton("Upgrade Cookies Baked Per Click\nPrice = " + clickPrice);
  clickButton.position(width/2 + width/4 , height/4);
  clickButton.size(300, 50);
  clickButton.mousePressed(buyClickUpgrade);
}

function buyAutoUpgrade() {
  if (cookies >= autoPrice) {
    cookies -= autoPrice;
    autoPrice *= 2; //increase the price for the next upgrade
    autoRate++; //does the thing and auto adds more
    console.log("Passive upgrade purchased!");
    autoButton.html("Upgrade Passive Cookie Baking\nPrice = " + autoPrice);
  } else {
    console.log("Insufficient cookies to purchase the upgrade!");
  }
}

function buyClickUpgrade() {
  if (cookies >= clickPrice) {
    cookies -= clickPrice;
    clickPrice *= 2; //increase the price for the next upgrade
    currentClickValue++; //does the thing and makes it add more
    console.log("Click upgrade purchased!");
    clickButton.html("Upgrade Cookies Baked Per Click\nPrice = " + clickPrice);
  } else {
    console.log("Insufficient cookies to purchase the upgrade!");
  }
}

function autoCookieProduction() {

  cookies += autoRate;
}

setInterval(autoCookieProduction, 1000); // the automatic cookie producer


//add particles (this will hopefully be the object notation)
//add gameplay
//add upgrades
//add acheivments (or even save files?)
//fix the number font going down
//fix the focus
//do price
//add number on click and passive number
//add the golden cookie equivalent
//add a sacrifice button to boost production (with another object notation thing hopefully)