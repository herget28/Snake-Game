const playBoard = document.querySelector(".playboard")
const restartButton = document.getElementById("restart")
const scoreDisplay = document.getElementById("score")
const highscoreDisplay = document.getElementById("highscore")
const restartDiv = document.querySelector(".restart-div") 
const gameOverMessage = document.querySelector(".game-over") 
let width = 10
let currentSnake = [2, 1, 0]
let direction = 1
let appleIndex = 0
let score = 0
let highscore = 0
let intervalTime = 0
let speed = 0.5

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("keyup", gameControl)
  createSquareGrid()
  startGame()
  restartButton.addEventListener("click", restartGame)
  localStorage.clear()
})
function createSquareGrid() {
  restartDiv.style.display = "none"
  for (let i = 0; i < 100; i++) {
    const step = document.createElement("div")
    playBoard.appendChild(step)
  }
}
function startGame() {
  let squares = document.querySelectorAll(".playboard div")
  generateApples(squares)
  direction = 1
  scoreDisplay.textContent = score 
  highscoreDisplay.textContent = highscore
  intervalTime = 1000
  currentSnake = [2, 1, 0]
  currentSnake.forEach((index) => squares[index].classList.add("snake")) //display snake to the browser
  interval = setInterval(moveResult, intervalTime) //move snake with 1000 milliseconds
}
function moveResult() {
  let squares = document.querySelectorAll(".playboard div")
  if (checkForCollision(squares)) {
    clearInterval(interval)
    gameOver()
  } else {
    moveSnake(squares)
  }
}
function gameOver() {
  restartDiv.style.display="flex" 
  setTimeout(500)
  gameOverMessage.style.display="block"
  restartButton.addEventListener("click", restartGame)
}
function moveSnake(squares) {
  let tail = currentSnake.pop()
  squares[tail].classList.remove("snake") //remove snake from last element
  currentSnake.unshift(currentSnake[0] + direction) //add square to the direction we are heading
  eatApple(squares, tail)
  squares[currentSnake[0]].classList.add("snake") //add snake to the direction we are heading
}
function checkForCollision(squares) {
  if (
    (currentSnake[0] + width >= width * width && direction === width) ||
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width <= 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains("snake")
  ) {
    return true
  } else {
    return false
  }
}
function eatApple(squares, tail) {
  if (squares[currentSnake[0]].classList.contains("apple")) {
    //if snake eats the apple
    squares[currentSnake[0]].classList.remove("apple") //remove apple
    squares[tail].classList.add("snake") //resize the snake
    currentSnake.push(tail) //resize the array
    generateApples(squares) //generate an apple from random position
    score++; //increment the score
    scoreDisplay.textContent = score
    clearInterval(interval)
    intervalTime = intervalTime * speed
    interval = setInterval(moveResult, intervalTime) //increase the snake speed
    highscore = JSON.parse(localStorage.getItem("highscore"))
    if (highscore < score) {
        highscore = score
        localStorage.setItem("highscore", JSON.stringify(highscore))
        highscoreDisplay.textContent = highscore
    }
  }
}
function generateApples(squares) {
  do {
    appleIndex = Math.floor(Math.random() * squares.length)
  } while (squares[appleIndex].classList.contains("snake"))
  squares[appleIndex].classList.add("apple")
}

function gameControl(e) {
  const LEFT_KEY = 37
  const RIGHT_KEY = 39
  const UP_KEY = 38
  const DOWN_KEY = 40
  if (e.keyCode === RIGHT_KEY) {
    direction = 1 //snake will go one step to the right direction
  } else if (e.keyCode === UP_KEY) {
    direction = -width //snake will go ten step to the upward direction
  } else if (e.keyCode === LEFT_KEY) {
    direction = -1 //snake will go one step to the left direction
  } else if (e.keyCode === DOWN_KEY) {
    direction = +width //snake will go ten step to the downward direction
  }
}
function restartGame() {
  playBoard.innerHTML = ""
  gameOverMessage.style.display = "none"
  score = 0
  createSquareGrid()
  startGame()
  restartDiv.style.display = "none"
}
