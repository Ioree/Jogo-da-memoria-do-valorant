const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'jett',
    'viper',
    'phoenix',
    'sova',
    'gekko',
    'reyna',
    'killjoy',
    'cypher',
    'sage',
    'chamber' ,
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let segundCard = '';

const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card');

    if (disableCards.length == 20) {
        clearInterval(this.loop);
        alert(`Nice, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const segundCharacter = segundCard.getAttribute('data-character');

    if (firstCharacter == segundCharacter) {

        firstCard.firstChild.classList.add('disable-card');
        segundCard.firstChild.classList.add('disable-card');

            firstCard = '';
            segundCard = '';

            checkEndGame();

    } else {

        setTimeout(() => {
            firstCard.classList.remove('revel-card');
            segundCard.classList.remove('revel-card');

            firstCard = '';
            segundCard = '';

        }, 500);

    }
}

const revelCard = ({ target }) => {

    if(target.parentNode.className.includes('revel-card')) {
        return;
    }

    if (firstCard == '') {

        target.parentNode.classList.add('revel-card');
        firstCard = target.parentNode;

    } else if (segundCard == '') {

        target.parentNode.classList.add('revel-card');
        segundCard = target.parentNode;

        checkCards();
    }

}

const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../img/${character}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revelCard);

    card.setAttribute('data-character', character)

    return card;
}

const loadGame = () => {
    const duplicateCharacter = [ ...characters, ...characters ];

    const shuffledArray = duplicateCharacter.sort( () => Math.random() - 0.5 );

    shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);

    })  ;

}

const startTime = () => {

    this.loop = setInterval(() => {

        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;

    }, 1000);
}

window.onload = () => {
    spanPlayer.innerHTML =  localStorage.getItem('player');
    startTime();
    loadGame();
}

