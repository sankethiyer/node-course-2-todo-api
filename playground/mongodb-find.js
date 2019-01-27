// cd 'C:\Program Files\MongoDB\Server\4.0\bin'
// .\mongod.exe --dbpath C:\Users\iyers\mongo-data\

//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

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


    // db.collection('Todos').count({
    //     _id: new ObjectID("5c4ca697b114e73314bf030a")
    // }).toArray().then((docs) => {
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     return console.log("error in creating todo", err);
    // });


    //db.collection('Todos').count().then((count) => {
    // db.collection('Todos').countDocuments().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     return console.log("error in creating todo", err);
    // });


    db.collection('Users').find({
        name: "sanketh iyer"
    }).toArray().then((docs) => {
        //console.log(`Todos count: ${count}`);
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        return console.log("error in creating todo", err);
    });


    //client.close();
});
