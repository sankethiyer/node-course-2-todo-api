// cd 'C:\Program Files\MongoDB\Server\4.0\bin'
// .\mongod.exe --dbpath C:\Users\iyers\mongo-data\

//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'TodoApp';

//Use connect method to connect to the server
MongoClient.connect(url + dbName, { useNewUrlParser: true }, function (err, client) {
    if (err) {
        return console.log("error in connection");
    }
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    // db.collection('Todos').insertOne({
    //     text: 'something to do',
    //     completed: true
    // }, (err, result) => {
    //     if (err) {
    //         return console.log("error in creating todo", err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'sanketh iyer',
    //     age: 29,
    //     location: 'andheri, mumbai'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log("error in creating todo", err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //     console.log(result.ops[0]._id.getTimestamp());
        
    // });

    client.close();
});
