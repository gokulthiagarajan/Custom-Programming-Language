# Customized Programming Language

![image](https://user-images.githubusercontent.com/33049124/110229746-a7300800-7f31-11eb-9e13-b16ab10ccf24.png)


## Description
* Scheme-based language
* Math operations and variable declarations

## Works Done
* Built a lexical analyser for tokenization of custom language and established abstract syntax tree (AST) by parsing
* Designed custom CLI and REPL & Integrated file stream to evaluate program in unique file extension
* Transpiled entire custom language to executable target language Javascript by applying Visitor pattern
* 100% unit tests coverage with Jest Framework

## Overview
3 ways to interact
1. Repl 
2. Read files from filesystem
3. Transpile to JS

## Getting started
npm init

npm link

dropbear run examples/example2.drp

## Syntax
Starts with ( and ends with  )

(multiply 2 3)

(add 2 subtract (3 1))

(define x 3)

(max 2 3 56)
