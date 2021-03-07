// Tokenizer file for lexical analyser

const {
  isLetter,
  isWhitespace,
  isNumber,
  isParenthesis,
  isQuote,
} = require('./identify');

// takes input string and get all tokens
const tokenize = (input) => {
  const tokens = [];

  // going from left to right
  let cursor = 0;
  while (cursor < input.length) {
    const character = input[cursor];

    if (isParenthesis(character)) {
      tokens.push({
        type: 'Parenthesis',
        value: character,
      });
      cursor++;
      // iterate for next without going to read next lines
      continue;
    }

    if(isWhitespace(character)){
      cursor++;
      continue;
    }

    if(isNumber(character)){
      
      // To handle multiple digits of a number
      let number = character;
      while(isNumber(input[++cursor])){
        // appending
        number+=input[cursor];
      }

      // we assume its a white space if not number, so pushing that number upto.

      tokens.push({
        type: 'Number',
        // 10 as base
        value: parseInt(number, 10),
        // value: character -- won't work as we need character instead of number
      }); 
      // cursor++; - not needed since iteration done in loop
      continue;
    }

    if(isLetter(character)){
      // To handle multiple chars of a operator
      let name = character;
      while(isLetter(input[++cursor])){
        name += input[cursor];
      }

      tokens.push({
        type: 'Name',
        value: name,
      }); 
      continue;
    }

    // Our language uses only double quote for strings
    if(isQuote(character)){
      let string = '';

      // can also end with other characters like \, @ etc
      // here string ends with "
      while(!isQuote(input[++cursor])){
        string +=input[cursor];
      }
      tokens.push({
        type: 'String',
        value: string,
      });
      cursor++; // here we stop at ", so move to next whitespace
      continue;
    }
    //cursor++;
    //continue;
    throw new Error(`${character} is not valid`);
  }
  return tokens;
};

module.exports = { tokenize };
