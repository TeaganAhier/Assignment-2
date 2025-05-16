function createCircle(event) {
    let div = document.createElement('div');
    document.body.appendChild(div);

    const size = Math.ceil(Math.random() *200);
    const randomNumber1 = Math.floor(Math.random() * 256);
    const randomNumber2 = Math.floor(Math.random() * 256);
    const randomNumber3 = Math.floor(Math.random() * 256);
    const randomColor4 = Math.random();

    div.style.backgroundColor = 'red';
    div.style.width = size + 'px';
    div.style.height = size + 'px';
    div.style.borderRadius = '100%';

    div.style.backgroundColor = 'rgba(' + randomNumber1 + ',' + randomNumber2 + ',' + randomNumber3 + ',' + randomColor4 + ')';

    div.style.position = 'absolute';
    div.style.top = event.clientY + 'px';
    div.style.left = event.clientX + 'px';
    }
    document.addEventListener('click', createCircle);


