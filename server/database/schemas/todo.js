var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the User Schema
var todoSchema = new Schema({
    title: { type: String, required: true },
    detail: { type: String, required: true },
    date: { type: Date, required: true},
    dateCompleted: { type: Date},
    priority: { type: String},
    project: { type: String},
    status: { type: String},
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;