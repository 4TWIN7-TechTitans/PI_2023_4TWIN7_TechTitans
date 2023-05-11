
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const https = require('https');

//const DictionnaireSensagent = require('dictionnaire-sensagent');


module.exports.fixthis = async (req, res) => {

  const data = new FormData();
  data.append('srcImg', fs.createReadStream('/PATH/TO/flash statement.jpg'));
  data.append('Session', 'string');
  
  const options = {
    method: 'POST',
    url: 'https://pen-to-print-handwriting-ocr.p.rapidapi.com/recognize/',
    headers: {
      'X-RapidAPI-Key': '0feb89ea83msh625d3109c3556cdp1b7b5bjsnd74e67060745',
      'X-RapidAPI-Host': 'pen-to-print-handwriting-ocr.p.rapidapi.com',
      ...data.getHeaders(),
    },
    data: data
  };
  
  try {
    const response = await axios.request(options);
    res.status(200).json({
      text:response.data,
      message: "fix was called",
      status: "success",
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed ",
      status: "error",
    });
  }
}


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

