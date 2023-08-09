const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter"); 
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const remainingGuessesInput = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function() {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    wordsProgress(word);
};

getWord();

const wordsProgress =  function (word) {
    const wordsTempSymbol = [];
    for (const letter of word) {
        wordsTempSymbol.push("●");
    }
    wordInProgress.innerText = wordsTempSymbol.join("");
};

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    const goodGuess = playerInput(guess);
    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

const playerInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter, please try again!";
    } else {
        guessedLetters.push(guess);
        updateGuesses(guess);
        updateLetters();
        wordUpdate(guessedLetters);
    }
};

const updateLetters = function () {
    guessedLettersList.innerHTML = "";

    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersList.append(li);
    }
};

const wordUpdate = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    ifWins();
};
 
const updateGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesInput.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesInput.innerText = `${remainingGuesses} guesses`;
    }
};

const ifWins = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

        startOver(); 
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuess.classList.add("hide");
    guessedLettersList.classList.add("hide");
    playAgain.classList.remove("hide");
};

playAgain.addEventListener("click", function () {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesInput.innerText = `${remainingGuesses} guesses`;
    guessedLettersList.innerHTML = "";
    message.innerText = "";

    getWord();

    guessButton.classList.remove("hide");
    playAgain.classList.add("hide");
    remainingGuess.classList.remove("hide");
    guessedLettersList.classList.remove("hide");
});

kjanjiefa