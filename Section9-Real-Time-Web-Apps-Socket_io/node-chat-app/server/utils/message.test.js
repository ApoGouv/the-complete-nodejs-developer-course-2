/**
 * File    : message.test.js.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 6/10/2017
 */
const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from ='Tolios';
    var text ='Let\'s go for Beers!';
    var message = generateMessage(from, text);

    // // assert 'from' match
    // expect(message.from).toBe(from);
    // // assert 'text' match
    // expect(message.text).toBe(text);
    // or we can check if message Obj match certain criteria
    expect(message).toMatchObject({from, text});
    // assert 'createdAt' is number
    expect(typeof message.createdAt).toBe('number');
  });
});