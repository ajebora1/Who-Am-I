/*----- constants -----*/
const LENGTH_OF_WORD = 6
const names = ['peter', 'simon', 'david']
const MAX_GUESSES = 2
const LETTERS_ALLOWED = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

/*----- app's state (variables) -----*/
let guessedName, playerGuessName, currentGuess, numberOfGuesses, message


/*----- cached element references -----*/
const keyBoard = document.getElementById('baseid')
const guessNameBoard = document.getElementById('board')

/*----- event listeners -----*/
keyBoard.addEventListener('click', keyboardClick)

/*----- functions -----*/

function initGame() {
    playerGuessName = []
    guessedName = []
    numberOfGuesses = 0
    currentGuess = ''
}

function getRandomName() {
    const randomInt = Math.floor(Math.random() * names.length)
    return names[randomInt]
}

function getProvidedName(name) {
    const sliceFirstLastCharacter = name.slice(1, -1);
    const getFirstCharacter = name.charAt(0);
    const getLastCharacter = name.charAt(name.length - 1);
    const getFirstLastCharacter = (`${getFirstCharacter}${getLastCharacter}`)
    guessedName = sliceFirstLastCharacter.slice(0, 2) + getFirstLastCharacter + sliceFirstLastCharacter.slice(2);
    let spans = $('.provided').find('span')
    spans.each(function (idx) {
        $(this).text(guessedName[idx])
    })
}

let gameName = getRandomName()
getProvidedName(gameName)


function keyboardClick(evt) {
    if (LETTERS_ALLOWED.includes(evt.target.innerText.toLowerCase())) {
        updateCurrentGuess(evt.target.innerText)
        render()
    } else if (evt.target.innerText === "Restart") {
        handleRestart()
        render()
    } else if (evt.target.innerText === "Submit") {
        handleSubmit()
        render()
    } else if (evt.target.innerText === "Delete") {
        handleDelete()
        render()
    }
}

function updateCurrentGuess(letter) {
    if (currentGuess.length < LENGTH_OF_WORD) {
        currentGuess += letter
        playerGuessName.push(letter)
    }
}

function handleSubmit() {
    let tempPlayerGuessName = playerGuessName.join('').toLowerCase();
    if (tempPlayerGuessName === gameName) {
        document.getElementById("message").innerHTML = "Great Job in winning the Game! Way to go!";
    } else if (tempPlayerGuessName !== gameName) {
        document.getElementById("message").innerHTML = "Try Again! You got this!";

    }
}

function handleDelete() {
    playerGuessName = playerGuessName.slice(0, playerGuessName.length - 1)
}

function render() {
    for (let i = 0; i < guessNameBoard.children.length; i++) {
        guessNameBoard.children[i].innerHTML = ''
    }
    playerGuessName.forEach(function (letter, idx) {
        const cell = document.createElement('span')
        cell.innerText = letter
        cell.classList.add('cell')
        guessNameBoard.children[idx].appendChild(cell)
    })
    console.log(playerGuessName)
}



// Initializing Game
initGame()