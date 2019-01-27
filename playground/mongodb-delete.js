// cd 'C:\Program Files\MongoDB\Server\4.0\bin'
// .\mongod.exe --dbpath C:\Users\iyers\mongo-data\

//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

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

    // Deletemany
    // db.collection('Todos').deleteMany({
    //     text: "eat lunch"
    // }).then((result) => {
    //     console.log(result);
    // });


    // Deleteone
    // db.collection('Todos').deleteOne({
    //     text: "eat lunch"
    // }).then((result) => {
    //     console.log(result);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({
    //     completed: false
    // }).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Users').findOneAndDelete({
    //     _id: new ObjectID('5c4ca93a43955306b0281a25')
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').deleteMany({
        name: "sanketh iyer"
    }).then((result) => {
        console.log(result);
    });
    //client.close();
});
