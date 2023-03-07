const grid = document.querySelector(".grid");
const startButton = document.getElementById("start");
const scoreDisplay = document.getElementById("score");
const width = 10;
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.5;
let timerId = 0;

function createSquareGrid() {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
}

createSquareGrid();

// add snake class 
currentSnake.forEach((i) => squares[i].classList.add("snake"));

function startGame() {
  // remove snake class
  currentSnake.forEach((i) => squares[i].classList.remove("snake"));
  // remove apple class
  squares[appleIndex].classList.remove("apple");
  // display score 
  scoreDisplay.textContent = score;
  clearInterval(timerId);
  currentSnake = [2, 1, 0];
  score = 0;
  direction = 1;
  intervalTime = 1000;
  //regenerate apple
  generateApples();
  // re-add snake class
  currentSnake.forEach((i) => squares[i].classList.add("snake"));
  timerId = setInterval(move, intervalTime);
}

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) || // if snake has reached bottom wall
    (currentSnake[0] % width === width - 1 && direction === 1) || // if snake has reached right wall
    (currentSnake[0] % width === 0 && direction === -1) || // if snake has reached left wall
    (currentSnake[0] - width < 0 && direction === -width) || // if snake has reached top wall
    squares[currentSnake[0] + direction].classList.contains("snake")
  )
    return clearInterval(timerId);

  // remove last element from currentSnake array
  const tail = currentSnake.pop();
  // remove snake class from last element
  squares[tail].classList.remove("snake");
  // add square in direction we are moving
  currentSnake.unshift(currentSnake[0] + direction);

  if (squares[currentSnake[0]].classList.contains("apple")) {
    // remove apple class
    squares[currentSnake[0]].classList.remove("apple");
    // grow the snake by adding a snake class
    squares[tail].classList.add("snake");
    // grow array size of snake
    currentSnake.push(tail);
    // generate new apple
    generateApples();
    // add one score
    score++;
    // display the score
    scoreDisplay.textContent = score;
    clearInterval(timerId);
    // increase speed of the snake
    intervalTime = intervalTime * speed;
    timerId = setInterval(move, intervalTime);
  }
  // add snake class to make it visible
  squares[currentSnake[0]].classList.add("snake");
}

function generateApples() {
  do {
    // generate a random number
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}
generateApples();
function control(e) {
  if (e.keyCode === 39) {
    console.log("right pressed");
    direction = 1;
  } else if (e.keyCode === 38) {
    direction = -width;
    console.log("Up pressed");
  } else if (e.keyCode === 37) {
    console.log("left pressed");
    direction = -1;
  } else if (e.keyCode === 40) {
    console.log("down pressed");
    direction = +width;
  }
}
document.addEventListener("keyup", control);
startButton.addEventListener("click", startGame);
