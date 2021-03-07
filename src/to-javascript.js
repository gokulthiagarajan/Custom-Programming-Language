const generate = require('@babel/generator').default;
const { traverse } = require('./traverse');

const babelVisitor = {
  // For CallExpression, convert to Identifier
  CallExpression: {
    enter({ node }) {
      node.callee = {
        type: 'Identifier',
        name: node.name,
      };
    },
  },
  VariableDeclaration: {
    enter({ node }) {
      node.kind = 'let';
      node.declarations = [
        {
          type: 'VariableDeclarator',
          id: node.identifier,
          init: node.assignment,
        },
      ];
    },
  },
};

const toJavaScript = (ast) => {
  traverse(ast, babelVisitor);
  // babel generate
  return generate(ast).code;
};

module.exports = {
  toJavaScript,
};
