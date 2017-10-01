/**
 * File    : utils.test.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 1/10/2017
 */
const utils = require('./utils');

it('should add two numbers', () => {
    var res = utils.add(33, 11);

    if (res !== 44){
        throw new Error(`Expected 44, but got ${res}`);
    }
});


it('should square a number', () => {
    var res = utils.square(5);

    if (res !== 25){
        throw new Error(`Expected 25, but got ${res}`);
    }
});