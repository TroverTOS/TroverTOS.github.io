const container = document.getElementById('container');
let scoreDisplay = document.querySelector('.scoreDisplay')
let currentSnake = [2, 1, 0];
let snake = 1;
let direction = 1;
let score = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;
let width = 8;

function createRows(rows,columns) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-columns', columns);
    for (let i = 0; i <(rows * columns); i++) {
        let cell = document.createElement("div");
        container.appendChild(cell).className = 'grid-item'
    };
};

console.log('function loaded' + container)
console.log('function called and suceeded')
const start = 450
function startGame() {
    let square = document.querySelectorAll('.grid-item')
    randomApple(square)
    direction = 1
    scoreDisplay.innerHTML = score
    intervalTime= 1000
    currentSnake = [2,1,0];
    currentSnake.forEach((index) => square[index].classList.add('snake'));
    interval = setInterval(moveOutcome, intervalTime); 
}

function moveOutcome() {
    let square = document.querySelectorAll('.grid-item');
    if (checkForHits(square)) {
        alert('You hit something.')
        return clearInterval(interval);
    } else {
        moveSnake(square)
    }
}

function moveSnake() {
    let square = document.querySelectorAll('.grid-item');
    let back = currentSnake.pop();
    square[back].classList.remove(snake)
    currentSnake.unshift(currentSnake[0] + direction);
    eatApple(square,back);
    square[currentSnake[0]].classList.add('snake')  
}

function checkForHits(square) {

    console.log(square.length)
    if (
      (currentSnake[0] + width >= width * width && direction === width) ||
      (currentSnake[0] % width === width - 1 && direction === 1) ||
      (currentSnake[0] % width === 0 && direction === -1) ||
      (currentSnake[0] - width <= 0 && direction === -width) ||
      square[currentSnake[0] + direction].classList.contains("snake")
    ) {
      return true;
    } else {
      return false;
    }
  }

  function eatApple(square, back) {
    if (square === null || square === undefined) {
        return
    }
    if (square[currentSnake[0]].classList.contains("apple")) {
      square[currentSnake[0]].classList.remove("apple");
      square[tail].classList.add("snake");
      currentSnake.push(tail);
      randomApple(square);
      score++;
      scoreDisplay.textContent = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcome, intervalTime);
    }
  }
  function randomApple(square) {
    if (square === null || square === undefined) {
        return
    }
    do {
        appleIndex = Math.floor(Math.random() * square.length);
    } while (square[appleIndex].classList.contains('snake'));
    square[appleIndex].classList.add('apple');
    }
console.log(direction)
console.log(width)

var KEYS = {
    A: 65,
    D: 68,
    W: 87,
    S: 83
}
document.onkeydown = function (e) {
    switch (e.keyCode) {
        case KEYS.A:
            direction = -1;
            break;
        case KEYS.D:
            direction = 1;
            break;
        case KEYS.W:
            direction = -width;
            break;
        case KEYS.S:
            direction = width;
            break;
    }
}

console.log('no error?')
createRows(30,30)
startGame()
moveOutcome()
moveSnake()
checkForHits()
eatApple()
randomApple()


