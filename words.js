var Letter = require("./letters.js");

function Word(word) {
    this.word = word;
    this.character = [];
    this.found = false;
    this.characterInput = function() {
        for (var i = 0; i < this.word.length; i++){
            this.character.push(new Letter(this.word[i]));
        }
    }
}