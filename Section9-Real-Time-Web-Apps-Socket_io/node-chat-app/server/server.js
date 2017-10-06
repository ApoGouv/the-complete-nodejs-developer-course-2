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

  // emit() let us CREATE our own events and send custom data
  // here we create a 'newMessage' event
  socket.emit('newMessage', {
    from: 'tolios@example.com',
    text: 'Hey. What is going on.',
    createdAt: new Date().getTime()
  });

  // listen for 'createMessage' events
  socket.on('createMessage', (message) => {
    console.log('~~ createMessage from Client ~~');
    console.log(`From   : ${message.from}`);
    console.log(`Message: ${message.text}`);
    message.createdAt = new Date().getTime();
    console.log(`At     : ${message.createdAt}`);
  });

  // listen for the 'disconnect' event, from the client side
  socket.on('disconnect', () => {
    console.log('User was disconnected.');
  })
});


server.listen(port, () => {
  console.log(`
 ▂▃▅▇█▓▒░░░░--------------░░░░▒▓█▇▅▃▂`);
  console.log(`█   `,`Server listening on port: ${port}`,`   █`);
  if (port === 3000) {
    console.log(`█   `, `Visit: http://localhost:${port}/`,`    █`);
  }
  console.log(`▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄`);
  console.log('');
});