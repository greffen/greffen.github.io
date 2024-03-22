// Arrays and Object Notation
// Griffin Bartsch
// Date
//
// Extra for Experts:
// Implements audio (and by extension the p5 audio library), 

let clickSounds = [];
let totalClickSounds = 7;

function preload() {
  //adds the sounds to the clickSounds array
  for (let i = 0; i < totalClickSounds; i++) {
    clickSounds[i] = loadSound("Audio Files/click" + i + ".mp3");
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

function mouseClicked() {
  //code for actually playing the sounds
  let randomInt;
  randomInt = int(random(0, totalClickSounds));
  clickSounds[randomInt].play();
}

//add particles (this will hopefully be the object notation)
//add gameplay
//add cookie
//add upgrades
//add acheivments (or even save files?)