let ship;
let scene = 1;
let creditsIMG;
let playerX = 200;
let playerY = 550;
let button1; //Controls
let button2; //Start
let button3; //Info
let button4; //Credits
let button5; //Goal
let button6; //Return
let speed;
let enemy1X = 100;
let enemy2X = 200;
let enemy3X = 300;
let enemyY = 100;
let score;
let gameover;

function preload() {
  creditsIMG = loadImage("credits.png");
  titleIMG = loadImage("title.png");
}

function setup() {
  createCanvas(400, 800, button1);
  generateBackground();
  createSceneOne();
  createSceneTwo();
  switchSceneOne();
  score = 0;
  speed = 10;
  gameover = false;
}

function draw() {
  console.log(playerX)


  //scene 1 = Main Menu
  //scene 2 = Options Screen
  //scene 3 = Credits Screen
  //scene 4 = Gameplay 
  if (scene === 1) {
    button3.mouseClicked(switchSceneTwo);
    button4.mouseClicked(switchSceneThree);
    button2.mouseClicked(switchSceneFour);
    
  }
  else if (scene === 2) {
    button6.mouseClicked(switchSceneOne);
  }

  else if (scene === 3) {
    button6.mouseClicked(switchSceneOne);
    creditsIMG.remove();
  }

  else if (scene === 4) { //start of scene 4
  generateBackground()    
  if(gameover == false)
  {
  collision();
  //player
  fill(255);
  rect(playerX, playerY, 10, 10);

  // enemie(s)
  fill(255, 255, 0);
  rect(enemy1X, enemyY, 20, 20);
  rect(enemy2X, enemyY, 20, 20);
  rect(enemy3X, enemyY, 20, 20);
  
  enemyY += speed;
  
  //enemy at the bottom
  if (enemyY >= height) {
    enemyY = 0;
    score += 1;
    enemy1X = random(width);
    enemy2X = random(width);
    enemy3X = random(width);
  }

  //score
  fill(255);
  textSize(40);
  text(score, width / 2, 100);
    
  } // end of gameover == false
  
    if(gameover == true)
  {
  score = 0;
  speed = 0;
  background(0)
  textSize(20);
  fill(255, 0, 0);
  text("Better Luck Next Time...", width / 4, height / 2);
  
  }
  
} // end of scene 4

}

function createSceneOne() {
  button2 = createButton("Start");
  button3 = createButton("Info");
  button4 = createButton("Credits");
  button2.position(100,450);
  button2.size(width/2, 50);
  button3.position(100, 500);
  button3.size(width/2, 50);
  button4.position(100, 550);
  button4.size(width/2, 50);
  button2.hide();
  button3.hide();
  button4.hide();
}

function createSceneTwo() {
  button1 = createButton("Control the player using the left and right arrows OR mouse wheel"); //Controls
  button1.position(100,300);
  button1.size(width/2, 50);
  button5 = createButton("The Goal? Survive. (and go for a high score!"); //Goal
  button5.position(100, 400);
  button5.size(width/2, 50);
  button6 = createButton("Return"); //Return
  button6.position(100, 500);
  button6.size(width/2, 50); 
  button1.hide();
  button6.hide();
  button5.hide();
}

function createSceneThree() {
  button6.show();
}

function createSceneFour() {

}

function switchSceneFour() {
  scene = 4;
  button1.hide();
  button2.hide();
  button3.hide();
  button4.hide();
  button6.hide();
  button5.hide();
}

function switchSceneThree() {
  button6.show();
  image(creditsIMG, -10, 270);

  scene = 2;
  button2.hide();
  button3.hide();
  button4.hide();
}

function switchSceneTwo() {
  button1.show();
  button5.show();
  button6.show();
  scene = 2;
  button2.hide();
  button3.hide();
  button4.hide();
}

function switchSceneOne() {
  image(titleIMG, -100, -50);
  button2.show();
  button3.show();
  button4.show();
  scene = 1;
  button1.hide();
  button5.hide();
  button6.hide();
}

function generateBackground() {
  background(0);
  let numberOfStars = 0;
  while (numberOfStars < 100) {
    star(random(0, 400), random(0, 800), 2, random(3,7), random(4,7));
    numberOfStars++;
  }
}
  
//star function "borrowed" from https://p5js.org/examples/form-star.html
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);

}

function collision() { //i couldnt figure out how to do this all at once in one if statement im sorry 
  if (playerX >= enemy1X && playerX <= enemy1X + 20 && playerY >= enemyY && playerY <= enemyY + 20) {
    score = 0;
    gameover = true;
  }

  if (playerX >= enemy2X && playerX <= enemy2X + 20 && playerY >= enemyY && playerY <= enemyY + 20) {
    score = 0;
     gameover = true;
  }

  if (playerX >= enemy3X && playerX <= enemy3X + 20 && playerY >= enemyY && playerY <= enemyY + 20) {
    score = 0;
     gameover = true;
  }
}

function keyPressed() { //arrow key movement
  if (keyCode === LEFT_ARROW && playerX > 0) {
    playerX -= speed;
  }
  if (keyCode === RIGHT_ARROW && playerX < 390) {
    playerX += speed;
  }
}

function mouseWheel(event) { // mouse wheel movement
  if (playerX + event.delta / 10 > 0 && playerX + event.delta / 10 < 360) {
    playerX += event.delta / 10;
  }
  // Uncomment the line below if you want to prevent the default scroll behavior
  // return false;
}