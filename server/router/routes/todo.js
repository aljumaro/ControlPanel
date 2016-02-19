var express = require('express');
var router = express.Router();
var moment = require('moment');
var _ = require('underscore');
var color = require('cli-color');
var db = require('../../database');
var sanitize = require('mongo-sanitize');
var Todo = db.Todo;

// POST /todo
router.post('/', function(req, res) {
	// The posted information from the front-end
	var body = req.body;
	// Current time this occurred
	var time = moment().format('MMMM Do YYYY, h:mm:ss a');

	console.log('schema');
	// setup the new user
	var newTodo = new Todo({
		
		title: body.title,
		detail: body.detail,
		url: body.url,
		date: body.date,
		dateCompleted: body.dateCompleted,
		priority: body.priority,
		project: body.project,
		status: body.status
	});

	// save the user to the database
	newTodo.save(function(err, newTodo, numberAffected) {
		if (err) {
			console.log('Problem saving the todo ' + color.yellow(body.title) + ' due to ' + err);
			res.status(500).json({
				'message': 'Database error trying to create Todo.  Please contact aljumaro@gmail.com.'
			});
		}
	});

	console.log('Successfully created new todo: ' + color.green(body.title));

	res.status(201).json({
		'message': 'Successfully created new todo',
		'client': newTodo
	});

});

// GET /signup/info
router.get('/', function(req, res) {
	Todo.find({}, function (err, docs) {
        res.json(docs);
    });
});

router.put('/:todo_id', function(req, res) {
	var body = req.body;

	var query = {'_id': req.params.todo_id};

	Todo.findOneAndUpdate(query, body, {new: true}, function(err, todo){
		if (err) {
			console.log('Problem saving the todo ' + color.yellow(body.title) + ' due to ' + err);
			res.status(500).json({
				'message': 'Database error trying to create Todo.  Please contact aljumaro@gmail.com.'
			});
		}

		res.status(200).json({
			'message': 'Successfully modified todo ' + body.title
		});
	});


});

router.delete('/:todo_id', function(req, res) {

	var cleanId = sanitize(req.params.todo_id);

	Todo.remove({
		_id: req.params.todo_id
	}, function(err, todo){
		if (err) {
			res.status(500).json({
				'message': 'Database error trying to delete ' + req.params.todo_id
			});
		}

		res.status(200).json({
			'message': 'Successfully deleted todo' + todo.title
		});

	});
});

// etc...

module.exports = router;