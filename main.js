/*----- constants -----*/
const MAX_GUESSED_WORDS = 5
const PROVIDED_NAMES = ['peter', 'simon', 'david']
// const MAX_GUESSES = 2
const WORDS_ALLOWED = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

/*----- app's state (variables) -----*/
let guessedName, playerGuessName, currentGuess, message, gameName


/*----- cached element references -----*/
const keyBoard = document.getElementById('baseid')
const guessNameBoard = document.getElementById('board')

/*----- event listeners -----*/
keyBoard.addEventListener('click', keyboardClick)

/*----- functions -----*/

function initGame() {
    playerGuessName = []
    guessedName = []
    currentGuess = ''
    gameName = getRandomName()
    getProvidedName(gameName)
}

function getRandomName() {
    const randomInt = Math.floor(Math.random() * PROVIDED_NAMES.length)
    return PROVIDED_NAMES[randomInt]
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

function keyboardClick(evt) {
    if (WORDS_ALLOWED.includes(evt.target.innerText.toLowerCase())) {
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
    if (currentGuess.length < MAX_GUESSED_WORDS) {
        currentGuess += letter
        playerGuessName.push(letter)
    }
}

function handleSubmit() {
    let tempPlayerGuessName = playerGuessName.join('').toLowerCase();
    if (tempPlayerGuessName === gameName) {
        document.getElementById("message").innerHTML = "Great Job Winning The Game! Way To Go! Click Restart to Play Another Game";
        resetGameBoard()
    } else if (tempPlayerGuessName !== gameName) {
        document.getElementById("message").innerHTML = "Try Again! You got this! Click Restart to Play Another Game";
        resetGameBoard()
    }
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
}

function modifiedNames() {
    let tempPlayerGuessName = playerGuessName.join('').toLowerCase();
}

function handleRestart() {
    initGame()
    // resetGameBoard()
    document.getElementById("message").innerHTML = ''
    gameName = getRandomName()
    getProvidedName(gameName)
}

function resetGameBoard() {
    currentGuess = ''
    playerGuessName = []
}

function handleDelete() {
    playerGuessName = playerGuessName.slice(0, playerGuessName.length - 1)
}

// Initializing Game
initGame()