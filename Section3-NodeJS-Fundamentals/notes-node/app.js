console.log('Starting app.js...');

// Load the fs & os core module
const fs = require('fs');

// load 3rd party modules
const _ = require('lodash'); // utility library
const yargs = require('yargs');

// load our own files - using relative paths
const notes = require('./notes.js');

const argv = yargs.argv; // yargs object

//var command = process.argv[2];
var command = argv._[0];
console.log('Command: ', command);
//console.log('Process: ', process.argv);
console.log('Yargs: ', argv);

if (command === 'add') {
    notes.addNote(argv.title, argv.body);
} else if (command === 'list') {
    notes.getAll();
} else if (command === 'read') {
    notes.getNote(argv.title);
} else if (command === 'remove') {
    notes.removeNote(argv.title);
} else {
    console.log('Command not recognised');
}

