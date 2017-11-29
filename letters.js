function Letter(character) {
    this.character = character;
    this.appear = false;
  
    this.letterRender = function() {
      if (this.appear) {
        return "_ ";
      } else {
        return this.character;
      }
    }
  };
  
  module.exports = Letter;