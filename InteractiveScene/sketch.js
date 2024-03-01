let x = 400
let y = 800
let scene = 1;
let button1; //Mouse Mode
let button2; //Start
let button3; //Settings
let button4; //Credits
let button5; //Keyboard Mode
let button6; //Return

// function preload() {
//   font = loadFont('assets/inconsolata.otf');
// }

function setup() {
  createCanvas(x, y, button1);
  generateBackground();
  button2 = createButton("Start");
  button3 = createButton("Settings");
  button4 = createButton("Credits");
}

function draw() {
  
  
  //scene 1 = gameplay
  //scene 2 = menu screen
  //scene 3 = options 
  if (scene === 1) {
    button2.position(100,450);
    button2.size(width/2, 50);
    button3.position(100, 500);
    button3.size(width/2, 50);
    button4.position(100, 550);
    button4.size(width/2, 50);
    button3.mouseClicked(switchSceneTwo);
    
    
  }
  else if (scene === 2) {
    button1 = createButton("Mouse Mode"); //Mouse Mode
    button1.position(100,300);
    button1.size(width/2, 50);
    button5 = createButton("Keyboard Mode"); //Keyboard Mode
    button5.position(100, 400);
    button5.size(width/2, 50);
    button6 = createButton("Return"); //Return
    button6.position(100, 500);
    button6.size(width/2, 50);
    button6.mouseClicked(switchSceneOne);
  }
  else if (scene === 3) {
    
  }
  

  
  
}

function switchSceneTwo() {
  scene = 2;
  button2.remove();
  button3.remove();
  button4.remove();
  console.log("you booped me!");
}

function switchSceneOne() {
  scene = 1;
  button1.remove();
  button5.remove();
  button6.remove();
  console.log("you booped me!");
}

function generateBackground() {
  background(0);
  let numberOfStars = 0
  while (numberOfStars < 100) {
    star(random(0, 400), random(0, 800), 2, random(3,7), random(4,7));
    numberOfStars++
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