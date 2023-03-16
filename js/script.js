//The unordered list where the player’s guessed letters will appear.
const guessedLetters = document.querySelector(".guessed-letters");
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
    
    const guess = letter.value;
    console.log(guess);
    letter.value = "";
});
