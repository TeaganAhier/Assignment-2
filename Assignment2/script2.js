let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;


let gameStarted = false;

const main = document.querySelector('main');
const startDiv = document.querySelector('.startDiv');
const startButton = document.querySelector('.start');


let maze = [];
let player;
let playerMouth;
let playerTop = 0;
let playerLeft = 0;
let score = 0;
let livesCount = 3;
let isInvulnerable = false; 
let difficulty = 1;

const scoreEl = document.querySelector('.score p');

const levelEl = document.createElement('p');
levelEl.textContent = `Level: ${difficulty}`;
scoreEl.parentElement.appendChild(levelEl); // Append it under the score counter

startButton.addEventListener('click', hideStartScreen);
restartButton.addEventListener('click', restartGame);


lbttn.addEventListener('click', lbttnClick);
ubttn.addEventListener('click', ubttnClick);
rbttn.addEventListener('click', rbttnClick);
dbttn.addEventListener('click', dbttnClick); 




// Get all scores from localStorage and create an array of objects
updateLeaderboard(); // Call this function to update the leaderboard




function updateLeaderboard() {
    let scores = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = parseInt(localStorage.getItem(key));
        scores.push({ name: key, score: value });
    }
    // Sort scores from highest to lowest
    scores.sort((a, b) => b.score - a.score);
    scores.splice(5); // Keep only the top 10 scores
    // Clear existing leaderboard
    const leaderboard = document.querySelector('.leaderboard');
    const leaderboardOl = document.querySelector('.leaderboard ol');
    if (leaderboardOl) {
        leaderboardOl.innerHTML = '';
        // Add sorted scores with numbers
        scores.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name}: ${item.score}`;
            leaderboardOl.appendChild(li);
    });
}}

startGame();
gameStarted = false;
score = 0;
livesCount = 3;



function hideStartScreen() {
    startDiv.style.display = 'none';
    gameStarted = true;
    console.log('Game started');
}


function updateLevelCounter() {
    levelEl.textContent = `Level: ${difficulty}`;
}

function startGame() {
    updateLeaderboard(); // Update the leaderboard when the game starts
    updateLevelCounter(); // Update the level counter

    maze = [
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
    
    for (let i = 0; i < difficulty; i++) {
        createEnemy(maze);
    }
    
    //Populates the maze in the HTML
    for (let y of maze) {
        for (let x of y) {
            let block = document.createElement('div');
            block.classList.add('block');
    
            switch (x) {
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
        
    player = document.querySelector('#player');
    playerMouth = player.querySelector('.mouth');
    playerTop = 0;
    playerLeft = 0;
    lives(); // Update lives display
    upPressed = false;
    downPressed = false;
    leftPressed = false;
    rightPressed = false;
    scoreEl.textContent = score;

    gameStarted = true;

}

function createEnemy(maze) {
    const row = Math.floor(Math.random() * maze.length);
    const column = Math.floor(Math.random() * maze[row].length);

    if (maze[row][column] === 0) {
        maze[row][column] = 3; // Place an enemy
    }
    else {
        createEnemy(maze); // Try again if the cell is not empty

    }
}

function nextLevel() {
    gameStarted = false; 
    difficulty++;
    console.log(`Difficulty increased to: ${difficulty}`);
    startDiv.style.display = 'flex'; // Changed to flex
    startDiv.style.justifyContent = 'center'; // Center horizontally
    startDiv.style.alignItems = 'center'; // Center vertically
    startDiv.querySelector('h1').textContent = 'Next Level!';
    main.innerHTML = '';
    if (livesCount < 3) {
        livesCount++;
        lives();
    }
    startGame();
    gameStarted = false;
}

function showGameOverScreen() {
    gameOverDiv.style.display = 'flex'; // Show the Game Over screen
    gameStarted = false; // Stop the game loop
    const name = prompt("Enter your name:");
    console.log(`Player Name: ${name}, Score: ${score}`);
    localStorage.setItem(name, score);
    difficulty = 1; // Reset difficulty
    score = 0;
    livesCount = 3; // Reset lives count
}

function restartGame() {
    gameOverDiv.style.display = 'none'; // Hide the Game Over screen
    main.innerHTML = ''; // Clear the maze
    startGame(); // Restart the game
}

// Add lbttn functionality
function lbttnClick() {
    const handleMouseDown = () => {
        leftPressed = true;
        rightPressed = false; 
        upPressed = false;
        downPressed = false;
    };
    
    const handleMouseUp = () => {
        leftPressed = false;
    };

    lbttn.addEventListener('mousedown', handleMouseDown);
    lbttn.addEventListener('mouseup', handleMouseUp);
    lbttn.addEventListener('mouseleave', handleMouseUp);
}

function ubttnClick() {
    const handleMouseDown = () => {
        upPressed = true;
        downPressed = false;
        leftPressed = false;
        rightPressed = false;
    };
    
    const handleMouseUp = () => {
        upPressed = false;
    };

    ubttn.addEventListener('mousedown', handleMouseDown);
    ubttn.addEventListener('mouseup', handleMouseUp);
    ubttn.addEventListener('mouseleave', handleMouseUp);
}

function rbttnClick() {
    const handleMouseDown = () => {
        rightPressed = true;
        leftPressed = false;
        upPressed = false;
        downPressed = false;
    };
    
    const handleMouseUp = () => {
        rightPressed = false;
    };

    rbttn.addEventListener('mousedown', handleMouseDown);
    rbttn.addEventListener('mouseup', handleMouseUp);
    rbttn.addEventListener('mouseleave', handleMouseUp);
}

function dbttnClick() {
    const handleMouseDown = () => {
        downPressed = true;
        upPressed = false;
        leftPressed = false;
        rightPressed = false;
    };
    
    const handleMouseUp = () => {
        downPressed = false;
    };

    dbttn.addEventListener('mousedown', handleMouseDown);
    dbttn.addEventListener('mouseup', handleMouseUp);
    dbttn.addEventListener('mouseleave', handleMouseUp);
}


//Player movement
function keyUp(event) {
    if (event.key === 'ArrowUp') {
        upPressed = false;
    } else if (event.key === 'ArrowDown') {
        downPressed = false;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = false;
    } else if (event.key === 'ArrowRight') {
        rightPressed = false;
    }
}

function keyDown(event) {
    if (event.key === 'ArrowUp') {
        upPressed = true;
    } else if (event.key === 'ArrowDown') {
        downPressed = true;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = true;
    } else if (event.key === 'ArrowRight') {
        rightPressed = true;
    }
}


// Store directions for each enemy
const enemyDirections = []; // 0: up, 1: down, 2: left, 3: right
const directionChangeInterval = 100; // Change direction every ~1 second
let moveCounter = 0;

function randomlyMoveEnemy(enemy) {
    const enemies = document.querySelectorAll('.enemy');
    const currentEnemy = enemies[enemy];
    const currentTop = parseInt(currentEnemy.style.top) || 0;
    const currentLeft = parseInt(currentEnemy.style.left) || 0;
    const enemyRect = currentEnemy.getBoundingClientRect();

    // Initialize direction if not set
    if (enemyDirections[enemy] === undefined) {
        enemyDirections[enemy] = Math.floor(Math.random() * 4);
    }

    // Periodically change direction
    moveCounter++;
    if (moveCounter >= directionChangeInterval) {
        moveCounter = 0;
        enemyDirections[enemy] = Math.floor(Math.random() * 4);
    }

    // Check for collision with other enemies
    function willCollideWithEnemy(newX, newY) {
        const buffer = 5; // Small buffer to prevent overlap
        for (let i = 0; i < enemies.length; i++) {
            if (i === enemy) continue; // Skip self
            const otherRect = enemies[i].getBoundingClientRect();
            if (
                newX + enemyRect.width > otherRect.left - buffer &&
                newX < otherRect.right + buffer &&
                newY + enemyRect.height > otherRect.top - buffer &&
                newY < otherRect.bottom + buffer
            ) {
                return true;
            }
        }
        return false;
    }

    let topL = document.elementFromPoint(enemyRect.left, enemyRect.top);
    let topR = document.elementFromPoint(enemyRect.right, enemyRect.top);
    let btmL = document.elementFromPoint(enemyRect.left, enemyRect.bottom);
    let btmR = document.elementFromPoint(enemyRect.right, enemyRect.bottom);
    
    switch (enemyDirections[enemy]) {
        case 0: // Up
            if (!topL?.classList.contains('wall') && !topR?.classList.contains('wall') && 
                !willCollideWithEnemy(enemyRect.left, enemyRect.top - 1)) {
                currentEnemy.style.top = (currentTop - 1) + 'px';
            } else {
                enemyDirections[enemy] = Math.floor(Math.random() * 4);
            }
            break;
        case 1: // Down
            if (!btmL?.classList.contains('wall') && !btmR?.classList.contains('wall') &&
                !willCollideWithEnemy(enemyRect.left, enemyRect.top + 1)) {
                currentEnemy.style.top = (currentTop + 1) + 'px';
            } else {
                enemyDirections[enemy] = Math.floor(Math.random() * 4);
            }
            break;
        case 2: // Left
            if (!topL?.classList.contains('wall') && !btmL?.classList.contains('wall') &&
                !willCollideWithEnemy(enemyRect.left - 1, enemyRect.top)) {
                currentEnemy.style.left = (currentLeft - 1) + 'px';
            } else {
                enemyDirections[enemy] = Math.floor(Math.random() * 4);
            }
            break;
        case 3: // Right
            if (!topR?.classList.contains('wall') && !btmR?.classList.contains('wall') &&
                !willCollideWithEnemy(enemyRect.left + 1, enemyRect.top)) {
                currentEnemy.style.left = (currentLeft + 1) + 'px';
            } else {
                enemyDirections[enemy] = Math.floor(Math.random() * 4);
            }
            break;
    }
}


function lives() {
    // Clear existing hearts
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach(heart => heart.remove());
    const lives = document.querySelector('.lives');
    for (let i = 0; i < livesCount; i++) {
        // Create a new heart list item
        const heart = document.createElement('li');
        heart.classList.add('heart');
        // Append the heart to the lives list
        lives.appendChild(heart);
    }
}

function loseLife() {
    if (isInvulnerable) return; // Don't lose life if invulnerable
    
    livesCount--;
    lives();
    console.log(`Lives left: ${livesCount}`);
    
    if (livesCount <= 0) {
        showGameOverScreen();
    } else {
        // Make player invulnerable and show hit animation
        isInvulnerable = true;
        player.classList.add('hit');
        
        // Disable movement
        upPressed = false;
        downPressed = false;
        leftPressed = false;
        rightPressed = false;
        
        // Remove hit animation and re-enable movement after 1.5 seconds
        setTimeout(() => {
            player.classList.remove('hit');
        }, 1000);
        
        // Remove invulnerability after 2 seconds
        setTimeout(() => {
            isInvulnerable = false;
        }, 2500);

        // Temporarily disable keyboard and button controls
        document.removeEventListener('keydown', keyDown);
        document.removeEventListener('keyup', keyUp);
        
        // Re-enable controls after 1.5 seconds
        setTimeout(() => {
            document.addEventListener('keydown', keyDown);
            document.addEventListener('keyup', keyUp);
        }, 1500);
    }
}










setInterval(function() {
    if (!gameStarted) return; // Prevents movement if the game hasn't started

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

    // Move enemies randomly
    const enemies = document.querySelectorAll('.enemy');
    for (let i = 0; i < enemies.length; i++) {
        randomlyMoveEnemy(i);
    }

    // Check for collision with enemies (game over if collision occurs)
    for (let i = 0; i < enemies.length; i++) {
        const enemyRect = enemies[i].getBoundingClientRect();
        if (
            position.right > enemyRect.left &&
            position.left < enemyRect.right &&
            position.bottom > enemyRect.top &&
            position.top < enemyRect.bottom
        ) {
            loseLife();

        }
    }

    // Check if all points are collected (game over condition)
    if (points.length === 0) {
        nextLevel(); // Show Game Over if all points are collected
    }

}, 10);

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);