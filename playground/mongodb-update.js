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


    // findOneAndUpdate
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5c4ca697b114e73314bf030a')
    // }, {
    //         $set: { completed: true }
    //     }, {
    //         returnOriginal: false
    //     }).then((result) => {
    //         console.log(result);
    //     });

    // findOneAndUpdate
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5c4ca889d1178a0a641f5200')
    }, {
            $set: {
                name: "Sanketh Iyer"
            },
            $inc: {
                age: -2
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result);
        });

    //client.close();
});
