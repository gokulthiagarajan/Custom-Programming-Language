// own cmd prompt qns
const { prompt } = require('inquirer');
// add colors to terminal
const chalk = require('chalk');

const { parseAndEvaluate } = require('./parse-and-evaluate');

const askQuestions = () =>{
  const questions = [
    {name: 'COMMAND', type:'input', message: chalk.blue('>')},
  ];

  return prompt(questions);
}

const repl = async () => {
  try{
    // read
    const answers = await askQuestions();
    const {COMMAND} = answers;
    // check if command exists and evaluate
    if(COMMAND.trim()){
      // print
      console.log(chalk.yellow(parseAndEvaluate(COMMAND)));
    }
    // loop , finally REPL
    repl();
  } 
  catch(error){
    console.log(error);
  }
};

// if we call this file directly
if (require.main === module) {
  console.log(
    chalk.red(
      `Welcome to the ${chalk.bgYellow('Dropbear')} Programming Language`,
    ),
  );
  repl();
}

module.exports = repl;
