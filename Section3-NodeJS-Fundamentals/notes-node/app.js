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
    var note = notes.addNote(argv.title, argv.body);
    if(note !== undefined && note !== null) {
        console.log('Note created successfully!');
        notes.logNote(note);
    }else{
        console.log('Note title, already in use!');
    }
} else if (command === 'list') {
    notes.getAll();
} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if(note !== undefined && note !== null) {
        console.log('Note found!');
        notes.logNote(note);
    }else{
        console.log('Note not found!');
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed.' : 'Note not found';
    console.log(message);
} else {
    console.log('Command not recognised');
}

