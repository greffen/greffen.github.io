// Character in 2D Grid
// Dan Schellenberg
// Apr 15, 2024


let grid = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1,],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1,],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1,],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1,],
  [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1,],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,],
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 10, 11, 12, 1, 0, 1, 0, 1, 1, 1, 1, 1,],
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1,],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1,],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1,],
  [1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1,],
  [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1,],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,],
  [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1,],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],];
let cellSize;
const GRID_SIZE = 21;
const PLAYER = 9;
const BLINKY = 10;
const PINKY = 11;
const CLYDE = 12;
const BLOCK = 1;
const OPEN_TILE = 0;
let player = {
  x: 10,
  y: 14,
};
let grassIMG;
let pavementIMG;
let backgroundMusic;
let state = "start screen";
let titleIMG;
let direction = "";


function preload() {
  grassIMG = loadImage("Images/grass.jpg");
  pavementIMG = loadImage("Images/pavement.jpg");
  titleIMG = loadImage("Images/title.png");
  backgroundMusic = loadSound("Sounds/backgroundMusic.mp3");
}

function setup() {
  //imageMode(CENTER);
  //make the canvas the largest square possible
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }

  //if randomizing the grid, do this:
  //grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  
  //this is dumb -- should check if this is the right size!
  cellSize = height/grid.length;

  //add player to the grid
  grid[player.y][player.x] = PLAYER;

  //equalize audio
  backgroundMusic.setVolume(0.4);
}

function windowResized() {
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }

  cellSize = height/grid.length;
}

function draw() {
  if (state === "start screen") {
    background("gray");
    //attempt at adjusting the image display position in accordance with the canvas and size of the image (accounting for the dead space on the left with the + 75(hopefully))
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    image(titleIMG, centerX - titleIMG.width / 2 + 75, centerY - titleIMG.height / 2);
  }
  else if (state === "game") {
    background(220);
    displayGrid();
    updateMovement();
  }
}

function keyPressed() {
  if (key === " " && state === "start screen") {
    state = "game";
    backgroundMusic.loop();
  }

  if (key === "w") {
    //movePlayer(player.x + 0, player.y - 1); //0 on x axis, -1 on y axis (i.e. up)
    direction = "up";
  }

  if (key === "a") {
    //movePlayer(player.x - 1, player.y + 0); //-1 on x axis, 0 on y axis (i.e. left)
    direction = "left";
  }

  if (key === "s") {
    //movePlayer(player.x + 0, player.y + 1); //0 on x axis, 1 on y axis (i.e. down)
    direction = "down";
  }

  if (key === "d") {
    //movePlayer(player.x + 1, player.y + 0); //0 on x axis, -1 on y axis (i.e. right)
    direction = "right";
  }
}

function updateMovement() {
  // Check if it's time to move the player
  if (frameCount % 4 === 0) {
    movePlayerAccordingToDirection();
  }
}

function movePlayerAccordingToDirection() {
  let nextX = player.x;
  let nextY = player.y;

  if (direction === "up") {
    nextY--;
  } 
  else if (direction === "down") {
    nextY++;
  } 
  else if (direction === "left") {
    nextX--;
  }
  else if (direction === "right") {
    nextX++;
  }

  // only if the next position is open
  if (grid[nextY][nextX] === OPEN_TILE && frameCount % 2 === 0) {
    //clear old player
    grid[player.y][player.x] = OPEN_TILE;
    //update new player
    player.x = nextX;
    player.y = nextY;
    //update the grid with the new shit
    grid[player.y][player.x] = PLAYER;
  }
  else {
    //If the next position is not an open tile (wall), stop moving
    direction = "";
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);
  //always toggle self
  toggleCell(x, y);
}

function toggleCell(x, y) {
//make sure that the cell youre toggleing is in the grid
  if (x < GRID_SIZE && y < GRID_SIZE &&
    x >= 0 && y >= 0) { 
    //toggle the color of the cell
    if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = BLOCK;
    }
    else if (grid[y][x] === BLOCK) {
      grid[y][x] = OPEN_TILE;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === BLOCK) {
        //image(grassIMG, x * cellSize, y * cellSize, cellSize);
        fill("blue");
        square(x * cellSize, y * cellSize, cellSize);
      }
      else if (grid[y][x] === OPEN_TILE) {
        //image(pavementIMG, x * cellSize, y * cellSize, cellSize);
        fill("black");
        square(x * cellSize, y * cellSize, cellSize);
      }
      else if(grid[y][x] === PLAYER) {
        fill ("yellow");
        square(x * cellSize, y * cellSize, cellSize);
      }
      else if(grid[y][x] === BLINKY) {
        fill ("red");
        square(x * cellSize, y * cellSize, cellSize);
      }
      else if(grid[y][x] === PINKY) {
        fill ("magenta");
        square(x * cellSize, y * cellSize, cellSize);
      }
      else if(grid[y][x] === CLYDE) {
        fill ("orange");
        square(x * cellSize, y * cellSize, cellSize);
      }
    }
  }
}

function generateEmptyGrid(cols, rows) {
  let emptyArray = [];
  for (let y = 0; y < rows; y++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x++) {
      emptyArray[y].push(0);
    }
  }
  return emptyArray;
}