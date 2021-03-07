const { traverse } = require('./traverse');

// Do transformation for special purpose keywords
const transform = node => {
    traverse(node, {
        // if its callexp
        CallExpression: {
            enter({ node }){
                if(specialForms[node.name]){
                    specialForms[node.name](node);
                }
            }
        }
    })
    return node;
};

// Call Expression
//  name(define)
//  arguments(identifier, assignment(value))

const specialForms = {
    // define new keyword
    define(node){
        const [identifier, assignment] = node.arguments;
        node.type = "VariableDeclaration";
        node.identifier = identifier;
        node.assignment = assignment;
        delete node.name;
        delete node.arguments;
    },
};

module.exports = { specialForms, transform };
