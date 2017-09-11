console.log('Starting notes.js...');

var addNote = (title, body) => {
    console.log('Adding note: ', title, body);
};

var getAll = () => {
    console.log('Getting all notes: ');
};

var getNote = (title) => {
    console.log('Fetching note: ', title);
};

var removeNote = (title) => {
    console.log('Removing note: ', title);
};


// export the function we want to use in the app.js
module.exports = {
    // ES6: addNote: addNote
    // When property and value is the same you can just use: addNote
    addNote,
    getAll,
    getNote,
    removeNote
};
