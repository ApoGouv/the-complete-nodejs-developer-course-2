/**
 * File    : server.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 26/9/2017
 */
const express = require('express');
const hbs = require('hbs');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


// routes config
// handler for 'root' route: /
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Tolios',
    //     likes: [
    //         'Biking',
    //         'Food'
    //     ]
    // })
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Awesome Node + Express + Handlebars',
        currentYear: new Date().getFullYear()
    })
});

// handler for route: /about
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
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