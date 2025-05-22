// Starting with no buttons pressed (Both player and enemy) - Prevents any bugs when the game starts
let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
let wPressed = false;
let sPressed = false;
let aPressed = false;
let dPressed = false;

// Game started flag initially set to false
let gameStarted = false;

// Setting up the button variables
const main = document.querySelector('main');
const startDiv = document.querySelector('.startDiv');
const startButton = document.querySelector('.start');
const onePlayer = document.querySelector('.onePlayer');
const twoPlayer = document.querySelector('.twoPlayer');
const lightModeButton = document.querySelector('.lightMode');


// Creating variables for the game
let maze = [];
let player;
let playerMouth;
let playerTop = 0;
let playerLeft = 0;
let enemyTop = 0;
let enemyLeft = 0;
let score = 0;
let livesCount = 3;
let isInvulnerable = false; 
let difficulty = 1;
let twoPlayerMode = false;
let isLightMode = false;

// Creating variables for text fields for score and level
const scoreEl = document.querySelector('.score p');
const levelEl = document.querySelector('.level');

// Setting up buttons to their functions
startButton.addEventListener('click', hideStartScreen);
restartButton.addEventListener('click', restartGame);
lightModeButton.addEventListener('click', lightModeSwitch);
onePlayer.addEventListener('click', onePlay);
twoPlayer.addEventListener('click', twoPlay);
startDiv.style.display = 'none';

// Create listeners for the on screen buttons for movement
lbttn.addEventListener('click', lbttnClick);
ubttn.addEventListener('click', ubttnClick);
rbttn.addEventListener('click', rbttnClick);
dbttn.addEventListener('click', dbttnClick); 

// Function that hides the player selection screen and shows the start screen based on the selected mode
function onePlay(){
    onePlayer.style.display = 'none'; // Hide the two buttons
    twoPlayer.style.display = 'none';
    startDiv.style.display = 'flex'; // Display the start screen
}
function twoPlay(){
    onePlayer.style.display = 'none'; // Hide the two buttons
    twoPlayer.style.display = 'none';
    twoPlayerMode = true  // Set the game mode to two-player
    startDiv.style.display = 'flex'; // Display the start screen
}

function hideStartScreen() {  // Works when the start button is clicked
    startDiv.style.display = 'none'; // Hide the start screen and set the game to start
    gameStarted = true;
}



function lightModeSwitch() { // Function that switches between light and dark mode
    const body = document.body; // Get the body element
    isLightMode = body.classList.toggle('light-mode'); // Toggle the light mode class on the body 
    const buttonText = isLightMode ? 'Dark Mode' : 'Light Mode';  // Set the button text based on the mode
    lightModeButton.textContent = buttonText;  // Update the button text
    if (isLightMode) { // If light mode is enabled, change all the colors to black except the text we have set to white
        body.style.backgroundColor = '#ffffff'; 
        body.style.color = '#000000'; 
        body.style.transition = 'background-color 0.5s, color 0.5s'; 
        const points = document.querySelectorAll('.point');  // Get all the elements we want to keep the same
        var all = document.getElementsByTagName("*");
        const onePlayer = document.querySelector('.onePlayer h1');
        const twoPlayer = document.querySelector('.twoPlayer h1');
        const button = document.querySelectorAll('.button');
        const startButton = document.querySelector('.start h1');
        const gameOver = document.querySelector('#gameOverDiv h1');
        const gameOverp = document.querySelector('#gameOverDiv p');
        for (var i=0; i < all.length; i++) { // Loop through all the elements and set their color to black
            all[i].style.color = "black";
        }    
        onePlayer.style.color = "white";  // Set the color of the elements we want to white
        twoPlayer.style.color = "white";
        startButton.style.color = "white";
        gameOver.style.color = "white";
        gameOverp.style.color = "white";
        document.documentElement.style.setProperty('--mouthColor', 'white');
        for (var i=0; i < button.length; i++) {  // Loop through all the buttons and set their color to white
            button[i].style.backgroundColor = "white";
        }
        for (let i = 0; i < points.length; i++) {
            points[i].style.backgroundColor = '#000000';   // Set the color of the points to black
        }
    }
    else {  // Same thing but for dark mode
        body.style.backgroundColor = '#000000'; 
        body.style.color = '#ffffff'; 
        body.style.transition = 'background-color 0.5s, color 0.5s'; 
        var all = document.getElementsByTagName("*");
        const points = document.querySelectorAll('.point');
        const onePlayer = document.querySelector('.onePlayer h1');
        const twoPlayer = document.querySelector('.twoPlayer h1');
        for (var i=0; i < all.length; i++) {
            all[i].style.color = "white";
        }
        onePlayer.style.color = "white";
        twoPlayer.style.color = "white";
        document.documentElement.style.setProperty('--mouthColor', 'black');
        for (let i = 0; i < points.length; i++) {  
            points[i].style.backgroundColor = '#ffffff'; 
        }
    }

}


function updateLeaderboard() {  // Function that updates the leaderboard
    let scores = [];  // Array to hold the scores
    for (let i = 0; i < localStorage.length; i++) {  // Loop through the local storage and get the scores
        const key = localStorage.key(i);
        const value = parseInt(localStorage.getItem(key));
        scores.push({ name: key, score: value });
    }
    scores.sort((a, b) => b.score - a.score);  // Sort the scores in descending order
    scores.splice(5);   // Keep only the top 5 scores
    const leaderboardOl = document.querySelector('.leaderboard ol');  // Get the leaderboard element
    if (leaderboardOl) {
        leaderboardOl.innerHTML = '';
        
        scores.forEach((item, index) => {  // Loop through the scores and create a list item for each score
            const li = document.createElement('li');
            li.textContent = `${item.name}: ${item.score}`;
            leaderboardOl.appendChild(li);
    });
}}


startGame();  // Start the game to allow for maze generation and shows the start screen
gameStarted = false;  // Set the game to not started so that the player can select the mode



function generateMaze(level) {  // Function that generates the maze
    const size = 10;  // Size of the maze
    let grid = Array.from({length: size}, () => Array(size).fill(1));  // Create a grid filled with walls
  
    for (let i = 1; i < size - 1; i++) {  
      for (let j = 1; j < size - 1; j++) {
        grid[i][j] = 0;                     // Fill the grid with empty spaces
      }
    }
   
    const wallsCount = 10;  // Number of walls to be placed
  
    let coords = [];  // Array to hold the coordinates of the walls
    for (let i = 1; i < size - 1; i++)  
      for (let j = 1; j < size - 1; j++)
        coords.push([i, j]);        // Loop through the grid and add the coordinates to the array
    shuffle(coords);              // Shuffle the coordinates to randomize the wall placement
  
    for (let w = 0; w < wallsCount; w++) {
      const [x, y] = coords[w];         // Get the coordinates of the wall
      grid[x][y] = 1;                   // Set the wall in the grid 
    }
  
    let open = coords.slice(wallsCount);    // Get the remaining coordinates
    shuffle(open);    // Shuffle the coordinates again to randomize the placement of the player and enemies
    const [px, py] = open.pop();  // Get the coordinates of the player
    grid[px][py] = 2;       // Set the player in the grid
  
    for (let e = 0; e < level; e++) {       // Loop through the level and place the enemies
      const [ex, ey] = open.pop();      // Get the coordinates of the enemy
      grid[ex][ey] = 3;         // Set the enemy in the grid
    }
  
   
    if (!isConnected(grid, px, py)) {       // Check if the maze is connected
      return generateMaze(level);   // If not, generate a new maze
    }
  
    return grid;  // Return the generated maze
  }
  
function shuffle(a) {   // Function that shuffles the array
    for (let i = a.length - 1; i > 0; i--) {  
        const j = Math.floor(Math.random() * (i + 1));  // Get a random index
        [a[i], a[j]] = [a[j], a[i]];        // Swap the elements
    }
}
  
function isConnected(grid, sx, sy) {  // Function that checks if the maze is connected
    const n = grid.length;  // Get the size of the grid
    let visited = Array.from({length: n}, () => Array(n).fill(false)); // Create a visited array to keep track of the visited cells
    let queue = [[sx, sy]];   // Create a queue to hold the cells to be visited
    visited[sx][sy] = true;  // Mark the starting cell as visited

    while (queue.length) {  // While there are cells to be visited, continue the search 
        const [x, y] = queue.shift();
        for (let [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const nx = x + dx, ny = y + dy;
        if (
            nx >= 0 && nx < n &&
            ny >= 0 && ny < n &&
            !visited[nx][ny] &&
            grid[nx][ny] !== 1
        ) {
            visited[nx][ny] = true; 
            queue.push([nx, ny]);
        }
        }
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
        if (grid[i][j] === 0 && !visited[i][j]) {  // Check if there are any unvisited empty cells
            return false;  // If there are, return false
        }
        }
    }
    return true; // If all empty cells are visited, return true
}
  

function startGame() {  // Function that starts the game
    updateLeaderboard();   // Update the leaderboard upon starting the game
    updateLevelCounter();   // Update the level counter

    maze = generateMaze(difficulty);  // Generate the maze based on the difficulty level
    
    for (let y of maze) {  // Loop through the maze and create the blocks, and add the payer and enemies
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
    
    // Set some variables at the start of the game to remove any states that are left over from the last game
    player = document.querySelector('#player');  
    playerMouth = player.querySelector('.mouth');
    playerTop = 0;
    playerLeft = 0;
    enemyTop = 0;
    enemyLeft = 0;
    lives(); 
    upPressed = false;
    downPressed = false;
    leftPressed = false;
    rightPressed = false;
    wPressed = false;
    sPressed = false;
    aPressed = false;
    dPressed = false;
    scoreEl.textContent = score;

    // Set the game to started
    gameStarted = true;

}


function nextLevel() { // Function that shows the next level screen 
    gameStarted = false;   // Stop the game loop 
    difficulty++;  // Increase the difficulty level
    startDiv.style.display = 'flex';   // Show the start screen and says Next Level
    startDiv.style.justifyContent = 'center'; 
    startDiv.style.alignItems = 'center'; 
    startDiv.querySelector('h1').textContent = 'Next Level!';
    main.innerHTML = '';  // Clear the maze so that a new one can be generated
    if (livesCount < 3) {  // If the player has lost a life, add one
        livesCount++;
        lives();
    }
    startGame();  // Create a new maze and then stop the game so that the player can start
    gameStarted = false;
}
 
function showGameOverScreen() {  // Function that shows the game over screen
    gameOverDiv.style.display = 'flex'; 
    gameStarted = false;   // Stop the game loop
    const name = prompt("Enter your name:");  // Prompt the player for their name for the leaderboard
    localStorage.setItem(name, score);  // Set the score in the local storage
    difficulty = 1;  // Reset the difficulty level, score and lives count
    score = 0;
    livesCount = 3; 
}

function restartGame() {  // Function that restarts the game
    gameOverDiv.style.display = 'none'; 
    main.innerHTML = '';  // Clear the maze so that a new one can be generated
    startGame();  // Start the game again
}

function lbttnClick() {  // Function that handles the left button click for the on screem movement 
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

function ubttnClick() {  // Function that handles the up button click for the on screem movement
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

function rbttnClick() {  // Function that handles the right button click for the on screem movement
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

function dbttnClick() {  // Function that handles the down button click for the on screem movement
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


function keyUp(event) {  // Function that handles the key up event for the keyboard movement
    if (event.key === 'ArrowUp') {
        upPressed = false;
    } else if (event.key === 'ArrowDown') {
        downPressed = false;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = false;
    } else if (event.key === 'ArrowRight') {
        rightPressed = false;
    } else if (event.key === 'w') {
        wPressed = false;
    } else if (event.key === 's') {
        sPressed = false;
    } else if (event.key === 'a') {
        aPressed = false;
    } else if (event.key === 'd') {
        dPressed = false;
    }        
}

function keyDown(event) {  // Function that handles the key down event for the keyboard movement
    if (event.key === 'ArrowUp') {
        upPressed = true;
    } else if (event.key === 'ArrowDown') {
        downPressed = true;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = true;
    } else if (event.key === 'ArrowRight') {
        rightPressed = true;
    } else if (event.key === 'w') {
        wPressed = true;
    } else if (event.key === 's') {
        sPressed = true;
    } else if (event.key === 'a') {
        aPressed = true;
    } else if (event.key === 'd') {
        dPressed = true;
    }        
}


const enemyDirections = []; // Array to store enemy directions
const directionChangeInterval = 100;  // Interval for changing enemy direction
let moveCounter = 0;   // Counter for enemy movement

function randomlyMoveEnemy(enemy) {  // Function that randomly moves the enemy
    const enemies = document.querySelectorAll('.enemy');  // Set constants for the enemies
    const currentEnemy = enemies[enemy];
    const currentTop = parseInt(currentEnemy.style.top) || 0;
    const currentLeft = parseInt(currentEnemy.style.left) || 0;
    const enemyRect = currentEnemy.getBoundingClientRect();

    if (enemyDirections[enemy] === undefined) {
        enemyDirections[enemy] = Math.floor(Math.random() * 4);  // Randomly set the direction of the enemy
    }

    moveCounter++;
    if (moveCounter >= directionChangeInterval) {
        moveCounter = 0;
        enemyDirections[enemy] = Math.floor(Math.random() * 4);  // Randomly change the direction of the enemy
    }

    function willCollideWithEnemy(newX, newY) {  // Function that checks if the enemy will collide with another enemy
        const buffer = 5; 
        for (let i = 0; i < enemies.length; i++) {
            if (i === enemy) continue; 
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

    let topL = document.elementFromPoint(enemyRect.left, enemyRect.top);  // Get the elements at the corners of the enemy
    let topR = document.elementFromPoint(enemyRect.right, enemyRect.top);
    let btmL = document.elementFromPoint(enemyRect.left, enemyRect.bottom);
    let btmR = document.elementFromPoint(enemyRect.right, enemyRect.bottom);
    
    switch (enemyDirections[enemy]) {  // Check the direction of the enemy and move it accordingly
        case 0: // Up
            if (!topL?.classList.contains('wall') && !topR?.classList.contains('wall') &&   // Check if the enemy can move up
                !willCollideWithEnemy(enemyRect.left, enemyRect.top - 1)) {
                currentEnemy.style.top = (currentTop - 1) + 'px';
            } else {
                enemyDirections[enemy] = Math.floor(Math.random() * 4);  // Change direction if it can't move
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


function lives() {  // Function that handles the lives of the player
    const hearts = document.querySelectorAll('.heart');  // Get all the hearts
    hearts.forEach(heart => heart.remove());  // Remove all the hearts
    const lives = document.querySelector('.lives');  // Get the lives element
    for (let i = 0; i < livesCount; i++) {  // Loop through the lives count and create a visual heart for each life
        const heart = document.createElement('li');
        heart.classList.add('heart');
        lives.appendChild(heart);
    }
}

function loseLife() {  // Function that handles the loss of life
    if (isInvulnerable) return; // Don't lose life if invulnerable
    
    livesCount--;  // Decrease the lives count and update the visual hearts
    lives();
    
    if (livesCount <= 0) {  // If the player has no lives left, show the game over screen and play the game over animation
        player.classList.add('dead');
        showGameOverScreen();
    } else {
        isInvulnerable = true;  // Make player invulnerable and show hit animation
        player.classList.add('hit');
        
        // Disable movement
        upPressed = false;
        downPressed = false;
        leftPressed = false;
        rightPressed = false;

        
        setTimeout(() => {player.classList.remove('hit');}, 1500); // Remove hit animation and re-enable movement after 1.5 seconds
        

        setTimeout(() => {isInvulnerable = false;}, 2500);  // Remove invulnerability after 2.5 seconds

        const tempKeyDown = (e) => {
            if (!e.key.startsWith('Arrow')) {
                keyDown(e); // Create temporary handlers that only block arrow keys
            }
        };
        
        const tempKeyUp = (e) => {
            if (!e.key.startsWith('Arrow')) {
                keyUp(e);
            }
        };

        // Replace handlers with temporary ones
        document.removeEventListener('keydown', keyDown);
        document.removeEventListener('keyup', keyUp);
        document.addEventListener('keydown', tempKeyDown);
        document.addEventListener('keyup', tempKeyUp);
        
        // Restore original handlers after 1.5 seconds
        setTimeout(() => {
            document.removeEventListener('keydown', tempKeyDown);
            document.removeEventListener('keyup', tempKeyUp);
            document.addEventListener('keydown', keyDown);
            document.addEventListener('keyup', keyUp);
        }, 1500);
    }
}

function handlePlayerMovement() {  // Function that handles the player movement  
    if (downPressed) {  // Function that handles down movement
        let position = player.getBoundingClientRect();  // Get the position of the player
        let newBottom = position.bottom + 1;  // Move the player down
        let btmL = document.elementFromPoint(position.left, newBottom); 
        let btmR = document.elementFromPoint(position.right, newBottom);

        if (!btmL.classList.contains('wall') && !btmR.classList.contains('wall')) {  // Collision check for walls
            playerTop++;
            player.style.top = playerTop + 'px'; 
        }
        playerMouth.classList = 'down';  // Change animation to down
    } else if (upPressed) {  // Function that handles up movement
        let position = player.getBoundingClientRect();
        let newTop = position.top - 1;
        let topL = document.elementFromPoint(position.left, newTop);
        let topR = document.elementFromPoint(position.right, newTop);

        if (!topL.classList.contains('wall') && !topR.classList.contains('wall')) {
            playerTop--;
            player.style.top = playerTop + 'px';
        }
        playerMouth.classList = 'up';
    } else if (leftPressed) { // Function that handles left movement
        let position = player.getBoundingClientRect();
        let newLeft = position.left - 1;
        let topL = document.elementFromPoint(newLeft, position.top);
        let btmL = document.elementFromPoint(newLeft, position.bottom);

        if (!topL.classList.contains('wall') && !btmL.classList.contains('wall')) {
            playerLeft--;
            player.style.left = playerLeft + 'px';
        }
        playerMouth.classList = 'left';
    } else if (rightPressed) { // Function that handles right movement
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
}



function playerControlEnemy() { // Function to control the enemy using WASD
    const enemy = document.querySelector('.enemy');  // Get the enemy element
    if (sPressed) {  // Movement statement for down
        let position = enemy.getBoundingClientRect();  // Get the position of the enemy
        let newBottom = position.bottom + 1;  // Move the enemy down
        let btmL = document.elementFromPoint(position.left, newBottom);  // Get the elements at the corners of the enemy
        let btmR = document.elementFromPoint(position.right, newBottom);

        if (!btmL.classList.contains('wall') && !btmR.classList.contains('wall')) {  // Collision check for walls
            enemyTop++;
            enemy.style.top = enemyTop + 'px';  // Move the enemy down
        }
    } else if (wPressed) {  // Up
        let position = enemy.getBoundingClientRect();
        let newTop = position.top - 1;
        let topL = document.elementFromPoint(position.left, newTop);
        let topR = document.elementFromPoint(position.right, newTop);

        if (!topL.classList.contains('wall') && !topR.classList.contains('wall')) {
            enemyTop--;
            enemy.style.top = enemyTop + 'px';
        }
    } else if (aPressed) {  // Left
        let position = enemy.getBoundingClientRect();
        let newLeft = position.left - 1;
        let topL = document.elementFromPoint(newLeft, position.top);
        let btmL = document.elementFromPoint(newLeft, position.bottom);

        if (!topL.classList.contains('wall') && !btmL.classList.contains('wall')) {
            enemyLeft--;
            enemy.style.left = enemyLeft + 'px';
        }
    } else if (dPressed) {  // Right
        let position = enemy.getBoundingClientRect();
        let newRight = position.right + 1;
        let topR = document.elementFromPoint(newRight, position.top);
        let btmR = document.elementFromPoint(newRight, position.bottom);

        if (!topR.classList.contains('wall') && !btmR.classList.contains('wall')) {
            enemyLeft++;
            enemy.style.left = enemyLeft + 'px';
        }
    }
}





setInterval(function() {  // Main game loop
    if (!gameStarted) return; // Prevents movement if the game hasn't started

    handlePlayerMovement();  // Call the function to handle player movement
    
    // Point collision & score update
    const position = player.getBoundingClientRect();  // Get the position of the player
    const points = document.querySelectorAll('.point');
    for (let i = 0; i < points.length; i++) {  // Loop through all the points
        const ptRect = points[i].getBoundingClientRect();  // Get the position of the point
        if (  // Check if the player collides with the point
            position.right > ptRect.left &&
            position.left < ptRect.right &&
            position.bottom > ptRect.top &&
            position.top < ptRect.bottom
        ) {
            if (isLightMode) {  // If light mode is enabled, change the color of the point to black
                points[i].style.backgroundColor = '#ffffff'; // Light mode point color
            } else {
                points[i].style.backgroundColor = '#000000'; // Dark mode point color
            }
            points[i].classList.remove('point');  // Remove the point class
            score++;  // Increase the score
            scoreEl.textContent = score;  // Update the score display
        }
    }

    if (!twoPlayerMode) {
        const enemies = document.querySelectorAll('.enemy');
        for (let i = 0; i < enemies.length; i++) {
            randomlyMoveEnemy(i);  // Call the function to randomly move the enemy if not in two-player mode
        }
    } else {
        playerControlEnemy();  // Call the function to control the enemy using WASD if in two-player mode
    }

    enemies = document.querySelectorAll('.enemy');  // Get all the enemies
    for (let i = 0; i < enemies.length; i++) {  // Loop through all the enemies
        const enemyRect = enemies[i].getBoundingClientRect();  // Get the position of the enemy
        if (
            position.right > enemyRect.left &&  // Check if the player collides with the enemy
            position.left < enemyRect.right &&
            position.bottom > enemyRect.top &&
            position.top < enemyRect.bottom
        ) {
            loseLife();  // Call the function to lose a life
        }
    }

    // Check if all points are collected (game over condition)
    if (points.length === 0) {
        if (!twoPlayerMode) {
            nextLevel(); // Show Game Over if all points are collected
        }
        else {
            // Show Game Over screen for two-player mode
            gameOverDiv.style.display = 'flex'; // Show the Game Over screen
            gameStarted = false; // Stop the game loop
        }
    }

}, 10);

document.addEventListener('keydown', keyDown);  // Function that handles the key down event for the keyboard movement
document.addEventListener('keyup', keyUp);



function updateLevelCounter() {
    levelEl.textContent = `${difficulty}`;  // Update the level counter
}