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

// make a request to Google Maps Geocoding API  and expect a json as answer
// more info about the API: https://developers.google.com/maps/documentation/geocoding/start
request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
}, (error, response, body) => {
    // handle machine errors via error obj, e.g.: unable to connect to connect to a network
    // handle errors coming fom other server, e.g.: the Google server, like invalid address
    if (error){
        console.log(`Unable to connect to Google servers.\n ${error}`);
    } else if (body.status === 'ZERO_RESULTS'){
        /* "ZERO_RESULTS" indicates that the geocode was successful but returned no results.
         * This may occur if the geocoder was passed a non-existent address.*/
        console.log(`Unable to find that address: "${argv.address}".`);
    } else if (body.status === 'OVER_QUERY_LIMIT') {
        /* "OVER_QUERY_LIMIT" indicates that you are over your quota. */
        console.log('Busted! You are over your quota.');
    } else if (body.status === 'REQUEST_DENIED') {
        /* "REQUEST_DENIED" indicates that your request was denied. */
        console.log('You found AREA 52 - Your request was denied.');
    } else if (body.status === 'INVALID_REQUEST') {
        /* "INVALID_REQUEST" generally indicates that the query
         * (address, components or latlng) is missing. */
        console.log('WoW! maybe type an address first ?');
    } else if (body.status === 'UNKNOWN_ERROR') {
        /* "UNKNOWN_ERROR" indicates that the request could not be processed due to a
         * server error. The request may succeed if you try again. */
        console.log('Opps. Shit happens. Try again please!');
    } else if (body.status === 'OK') {
        /* "OK" all good! Finally.. or not? */
        console.log(`Address   : ${body.results[0].formatted_address}`);
        console.log(`Latitude  : ${body.results[0].geometry.location.lat}`);
        console.log(`Longtitude: ${body.results[0].geometry.location.lng}`);
    }
});