/**
 * File    : weather.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 15/9/2017
 */
const request = require('request');

//const weatherBitKey = require('./weatherbit.io.API_KEY');
const darkSkyKey = require('./darksky.io.API_KEY');


// get the API Key for weatherbit.io
//const API_KEY = weatherBitKey.weatherBitAPIKey();
// get the API Key for darksky.net
const API_KEY = darkSkyKey.darkSkyAPIKey();


/*
 * Alternative weather data, from the WeatherBit.io API
 * @url: https://www.weatherbit.io/
 * @ExampleRequest: https://api.weatherbit.io/v2.0/current?units=M&lat=38.123on=-78.543&key=API_KEY
 */

/**
 * For our weather data, we will use the DarkSky.net API
 * @url: https://www.darksky.net/dev/
 * @ExampleRequest: https://api.darksky.net/forecast/API_KEY/37.8267,-122.4233
 */
var getWeather = (lat, lng, callback) => {

    // var address = place.address;
    // var lat = place.latitude;
    // var lng = place.longtitude;
    var lat = lat;
    var lng = lng;

    request({
        url: `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}?units=ca`,
        json: true
    }, (error, response, body) => {
        if (error){
            callback(`Unable to connect to DarkSky.net server.`);
        } else if (response.statusCode === 400){
            callback(`Unable to fetch weather.`);
        }else if (response.statusCode === 200){
            // all good, so print the temp and weather description
            callback(undefined, {
                weatherSummary: body.currently.summary,
                weatherTemperature: body.currently.temperature,
                weatherFeelTemperature: body.currently.apparentTemperature
            });
        }
    });
};




// export the function we want to use in the app.js
module.exports.getWeather = getWeather;