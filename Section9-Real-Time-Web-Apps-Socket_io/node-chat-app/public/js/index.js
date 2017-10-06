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
 // create a new list item
 var li = jQuery('<li></li>');
 // set its text to display the message we got
 li.text(`${message.from}: ${message.text}`);
 // display it, by putting it to the end of the list
 jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</atarget>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

// handle Message Form submission
jQuery('#message-form').on('submit', function (e) {
  // prevent submit
  e.preventDefault();

  // send/emit a new message
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function() {

  })
});

// store our send-location button selector
var locationButton = jQuery('#send-location');

// add a 'click' listener
locationButton.on('click', function () {
  // if geolocation is not supported
  if (!navigator.geolocation){
      return alert('Geolocation not supported by your browser');
  }

  // try to fetch user geolocation
  navigator.geolocation.getCurrentPosition(function (position) {
    // if we successfully get the geolocation, emit a 'createLocationMessage' event
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    // if user forbid us from getting his location, throw an error
    alert('Unable to fetch location. Please allow location share.');
  });
});


