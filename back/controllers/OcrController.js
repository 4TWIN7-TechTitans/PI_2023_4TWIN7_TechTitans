
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

//const DictionnaireSensagent = require('dictionnaire-sensagent');


module.exports.fix = async (req, res) => {
  /*  const input = 'C'est un chien marron.';
const words = input.split(' ');

// Initialize the dictionary
const dict = new DictionnaireSensagent();

for (let i = 0; i < words.length; i++) {
  const word = words[i];
  // Check if the word is spelled correctly
  if (!dict.hasWord(word)) {
    // If the word is misspelled, find suggestions for the correct spelling
    const suggestions = dict.getSuggestions(word);
    // If there are suggestions, replace the misspelled word with the first suggestion
    if (suggestions.length > 0) {
      words[i] = suggestions[0];
    }
  }
}

// Join the words back into a string
const output = words.join(' ');
console.log(output);*/

}