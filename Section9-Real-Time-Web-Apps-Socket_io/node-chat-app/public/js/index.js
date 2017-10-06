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
socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
});

// handle Message Form submission
jQuery('#message-form').on('submit', function (e) {
  // prevent submit
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');
  // send/emit a new message
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('')
  })
});

// store our send-location button selector
var locationButton = jQuery('#send-location');

// add a 'click' listener
locationButton.on('click', function () {
  // if geolocation is not supported
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  // try to fetch user geolocation
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    // if we successfully get the geolocation, emit a 'createLocationMessage' event
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    // if user forbid us from getting his location, throw an error
    alert('Unable to fetch location. Please allow location share.');
  });
});


