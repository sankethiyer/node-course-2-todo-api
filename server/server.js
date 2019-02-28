require("./../config/config");

var PORT = process.env.PORT;
var express = require("express");
var bodyParser = require("body-parser");
const { ObjectID } = require('mongodb');
const _ = require('lodash');

var { mongoose } = require("./db/mongoose");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");

var app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});


app.get("/todos", (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get("/todos/:id", (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    } else {
        Todo.findById(id).then((todo) => {
            if (todo) {
                res.send({ todo });
            } else {
                res.status(404).send();
            }
        }).catch((e) => {
            res.status(400).send();
        });
    }
});

app.delete("/todos/:id", (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    } else {
        Todo.findByIdAndDelete(id).then((todo) => {
            if (todo) {
                res.send({ todo });
            } else {
                return res.status(404).send();
            }
        }).catch((e) => {
            res.status(400).send();
        });
    }
});

app.patch("/todos/:id", (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        } else {
            res.send({ todo });
        }
    }).catch((e) => {
        res.status(400).send();
    });

});

app.listen(PORT, () => {
    console.log(`Started on ${PORT}`);
});

module.exports = { app };