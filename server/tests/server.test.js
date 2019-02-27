const expect = require("expect");
const request = require("supertest");
var { app } = require("./../server");
var { Todo } = require("./../models/todo");
const { ObjectID } = require('mongodb');

const todos = [{
    _id: new ObjectID(),
    text: 'first test',
    completed: false
}, {
    _id: new ObjectID(),
    text: 'second test',
    completed: true,
    completedAt: 333
}];

beforeEach((done) => {
    Todo.deleteMany({}).then((cd) => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe("todo POST API", () => {

    var text = "test node text";
    it("should add a todo", (done) => {
        request(app)
            .post("/todos")
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it("should not add a todo", (done) => {
        request(app)
            .post("/todos")
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe("get todos api", () => {
    it("it should get all todos", (done) => {
        request(app)
            .get("/todos")
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe("get todos/:id api", () => {
    it("it should get correct todo", (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it("it should return 404 if obj not found", (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it("it should return 404 if obj id is invalid", (done) => {
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);
    });
});

describe("todo /DELETE API", () => {
    var hexId = todos[0]._id.toHexString();

    it("should delete a todo", (done) => {
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(hexId).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => done(e));
            });
    });

    it("it should return 404 if obj not found", (done) => {
        request(app)
            .delete(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it("it should return 404 if obj id is invalid", (done) => {
        request(app)
            .delete(`/todos/123`)
            .expect(404)
            .end(done);
    });
});

describe("PATCH todos/:id api", () => {
    var text = "new text";

    it("it should update todo", (done) => {
        request(app)
            .patch(`/todos/${todos[0]._id.toHexString()}`)
            .send({
                text,
                completed: true,
                completedAt: new Date().getTime()
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
    });

    it("it should remove completedAt if completed is false", (done) => {
        request(app)
            .patch(`/todos/${todos[1]._id.toHexString()}`)
            .send({
                text,
                completed: false
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
    });

});
