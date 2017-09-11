console.log('Starting notes.js...');

// In ALL node files, we have access to the variable/object "module"
//console.log(module);

// Here we are interesting at: exports: {},
// in other words: module.exports

//module.exports.age = 30;

// we can access this variable "age" in the app.js,
// by using the name of the variable we used to require the notes.js
// in our example, this is "notes". So, notes.age will return 30

// A more realistic example is to use exports to pass functions
// to the files we required our file, containing the original function.

module.exports.addNote = () => {
    console.log('addNote');
    return 'New note'
};


module.exports.add = (a, b) => {
    console.log('add()');
    return a + b;
};


