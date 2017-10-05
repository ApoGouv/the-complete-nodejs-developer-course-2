/**
 * File    : server.js.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 5/10/2017
 */
const path = require('path');
const fs = require('fs');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = new express();


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


app.listen(port, () => {
  console.log(`
 ▂▃▅▇█▓▒░░░░------------░░░░▒▓█▇▅▃▂`);
  console.log(`█   Server listening on port: ${port}`);
  if (port === 3000) {
    console.log(`█   Visit: http://localhost:${port}/`);
  }
  console.log(`▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄`);
  console.log('');
});