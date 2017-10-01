/**
 * File    : server.test.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 1/10/2017
 */
const request = require('supertest');
const expect = require('expect');

var app = require('./server').app;

it('should return hello world response', (done) => {
    request(app)
        .get('/')
        .expect(404)
        .expect((res) => {
            expect(res.body).toInclude({
               error: 'Page not found.'
            });
        })
        .end(done);
});

// Make a new test
// assert 200
// Assert that you exist in users array
it('should return my user object', (done) => {
    request(app)
        .get('/users')
        .expect(200)
        .expect((res) => {
            expect(res.body).toInclude(
                    {
                        name: 'Tolios',
                        age: 30
                    }
            );
        })
        .end(done);
});