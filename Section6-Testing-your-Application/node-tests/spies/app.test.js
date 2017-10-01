/**
 * File    : app.test.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 1/10/2017
 */
const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app');
// app.__set__
// app.__get__

describe('App', () => {

    var db = {
        saveUser: expect.createSpy()
    };
    app.__set__('db', db);

    it('should call the spy correctly', () => {
        var spy = expect.createSpy();
        spy('Tolios', 30);
        expect(spy).toHaveBeenCalledWith('Tolios', 30);
    })

    // Verify functions that call other functions, using spies
    it('should call saveUser with user object', () => {
       var email = 'apo@example.com';
       var password = '123abc';

       app.handleSignup(email, password);
       expect(db.saveUser).toHaveBeenCalledWith({email, password});
    });
});
