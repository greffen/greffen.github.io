// Arrays and Object Notation
// Griffin Bartsch
// 3/29/24
//
// Extra for Experts:
// Implements audio (and by extension the p5 audio library), uses the lerp function in default p5js, uses the pull-able .x thing in object notations, 
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
let particles = [];

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

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
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
    cookies += currentClickValue;
    
    // Create particle for displaying the number of cookies gained
    let cookieNumberParticle = createCookieNumberParticle(mouseX, mouseY, currentClickValue);
    particles.push(cookieNumberParticle);
    
    // Create particles for representing cookies visually
    for (let i = 0; i < 10; i++) {
      particles.push(createCookieParticle(mouseX, mouseY));
    }
  }
}

function pointCircle(px, py, cx, cy) {
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
    autoPrice *= 2;
    autoRate++;
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

setInterval(autoCookieProduction, 1000);  // the automatic cookie producer

function createCookieParticle(x, y) {
  let particle = {
    x: x,
    y: y,
    diameter: random(5, 10),
    dx: random(-2, 2),
    dy: random(-2, 2),
    lifespan: 255,

    update: function () {
      this.x += this.dx;
      this.y += this.dy;
      this.lifespan -= 1;
    },

    display: function () {
      noStroke();
      fill(139, 69, 19, this.lifespan); // Brown color
      ellipse(this.x, this.y, this.diameter, this.diameter);
    },

    isDead: function () {
      return this.lifespan < 0;
    }
  };

  return particle;
}

function createCookieNumberParticle(x, y, number) {
  let particle = {
    x: x,
    y: y,
    number: number,
    dy: -2,
    lifespan: 150,

    update: function () {
      this.y += this.dy;
      this.lifespan -= 1;
    },

    display: function () {
      noStroke();
      fill(0, this.lifespan); // Black color
      textSize(24);
      textAlign(CENTER, BOTTOM);
      text("+" + this.number, this.x, this.y);
    },

    isDead: function () {
      return this.lifespan < 0;
    }
  };

  return particle;
}



//add acheivments (or even save files?)
//fix the focus
//add number on click and passive number
//add the golden cookie equivalent
//add a sacrifice button to boost production (with another object notation thing hopefully)
