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
});

// listen for the 'disconnect' event
socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

// listen for 'newMessage' events
socket.on('newMessage', function(message) {
  // message holds all the data the server send with this event.
 console.log('~~ newMessage from server ~~');
 console.log(message);
 var li = jQuery('<li></li>');
 li.text(`${message.from}: ${message.text}`);

 jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  // prevent submit
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function() {

  })
});