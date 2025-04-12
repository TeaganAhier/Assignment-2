let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

const player = document.querySelector('#player');

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

function move() {
    const position = player.getBoundingClientRect();

    if (downPressed == true) {
        let newBottom = position.bottom + 1;
        let btmL = document.elementFromPoint(position.left, newBottom);
        let btmR = document.elementFromPoint(position.right, newBottom);

        if (btmL.classList.contains('solid') == false && btmR.classList.contains('solid') == false) {
            player.style.top = position.top + 1 + 'px';
        }
    }

    if (leftPressed == true) {
        let newLeft = position.left - 1;
        let topL = document.elementFromPoint(newLeft, position.top);
        let btmR = document.elementFromPoint(newLeft, position.bottom);

        if (topL.classList.contains('solid') == false && btmR.classList.contains('solid') == false) {
            player.style.left = position.left - 1 + 'px';
        }
    }

    if (upPressed) {
        let newTop = position.top - 1;  // Corrected this line
        let topL = document.elementFromPoint(position.left, newTop);
        let topR = document.elementFromPoint(position.right, newTop);

        if (!topL.classList.contains('solid') && !topR.classList.contains('solid')) {
            player.style.top = position.top - 1 + 'px';
        }
    }

    if (rightPressed) {
        let newRight = position.right + 1;
        let topR = document.elementFromPoint(position.right, position.top);
        let btmR = document.elementFromPoint(position.right, position.bottom);

        if (!topR.classList.contains('solid') && !btmR.classList.contains('solid')) {
            player.style.left = position.left + 1 + 'px';
        }
    }
}

setInterval(move, 5);

document.addEventListener('keyup', keyUp);
document.addEventListener('keydown', keyDown);