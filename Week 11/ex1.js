const dices=  document.querySelectorAll('div');

for(let dice of dices) {
    dice.addEventListener('click', randomDice);
}

function randomDice(){
    let random = Math.ceil(Math.random() * 6);
    let p = this.nextElementSibling;

    p.innerHTML = 'You rolled a ' + random;
    // alert('You rolled a '  + random);
    this.classList = 'side' + random;
}


