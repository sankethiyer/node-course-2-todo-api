const { Todo } = require("./../server/models/todo");
const { mongoose } = require("./../server/db/mongoose");
const {ObjectID} = require('mongodb');
const { User } = require("./../server/models/user");

// var id = "5c5ced3ced193523b40e7ed011";

// if (!ObjectID.isValid(id)) {
//     console.log("id invalid!");
// }
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log("Todos ", todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log("Todo ", todo);
// });


// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log("no todo found by id");
//     }
//     console.log("Todo by ID ", todo);
// }).catch((e)=> console.log(e));

User.findById('5c4dec0edaa158226cc4e11b').then((user) => {
    if (!user) {
        return console.log("no user found by id");
    }
    console.log("user by ID ", user);
}).catch((e)=> console.log(e));
