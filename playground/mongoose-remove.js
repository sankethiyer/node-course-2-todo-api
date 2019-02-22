const { Todo } = require("./../server/models/todo");
const { mongoose } = require("./../server/db/mongoose");
const { ObjectID } = require('mongodb');
const { User } = require("./../server/models/user");

// Todo.deleteMany({}).then((result) => {
//     console.log(result);
// });

Todo.findByIdAndDelete("5c6ff9efeec4e2d47e7fee7e").then((todo) =>{
    console.log(todo);
});