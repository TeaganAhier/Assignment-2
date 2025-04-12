// document.addEventListener('DOMContentLoaded', function() {
//     const circle = document.getElementById('circle');

//     circle.addEventListener('click', function() {
//         alert('Circle was clicked!');
//     });
// });

// const circle = document.querySelector('#circle');
// let position = circle.getBoundingClientRect();
// let positionLeft = position.left;
// circle.style.left = positionLeft - 10 + 'px';

// Moving the circle on click
const circle = document.querySelector('#circle');

circle.addEventListener('click', function () {
    alert('The circle was pressed');
    let position = circle.getBoundingClientRect();
    circle.style.left = position.left + 10 + 'px'; // Move 10px to the right
});

// Moving the circle on keydown event
document.addEventListener('keydown', function (event) {
    let position = circle.getBoundingClientRect();
    if (event.key === 'ArrowLeft') {
        circle.style.left = position.left - 10 + 'px'; // Move left
    }
});

document.addEventListener('keydown', function (event) {
    let position = circle.getBoundingClientRect();

    if (event.key == 'ArrowLeft') {
        circle.style.left = position.left - 10 + 'px'; // Move left
    }
    else if (event.key == 'ArrowUp') {
        circle.style.top = position.top - 10 + 'px'; // Move up
    }
    else if (event.key == 'ArrowDown') {
        circle.style.top = position.top + 10 + 'px';
    }
    else if (event.key == 'ArrowRight') {
        circle.style.left = position.left + 10 + 'px'; // Move right
    }
});



const circle = document.querySelector('#circle');
let timer = null; // To store the interval

// Variables to track which key is being pressed
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;

function myKeyDown(event) {
    // Start movement based on the key pressed
    if (event.key == 'ArrowLeft') {
        leftPressed = true;
    } else if (event.key == 'ArrowRight') {
        rightPressed = true;
    } else if (event.key == 'ArrowUp') {
        upPressed = true;
    } else if (event.key == 'ArrowDown') {
        downPressed = true;
    }
}

function myKeyUp(event) {
    // Stop movement when key is released
    if (event.key == 'ArrowLeft') {
        leftPressed = false;
    } else if (event.key == 'ArrowRight') {
        rightPressed = false;
    } else if (event.key == 'ArrowUp') {
        upPressed = false;
    } else if (event.key == 'ArrowDown') {
        downPressed = false;
    }
}

// Function to move the circle smoothly
function moveInterval() {
    let position = circle.getBoundingClientRect();

    if (leftPressed) {
        circle.style.left = position.left - 1 + 'px';
    }
    if (rightPressed) {
        circle.style.left = position.left + 1 + 'px';
    }
    if (upPressed) {
        circle.style.top = position.top - 1 + 'px';
    }
    if (downPressed) {
        circle.style.top = position.top + 1 + 'px';
    }
}

// Set the interval to check the movement every 10 milliseconds
setInterval(moveInterval, 10);

// Add event listeners for keydown and keyup
document.addEventListener('keydown', myKeyDown);
document.addEventListener('keyup', myKeyUp);
