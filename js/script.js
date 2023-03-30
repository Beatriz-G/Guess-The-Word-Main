//The unordered list where the player’s guessed letters will appear.
const guessedLettersList = document.querySelector(".guessed-letters");
//The button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");
//The text input where the player will guess a letter.
const letterInput = document.querySelector(".letter"); 
//The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");
//The paragraph where the remaining guesses will display.
const remainingGuess = document.querySelector(".remaining");
//The span inside the paragraph where the remaining guesses will display.
const remainingGuessesInput = document.querySelector(".remaining span");
//The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
//The hidden button that will appear prompting the player to play again.
const playAgain = document.querySelector(".play-again");


//create another variable called word and give it the value of magnolia
let word = "magnolia";
//will contain all the letters the player guess
const guessedLetters = [];
//declare a global variable for the number of guesses
let remainingGuesses = 8;


//add an async function 
const getWord = async function() {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    //console.log(getWord());

    const wordArray = words.split("\n");
    //console.log(wordArray);

    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    wordsProgress(word);
};

getWord();

//create and name a function to update the paragraphs inner text
const wordsProgress =  function (word) {
    const wordsTempSymbol = [];
    for (const letter of word) {
        console.log(letter);
        wordsTempSymbol.push("●");
    }
    wordInProgress.innerText = wordsTempSymbol.join("");

};


//add and event listener for the button
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    //emptying the message paragraph
    message.innerText = "";

    const guess = letterInput.value;
    
    const goodGuess = playerInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }

    letterInput.value = "";
});


//function to check players input
const playerInput = function(input) {
    const acceptedLetter = /[a-zA-z]/;
    if (input.lenght === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.lenght > 1) {
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    }
};

//function to capture input
const makeGuess = function(guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You've already guessed that letter, please try again!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        updateGuesses(guess);
        updateLetters();
        wordUpdate(guessedLetters);
    }
};


//createa a function to show the guessed letters
const updateLetters = function() {
    guessedLettersList.innerHTML = "";

    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersList.append(li);
    }
};


//create a function to update the word in progress
const wordUpdate = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
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

//create a function to count guesses remaining 
const updateGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        //loses chance
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! THe word wad <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
        remainingGuessesInput.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesInput.innerText = `${remainingGuesses} guesses`;
    }
};


//create a function to check if the player won
const ifWins = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guesed the corect word! Congrats!</p>`;
    }
};


