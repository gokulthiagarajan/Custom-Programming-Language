const { isOpeningParenthesis, isClosingParenthesis } = require('./identify');
const { specialForms } = require('./special-forms');
const { peek, pop } = require('./utilities');

// peek for looking 1st element, pop gives 1st element of array
const parenthesize = tokens => {
  const token = pop(tokens);

  // fit the expression between paranthesis
  if (isOpeningParenthesis(token.value)) {
    const expression = [];

    // keep looking
    while (!isClosingParenthesis(peek(tokens).value)) {
      // recursion
      expression.push(parenthesize(tokens));
    }

    pop(tokens); // throw closing brace
    return expression; // return inside expression, inside recursion
  }

  // return token if its not opening parantheisis, end of recursion leaf node
  return token;
};

const parse = (tokens) => {
  if (Array.isArray(tokens)) {
    // first and all rest elements
    const [first, ...rest] = tokens;
    return {
      type: 'CallExpression',
      name: first.value,
      arguments: rest.map(parse),
    };
  }
  const token = tokens;

  if (token.type === 'Number') {
    return {
      type: 'NumericLiteral',
      value: token.value,
    };
  }
  if (token.type === 'String') {
    return {
      type: 'StringLiteral',
      value: token.value,
    };
  }
  if (token.type === 'Name') {
    return {
      type: 'Identifier',
      name: token.value,
    };
  }
};

module.exports = { parse: (tokens) => parse(parenthesize(tokens)) };
