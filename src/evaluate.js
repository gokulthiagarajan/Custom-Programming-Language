const { environment } = require('./standard-library');
const last = collection => collection[collection.length - 1];

const apply = node => {
    // looks our hash table , we have add, subtract etc functions
    const fn = environment[node.name];
    // keep looking for more arguments, i.e nested, if we get number return that
    const args = node.arguments.map(evaluate);
    if(typeof fn !== 'function'){
        throw new TypeError( `${node.name} is not a function`);
    }
    return fn(...args); // es6
    //return fn.apply(null, args);
};

const getIdentifier = node => {
    if(environment[node.name]) return environment[node.name];
    throw new ReferenceError(`${node.name} is not defined`);
}

// new keyword for var declarations
const define = node => {
    environment[node.identifier.name] = node.assignment.value;
};

const evaluate = (node) => {

    if(node.type === 'VariableDeclaration'){
        return define(node);
    }

    if(node.type === 'CallExpression'){
        // uses js function, see above
        return apply(node);
    }

    if(node.type === 'Identifier'){
        return getIdentifier(node);
    }

    // only strings and numbers have value
    if(node.value){
        return node.value;
    }
};

module.exports = { evaluate };
