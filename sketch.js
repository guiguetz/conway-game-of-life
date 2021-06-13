const colors = {
  green: '#59981a',
  yellowGreen: '#ecf87f',
  limeGreen: '#81b622',
  oliveGreen: '#3d550c',
};

let canvasSize = 350;
const gridSize = 12;
let cellSize = canvasSize / gridSize;
let timer;
let generation = 0;

let grid;

function recalculateSizes() {
  canvasSize = floor(windowWidth * 0.5 > 450 ? 450 : windowWidth * 0.5);
  cellSize = canvasSize / gridSize;
}

function windowResized() {
  recalculateSizes();
  resizeCanvas(canvasSize, canvasSize);
}

function setup() {
  document.getElementById('generation').textContent = generation;
  recalculateSizes();
  const canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent('container');

  background(colors.green);
  noLoop();

  grid = make2DArray();
}

function draw() {
  let next = grid;
  generation += 1;
  document.getElementById('generation').textContent = generation;

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      fill(Boolean(next[j][i]) ? colors.limeGreen : colors.oliveGreen);
      rect(cellSize * i, cellSize * j, cellSize, cellSize);
    }
  }

  console.groupCollapsed('Computing...');
  console.table(grid);
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      console.groupCollapsed(`(${i},${j})`);
      let neighbours = countNeighbors(grid, i, j);
      if (Boolean(grid[i][j])) {
        console.log('Status: 😐');
        console.log('Less than 2 neighbours?', neighbours < 2);
        console.log('More than 3 neighbours?', neighbours > 3);
        next[i][j] = Boolean(neighbours < 2 || neighbours > 3) ? 0 : 1;
      } else {
        console.log('Status: 💀');
        next[i][j] = Boolean(neighbours === 3) ? 1 : 0;
      }
      console.log(`Next Status: ${Boolean(next[i][j]) ? '😐' : '💀'}`);
      console.groupEnd();
    }
  }
  console.groupEnd();
}

function make2DArray() {
  let cols = new Array(gridSize);
  for (let i = 0; i < gridSize; i++) {
    cols[i] = [];
    for (let j = 0; j < gridSize; j++) {
      cols[i][j] = random([0, 1]);
    }
  }
  console.table(cols);
  return cols;
}

function countNeighbors(grid, x, y) {
  console.groupCollapsed(`Counting neighbors...`);
  let aliveNeighbors = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const isSelf = i === 0 && j === 0;
      const insideHorizontal = x + i >= 0 && x + i < gridSize;
      const insideVertical = y + j >= 0 && y + j < gridSize;

      if (insideHorizontal && insideVertical && !isSelf) {
        console.log(`(${x + i},${y + j}): ${grid[x + i][y + j]}`);
        aliveNeighbors += grid[x + i][y + j];
      }
    }
  }
  console.log('Total:', aliveNeighbors);
  console.groupEnd();
  return aliveNeighbors;
}

function start() {
  document.getElementById('btn-start').disabled = true;
  document.getElementById('btn-stop').disabled = false;
  document.getElementById('btn-run-1').disabled = true;
  document.getElementById('btn-run-5').disabled = true;
  document.getElementById('btn-run-10').disabled = true;
  timer = setInterval(() => {
    draw();
  }, 150);
}

function run(times = 1) {
  let counter = 0;

  document.getElementById('btn-start').disabled = true;
  document.getElementById('btn-stop').disabled = false;
  document.getElementById('btn-run-1').disabled = true;
  document.getElementById('btn-run-5').disabled = true;
  document.getElementById('btn-run-10').disabled = true;

  timer = setInterval(() => {
    if (counter === times) {
      stop();
    } else {
      draw();
      counter += 1;
    }
  }, 150);
}

function stop() {
  clearInterval(timer);
  document.getElementById('btn-start').disabled = false;
  document.getElementById('btn-stop').disabled = true;
  document.getElementById('btn-run-1').disabled = false;
  document.getElementById('btn-run-5').disabled = false;
  document.getElementById('btn-run-10').disabled = false;
}

function reset() {
  stop();
  generation = 0;
  grid = make2DArray();
  draw();
}
