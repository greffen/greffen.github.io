// Character in 2D Grid
// Dan Schellenberg
// Apr 15, 2024


let grid = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1,],
            [0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0,],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
            [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1,],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1,],
            [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1,],
            [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1,],
            [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1,],
            [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1,],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1,],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1,],
let cellSize;
const GRID_SIZE = 10;
const PLAYER = 9;
const BLOCK = 1;
const OPEN_TILE = 0;
let player = {
  x: 0,
  y: 0,
};
let grassIMG;
let pavementIMG;
let backgroundMusic;
let cantWalkSound;
let state = "start screen";

function preload() {
  grassIMG = loadImage("grass.jpg");
  pavementIMG = loadImage("pavement.jpg");
  backgroundMusic = loadSound("backgroundMusic.mp3");
  cantWalkSound = loadSound("ough.wav");
}

function setup() {
  //make the canvas the largest square possible
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }

  //if randomizing the grid, do this:
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  
  //this is dumb -- should check if this is the right size!
  cellSize = height/grid.length;

  //add player to the grid
  grid[player.y][player.x] = PLAYER;

  //equalize audio
  backgroundMusic.setVolume(0.4);
  cantWalkSound.setVolume(0.7);
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
    background("black");
  }
  else if (state === "game") {
    background(220);
    displayGrid();
  }
}

function keyPressed() {
  if (key === " " && state === "start screen") {
    state = "game";
    backgroundMusic.loop();
  }

  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }

  if (key === "w") {
    movePlayer(player.x + 0, player.y - 1); //0 on x axis, -1 on y axis (i.e. up)
  }

  if (key === "a") {
    movePlayer(player.x - 1, player.y + 0); //-1 on x axis, 0 on y axis (i.e. left)
  }

  if (key === "s") {
    movePlayer(player.x + 0, player.y + 1); //0 on x axis, 1 on y axis (i.e. down)
  }

  if (key === "d") {
    movePlayer(player.x + 1, player.y + 0); //0 on x axis, -1 on y axis (i.e. right)
  }
}

function movePlayer(x, y) {
  //dont move off the grid check and at the end check that the tile is OPEN_TILE
  if (x < GRID_SIZE && y < GRID_SIZE &&
    x >= 0 && y >= 0 && grid[y][x] === OPEN_TILE) {
    //old player tile
    let oldx = player.x;
    let oldy = player.y;

    //move the player
    player.x = x;
    player.y = y;

    //reset old player tile to OPEN_TILE
    grid[oldy][oldx] = OPEN_TILE;
    
    grid[player.y][player.x] = PLAYER;

  }
  else {
    cantWalkSound.play();
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
        image(grassIMG, x * cellSize, y * cellSize, cellSize);
      }
      else if (grid[y][x] === OPEN_TILE) {
        image(pavementIMG, x * cellSize, y * cellSize, cellSize);
      }
      else if(grid[y][x] === PLAYER) {
        fill ("red");
        square(x * cellSize, y * cellSize, cellSize);
      }
    }
  }
}

function generateRandomGrid(cols, rows) {
  let emptyArray = [];
  for (let y = 0; y < rows; y++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x++) {
      //half the time, be a 1. Other half, be a 0.
      if (random(100) < 50) {
        emptyArray[y].push(0);
      }
      else {
        emptyArray[y].push(1);
      }
    }
  }
  return emptyArray;
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