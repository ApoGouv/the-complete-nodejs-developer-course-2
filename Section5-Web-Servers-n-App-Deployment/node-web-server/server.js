/**
 * File    : server.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 26/9/2017
 */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


// middleware to keep track of our server requests
app.use((req, res, next) => {
    var now = new Date().toString();
    // log a timestamp + request method + requested path
    var log = `${now}: ${req.method} ${req.url}`;
    // log to console the request
    console.log(log);
    // save the request to a file
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err){
            console.log('Unable to append to server.log. ', err );
        }
    });
    next();
});

// middleware - maintenance - Since we do not call 'next()' everything will stop at this page
// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         maintenanceTitle: `We'll be right back`,
//         maintenanceMessage: 'The site is currently being updated!'
//     })
// });

// express middleware: read from a static directory
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// routes config
// handler for 'root' route: /
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Awesome Node + Express + Handlebars'
    })
});

// handler for route: /about
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
});

// handler for route: /bad
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Something BAD happened!'
    })
});

/*
 * This app starts a server and listens on port 3000 for connections.
 * The app responds with “Hello Express!” for requests to the
 * root URL (/) or route.
 * For every other path, it will respond with a 404 Not Found.
 * */
app.listen(3000, () => {
    console.log('Server listening on port 3000!');
    console.log('Visit: http://localhost:3000/');
});