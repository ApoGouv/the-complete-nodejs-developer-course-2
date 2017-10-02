/**
 * File    : mongodb-connect.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 2/10/2017
 */
// const MongoClient = require('mongodb').MongoClient;
//const {MongoClient} = require('mongodb');// this is identical to the above
const {MongoClient, ObjectID} = require('mongodb');// here we destructuring 2 properties from mongodb

// var user = {name: 'Tolios', age:30};
// // ES6 Object destructuring ~ pull out properties from an object, creating variables.
// // Destructuring is a way to make new variables from an object's properties
// var {name} = user;
// console.log(name);// Tolios

// var obj = new ObjectID(); // Create Unique ids
// console.log(obj);

/**
 * Host name of the MongoDB instance/Database Name, e.g: mongodb://localhost:27017/TodoApp
 * connect to the mongodb server: mongodb://localhost:27017/
 * the last part is the DB Name. e.g.: TodoApp
 * in Mongo db we don't have to create a DB before we use it.
 * But, Mongo will not actually create the db, before we add some data in it.
 */
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err){
        // with return here, we stop the function to continue and
        // print the success message. Alternatively, we can use an
        // else statement for the success case.
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err){
    //         return console.log('Unable to insert todo', err);
    //     }
    //
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // Insert new doc into Users collection (name, age, location)
    // db.collection('Users').insertOne({
    //     name: 'Tolios',
    //     age: 30,
    //     location: 'Salonika'
    // }, (err, result) => {
    //     if (err){
    //         return console.log('Unable to insert user', err);
    //     }
    //
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //     // ObjectIds like the default _id has embedded a timestamp, which we can retrieve:
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    // });

    db.close();// Close the MongoDB connection to the server
});