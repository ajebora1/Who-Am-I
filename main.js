/*----- constants -----*/
const MAX_GUESSED_WORDS = 5
const PROVIDED_NAMES = ['danny', 'erict', 'jacob', 'jason', 'kammi', 'lihue', 'mingl', 'obyli', 'rusen', 'ryano', 'trayt']
const WORDS_ALLOWED = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

/*----- app's state (variables) -----*/
let guessedName, playerGuessName, currentGuess, message, gameName

/*----- cached element references -----*/
const keyBoardEl = document.getElementById('baseid')
const guessNameBoardEl = document.getElementById('board')

/*----- event listeners -----*/
keyBoardEl.addEventListener('click', keyboardClick)

/*----- functions -----*/

/*----- Initialize The Game -----*/

function initGame() {
    playerGuessName = []
    guessedName = []
    currentGuess = ''
    gameName = getRandomName()
    getProvidedName(gameName)
}

/*----- Get a random name from the poll of names -----*/
function getRandomName() {
    const randomInt = Math.floor(Math.random() * PROVIDED_NAMES.length)
    return PROVIDED_NAMES[randomInt]
}

/*----- Modified the random name by moving characters around -----*/
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

/*----- Event listeners  -----*/
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

/*----- Update current guesses -----*/
function updateCurrentGuess(letter) {
    if (currentGuess.length < MAX_GUESSED_WORDS) {
        currentGuess += letter
        playerGuessName.push(letter)
    }
}

/*----- Winning and lossing Game definition -----*/
function handleSubmit() {
    let tempPlayerGuessName = playerGuessName.join('').toLowerCase();
    if (tempPlayerGuessName === gameName) {
        document.getElementById("message").classList.add('animate__animated', 'animate__wobble');
        document.getElementById("messageRestart").classList.add('animate__animated', 'animate__wobble');
        document.getElementById("message").innerHTML = "Great Job! You Did it!"
        document.getElementById("messageRestart").innerHTML = "Click Restart to Play Again";
        resetGameBoard()
    } else if (tempPlayerGuessName !== gameName) {
        document.getElementById("message").classList.add('animate__animated', 'animate__wobble');
        document.getElementById("messageRestart").classList.add('animate__animated', 'animate__wobble');
        document.getElementById("message").innerHTML = "Nice Try! You got this!"
        document.getElementById("messageRestart").innerHTML = "Click Restart To Try Again";
        resetGameBoard()
    }
}

/*----- Render -----*/
function render() {
    for (let i = 0; i < guessNameBoardEl.children.length; i++) {
        guessNameBoardEl.children[i].innerHTML = ''
    }
    playerGuessName.forEach(function (letter, idx) {
        const cell = document.createElement('span')
        cell.innerText = letter
        cell.classList.add('cell')
        guessNameBoardEl.children[idx].appendChild(cell)
    })
}

/*----- Restarting The Game -----*/
function handleRestart() {
    initGame()
    // resetGameBoard()
    document.getElementById("message").innerHTML = ''
    document.getElementById("messageRestart").innerHTML = ''
    gameName = getRandomName()
    getProvidedName(gameName)
}

/*----- Clear Game Board -----*/
function resetGameBoard() {
    currentGuess = ''
    playerGuessName = []
}

/*----- Delete Characters From Game Board -----*/
function handleDelete() {
    playerGuessName = playerGuessName.slice(0, playerGuessName.length - 1)
    currentGuess = playerGuessName.slice(0, playerGuessName.length - 1)
}


/*----- Initializing Game -----*/
initGame()