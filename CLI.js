var isLetter = require("is-letter");
var inquirer = require("inquirer");
var Word = require("./words.js");

var hangman = {
  wordBank: ["BRAZIL", "ARGENTINA", "URUGUAY", "PARAGUAY", "CHILE", "BOLIVIA", "PERU", "COLOMBIA", "EQUADOR", "VENEZUELA", "SURINAME", "GUYANA"],
  guessesRemaining: 10,
  
  lettersGuessed: [],
  
  display: 0,
  currentWord: null,
 
  startGame: function() {
    var that = this;
  
    if(this.lettersGuessed.length > 0){
      this.lettersGuessed = [];
    }
    this.newGame();
  },
 
  newGame: function() {
    if(this.guessesRemaining === 10) {
      console.log("Let's test your knowledge on South American Countries!");
      console.log("========================================");
      
      var randNum = Math.floor(Math.random()*this.wordBank.length);
      this.currentWord = new Word(this.wordBank[randNum]);
      this.currentWord.getLets();
      
      console.log(this.currentWord.wordRender());
      this.promptUser();
    } else{
      this.resetGuessesRemaining();
      this.newGame();
    }
  },
  resetGuessesRemaining: function() {
    this.guessesRemaining = 10;
  },
  promptUser : function(){
    var that = this;
   
    inquirer.prompt([{
      name: "chosenLtr",
      type: "input",
      message: "Choose a letter:",
      validate: function(value) {
        if(isLetter(value)){
          return true;
        } else{
          return false;
        }
      }
    }]).then(function(ltr) {
     
      var letterReturned = (ltr.chosenLtr).toUpperCase();
     
      var guessedAlready = false;
        for(var i = 0; i<that.lettersGuessed.length; i++){
          if(letterReturned === that.lettersGuessed[i]){
            guessedAlready = true;
          }
        }
       
        if(guessedAlready === false){
          that.lettersGuessed.push(letterReturned);

          var found = that.currentWord.checkIfLetterFound(letterReturned);
         
          if(found === 0){
            console.log("Wrong Guess");
            that.guessesRemaining--;
            that.display++;
            console.log("Guesses remaining: " + that.guessesRemaining);
           

            console.log(that.currentWord.wordRender());

            console.log("Letters guessed: " + that.lettersGuessed);
          } else{
            console.log("You got it!");
          
              if(that.currentWord.didWeFindTheWord() === true){
                console.log("===========================");
                console.log(that.currentWord.wordRender());
                console.log("Great Work!");
                
              } else{
                
                console.log("Guesses remaining: " + that.guessesRemaining);
                console.log(that.currentWord.wordRender());
  
                console.log("Letters guessed: " + that.lettersGuessed);
              }
          }
          if(that.guessesRemaining > 0 && that.currentWord.wordFound === false) {
            that.promptUser();
          }else if(that.guessesRemaining === 0){
            console.log("=============================");
            console.log("OH NO! Better Luck Next Time!");
            console.log("The word is: " + that.currentWord.word);
          }
        } else{
            console.log("You have already guessed that letter");
            that.promptUser();
          }



    });
  }
}

hangman.startGame();
