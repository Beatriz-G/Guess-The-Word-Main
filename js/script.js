//The unordered list where the player’s guessed letters will appear.
const guessedLettersList = document.querySelector(".guessed-letters");
//The button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");
//The text input where the player will guess a letter.
const letter = document.querySelector(".letter"); 
//The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");
//The paragraph where the remaining guesses will display.
const remainingGuess = document.querySelector(".remaining");
//The span inside the paragraph where the remaining guesses will display.
const remainingGuesses = document.querySelector(".remaining span");
//The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
//The hidden button that will appear prompting the player to play again.
const playAgain = document.querySelector(".play-again");

//create another variable called word and give it the value of magnolia
const word = "magolia";
//will contain all the letters the player guess
const guessedLetters = [];


//create and name a function to update the paragraphs inner text
const wordsProgress =  function (word) {
    const wordsTempSymbol = [];
    for (const letter of word) {
        console.log(letter);
        wordsTempSymbol.push("●");
    }
    wordInProgress.innerText = wordsTempSymbol.join("");

};


wordsProgress(word);


//add and event listener for the button
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    //emptying the message paragraph
    message.innerText = "";

    const guess = letter.value;
    
    const goodGuess = playerInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }

    letter.value = "";
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
    }
};