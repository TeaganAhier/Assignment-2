let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

let gameStarted = false;

const main = document.querySelector('main');
const startDiv = document.querySelector('.startDiv');
const startButton = document.querySelector('.start');

// Game Over Screen Div
const gameOverDiv = document.querySelector('#gameOverDiv');


startButton.addEventListener('click', hideStartScreen);

// Player = 2, Wall = 1, Enemy = 3, Point = 0
let maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Function to hide the start screen and start the game
function hideStartScreen() {
    startDiv.style.display = 'none';
    gameStarted = true;
    startGame(); // Call startGame to initialize the game
}



function startGame() {
    main.innerHTML = ''; // Clear the board
    for (let row of maze) {
        for (let cell of row) {
            let block = document.createElement('div');
            block.classList.add('block');

            switch (cell) {
                case 1:
                    block.classList.add('wall');
                    break;
                case 2:
                    block.id = 'player';
                    let mouth = document.createElement('div');
                    mouth.classList.add('mouth');
                    block.appendChild(mouth);
                    break;
                case 3:
                    block.classList.add('enemy');
                    break;
                default:
                    block.classList.add('point');
                    block.style.height = '1vh';
                    block.style.width = '1vh';
            }

            main.appendChild(block);
        }
    }
}
createEnemy(); // Create an enemy at the start
createEnemy(); // Create another enemy at the start
createEnemy(); // Create another enemy at the start


// Populate the maze
for (let row of maze) {
    for (let cell of row) {
        let block = document.createElement('div');
        block.classList.add('block');

        switch (cell) {
            case 1:
                block.classList.add('wall');
                break;
            case 2:
                block.id = 'player';
                let mouth = document.createElement('div');
                mouth.classList.add('mouth');
                block.appendChild(mouth);
                break;
            case 3:
                block.classList.add('enemy');
                break;
            default:
                block.classList.add('point');
                block.style.height = '1vh';
                block.style.width = '1vh';
        }

        main.appendChild(block);
    }
}

// Player movement flags
function keyDown(event) {
    if (event.key === 'ArrowUp') upPressed = true;
    else if (event.key === 'ArrowDown') downPressed = true;
    else if (event.key === 'ArrowLeft') leftPressed = true;
    else if (event.key === 'ArrowRight') rightPressed = true;
}

function keyUp(event) {
    if (event.key === 'ArrowUp') upPressed = false;
    else if (event.key === 'ArrowDown') downPressed = false;
    else if (event.key === 'ArrowLeft') leftPressed = false;
    else if (event.key === 'ArrowRight') rightPressed = false;
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function moveEnemy(enemy) {
    let position = enemy.getBoundingClientRect();
    let newRight = position.right + 1;
    let topR = document.elementFromPoint(newRight, position.top);
    let btmR = document.elementFromPoint(newRight, position.bottom);

    if (!topR.classList.contains('wall') && !btmR.classList.contains('wall')) {
        playerLeft++;
        player.style.left = playerLeft + 'px';
    }
    playerMouth.classList = 'right';
}


const player = document.querySelector('#player');
const playerMouth = player.querySelector('.mouth');
let playerTop = 0;
let playerLeft = 0;

// Score tracking
let score = 0;
const scoreEl = document.querySelector('.score p');

// Function to show the game over screen
function showGameOverScreen() {
    gameOverDiv.style.display = 'flex'; // Show the Game Over screen
    gameStarted = false; // Stop the game loop
}

// Function to reset the game
function restartGame() {
    score = 0;
    scoreEl.textContent = score;
    gameStarted = true;

    // Hide Game Over screen
    gameOverDiv.style.display = 'none';

    // Reset player position and other elements if needed
    playerTop = 0;
    playerLeft = 0;
    player.style.top = playerTop + 'px';
    player.style.left = playerLeft + 'px';

    // Recreate the maze or reset points and enemies if needed
    main.innerHTML = ''; // Clear the board
    // Rebuild the maze here
    startGame(); // Rebuild the maze and start the game
}

// Event listener for the restart button
document.querySelector('#restartButton').addEventListener('click', restartGame);

// Game Loop
setInterval(function () {
    if (!gameStarted) return;

    // DOWN
    if (downPressed) {
        let position = player.getBoundingClientRect();
        let newBottom = position.bottom + 1;
        let btmL = document.elementFromPoint(position.left, newBottom);
        let btmR = document.elementFromPoint(position.right, newBottom);

        if (!btmL.classList.contains('wall') && !btmR.classList.contains('wall')) {
            playerTop++;
            player.style.top = playerTop + 'px';
        }
        playerMouth.classList = 'down';
    }
    // UP
    else if (upPressed) {
        let position = player.getBoundingClientRect();
        let newTop = position.top - 1;
        let topL = document.elementFromPoint(position.left, newTop);
        let topR = document.elementFromPoint(position.right, newTop);

        if (!topL.classList.contains('wall') && !topR.classList.contains('wall')) {
            playerTop--;
            player.style.top = playerTop + 'px';
        }
        playerMouth.classList = 'up';
    }
    // LEFT
    else if (leftPressed) {
        let position = player.getBoundingClientRect();
        let newLeft = position.left - 1;
        let topL = document.elementFromPoint(newLeft, position.top);
        let btmL = document.elementFromPoint(newLeft, position.bottom);

        if (!topL.classList.contains('wall') && !btmL.classList.contains('wall')) {
            playerLeft--;
            player.style.left = playerLeft + 'px';
        }
        playerMouth.classList = 'left';
    }
    // RIGHT
    else if (rightPressed) {
        let position = player.getBoundingClientRect();
        let newRight = position.right + 1;
        let topR = document.elementFromPoint(newRight, position.top);
        let btmR = document.elementFromPoint(newRight, position.bottom);

        if (!topR.classList.contains('wall') && !btmR.classList.contains('wall')) {
            playerLeft++;
            player.style.left = playerLeft + 'px';
        }
        playerMouth.classList = 'right';
    }

    // Point collision & score update
    const position = player.getBoundingClientRect();
    const points = document.querySelectorAll('.point');
    for (let i = 0; i < points.length; i++) {
        const ptRect = points[i].getBoundingClientRect();
        if (
            position.right > ptRect.left &&
            position.left < ptRect.right &&
            position.bottom > ptRect.top &&
            position.top < ptRect.bottom
        ) {
            points[i].classList.remove('point');
            score++;
            scoreEl.textContent = score;
        }
    }

    // Check for collision with enemies (game over if collision occurs)
    const enemies = document.querySelectorAll('.enemy');
    for (let i = 0; i < enemies.length; i++) {
        const enemyRect = enemies[i].getBoundingClientRect();
        if (
            position.right > enemyRect.left &&
            position.left < enemyRect.right &&
            position.bottom > enemyRect.top &&
            position.top < enemyRect.bottom
        ) {
            // Trigger death animation when collision occurs
            player.classList.add('dead'); // Add the "dead" class to start the animation
            showGameOverScreen();  // Show Game Over if player hits an enemy
            return; // Stop the game loop
        }
    }

    // Check if all points are collected (game over condition)
    if (points.length === 0) {
        showGameOverScreen(); // Show Game Over if all points are collected
    }

}, 10);
