/**
 * File    : index.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 6/10/2017
 */
var socket = io();

// listen for the 'connect' event
socket.on('connect', function () {
  console.log('Connected to server.');

  // create a new 'createMessage' event
  socket.emit('createMessage', {
    from: 'ch@example.com',
    text: 'Yo, from Chrysa'
  });

});

// listen for the 'disconnect' event
socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

// listen for 'newMessage' events
socket.on('newMessage', function(message) {
  // message holds all the data the server send with this event.
 console.log('~~ newMessage from server ~~');
 console.log(`From   : ${message.from}`);
 console.log(`Message: ${message.text}`);
 console.log(`At     : ${message.createdAt}`);
});