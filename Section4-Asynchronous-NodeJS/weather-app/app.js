/**
 * File    : app.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 14/9/2017
 */
const request = require('request');
const yargs = require('yargs');


const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

// encodeURIComponent() accepts a string and transforms it to be URI compatible
var encodedAddress = encodeURIComponent(argv.address);

// make a request to google maps and expect a json as answer
request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
}, (error, response, body) => {
    console.log(`Address   : ${body.results[0].formatted_address}`);
    console.log(`Latitude  : ${body.results[0].geometry.location.lat}`);
    console.log(`Longtitude: ${body.results[0].geometry.location.lng}`);
});