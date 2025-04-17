let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

let gameStarted = false;

const main = document.querySelector('main');

const startDiv = document.querySelector('.startDiv');
const startButton = document.querySelector('.start');

function hideStartScreen() {
    startDiv.style.display = 'none';
    gameStarted = true;
}

startButton.addEventListener('click', hideStartScreen);

//Player = 2, Wall = 1, Enemy = 3, Point = 0
let maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 1, 0, 0, 0, 0, 3, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 3, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 3, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

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

const player = document.querySelector('#player');
const playerMouth = player.querySelector('.mouth');
let playerTop = 0;
let playerLeft = 0;

setInterval(function () {
    if (!gameStarted) return; // stop here if the game hasn't started

    // DOWN
    if (downPressed) {
        let position = player.getBoundingClientRect();
        let newBottom = position.bottom + 1;
        let btmL = document.elementFromPoint(position.left, newBottom);
        let btmR = document.elementFromPoint(position.right, newBottom);

        if (!btmL.classList.contains('wall') &&
            !btmR.classList.contains('wall')) {
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

        if (!topL.classList.contains('wall') &&
            !topR.classList.contains('wall')) {
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

        if (!topL.classList.contains('wall') &&
            !btmL.classList.contains('wall')) {
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

        if (!topR.classList.contains('wall') &&
            !btmR.classList.contains('wall')) {
            playerLeft++;
            player.style.left = playerLeft + 'px';
        }
        playerMouth.classList = 'right';
    }
    // … after your movement blocks, still inside setInterval:

    // 1. Grab the player's current bounding rect
    const position = player.getBoundingClientRect();

    // 2. Find every remaining point
    const points = document.querySelectorAll('.point');

    // 3. Loop through them and test overlap
    for (let i = 0; i < points.length; i++) {
        const ptRect = points[i].getBoundingClientRect();
        if (
            position.right > ptRect.left &&
            position.left < ptRect.right &&
            position.bottom > ptRect.top &&
            position.top < ptRect.bottom
        ) {
            // remove the point class so it disappears
            points[i].classList.remove('point');
        }
    }


}, 10);

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);