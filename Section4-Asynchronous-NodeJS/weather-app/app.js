/**
 * File    : app.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 14/9/2017
 */
const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=2%20Al.%20Papanastasiou%20Thessaloniki',
    json: true
}, (error, response, body) => {
    // the last 4 is for indentation. it can be whatever you prefer
    console.log(JSON.stringify(body, undefined, 4));
});