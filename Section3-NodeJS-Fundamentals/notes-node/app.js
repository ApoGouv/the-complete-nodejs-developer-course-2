console.log('Starting app.js...');


// Load the fs & os core module
const fs = require('fs');
const os = require('os');

// load a 3rd party module
// Steps:
// 0. run: npm init
// 1. install module via npm by typing: npm install packageName --save
// 2. require the module with the name it apears in the package.json
const _ = require('lodash'); // utility library

// load our own files - using relative paths
const notes = require('./notes.js');


// let res = notes.addNote();
// console.log(res);

// console.log('Result:', notes.add(5, -9));
//let user = os.userInfo();

//console.log(user);

// this will create the file: greetings.txt and append the txt we provide
// if the file already exists, it wil just append the txt
// fs.appendFile('greetings.txt', `Hello, ${user.username}! You are ${notes.age}.`, function (err) {
//     if (err) {
//         console.log('Unable to write to file.');
//     }
// });

/*
// alternative: synchronous method
fs.appendFileSync('greetings2.txt', 'Hello world!');
*/


// console.log(_.isString(true));
// console.log(_.isString('Tolios'));
// var filteredArray = _.uniq(['Tolios', 1, 'Tolios', 1, 2, 2, 3, 4]);
// console.log(filteredArray);
