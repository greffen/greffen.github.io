// Arrays and Object Notation
// Griffin Bartsch
// 3/29/24
//
// Extra for Experts:
// Implements audio (and by extension the p5 audio library), 

let cookie = [];
let clickSounds = [];
let totalClickSounds = 7;
let cookieIMG;
let scalar = 1.0;

function preload() {
  //adds the sounds to the clickSounds array
  for (let i = 0; i < totalClickSounds; i++) {
    clickSounds[i] = loadSound("Audio Files/click" + i + ".mp3");
  }

  cookieIMG = loadImage("cookie.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  //ellipse(width/18 + 180, height/4 + 170, 360);
  
  drawCookie();
}

function drawCookie() {
  //cookieIMG.mouseOver(scalar = 1.5);
  //cookieIMG.mouseOut(scalar = 1);
  image(cookieIMG, width/18, height/4, cookieIMG.width * scalar, cookieIMG.height * scalar);
}

function playCookieClick() {
  //code for actually playing the sounds
  let randomNum;
  randomNum = int(random(0, totalClickSounds));
  clickSounds[randomNum].play();
}

// function mousePressed() {
//   //did you click on the cookie check
//   for (let thing of cookie) {
//     let clickedInCookie = pointCircle(mouseX, mouseY, width/18 + 180, height/4 + 170);
//     if (clickedInCookie) {
//       scalar = 1.5;
//       playCookieClick();
//     }
//     else {
//       //do nothing
//     }
//   }
// } i dont know why this doesnt work

function pointCircle(px, py, cx, cy) {
  let d = dist(px, py, cx, cy);
   
  if(d <= size/2) {
    return true; 
  }
  return false;
}

//add particles (this will hopefully be the object notation)
//add gameplay
//add upgrades
//add acheivments (or even save files?)