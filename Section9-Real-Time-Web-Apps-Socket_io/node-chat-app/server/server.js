/**
 * File    : server.js.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 5/10/2017
 */
const path = require('path');
const fs = require('fs');
const http = require('http');
const express = require('express');
const sockeetIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = new express();
var server = http.createServer(app);
var io = sockeetIO(server);


// middleware to keep track of our server requests
// app.use((req, res, next) => {
//   var now = new Date().toString();
//   // log a timestamp + request method + requested path
//   var log = `${now}: ${req.method} ${req.url}`;
//   // log to console the request
//   console.log(log);
//   // save the request to a file
//   fs.appendFile('server.log', log + '\n', (err) => {
//     if (err) {
//       console.log('Unable to append to server.log. ', err);
//     }
//   });
//   next();
// });

// express static middleware: read from public directory
app.use(express.static(publicPath));

/**
 * io.on( 'event' , cb): lets us to register an event listener
 * - we can listen for a specific event and do sth, when that event happens
 *
 * - the built-in 'connection' event: which let us listen for a new connection
 *    + meaning that a client connected to the server. And let us do sth when
 *    + that connection comes
 */
io.on('connection', (socket) => {
  console.log('New user connected.');

  // emit a welcome message when someone connects
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  // let all connected clients that a new client joined the chat
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));


  // listen for 'createMessage' events
  socket.on('createMessage', (message, callback) => {
    console.log('~~ createMessage from Client ~~');
    console.log(message);

    // *io.emit(): let us to emit events to EVERY single Connection
    // create a 'newMessage' event and send it everywhere
    io.emit('newMessage',  generateMessage(message.from, message.text));

    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  });

  // listen for the 'disconnect' event, from the client side
  socket.on('disconnect', () => {
    console.log('User was disconnected.');
  })
});


server.listen(port, () => {
  console.log(`
 ▂▃▅▇█▓▒░░░░--------------░░░░▒▓█▇▅▃▂`);
  console.log(`█   `, `Server listening on port: ${port}`, `   █`);
  if (port === 3000) {
    console.log(`█   `, `Visit: http://localhost:${port}/`, `    █`);
  }
  console.log(`▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄`);
  console.log('');
});