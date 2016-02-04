var express = require('express');
var router = express.Router();
var moment = require('moment');
var _ = require('underscore');
var color = require('cli-color');
var db = require('../../database');
var Todos = db.todos;

// POST /todo
router.post('/', function(req, res) {

	console.log('entrando');
	// The posted information from the front-end
	var body = req.body;
	// Current time this occurred
	var time = moment().format('MMMM Do YYYY, h:mm:ss a');

	console.log('schema');
	// setup the new user
	var newTodo = new Todos({
		
		title: body.title,
		detail: body.detail,
		url: body.url,
		date: body.date,
		dateCompleted: body.dateCompleted,
		priority: body.priority,
		project: body.project,
		status: body.status
	});

	console.log('save');
	// save the user to the database
	newTodo.save(function(err, newTodo, numberAffected) {
		console.log('comprobando si hay err');
		if (err) {
			console.log('Problem saving the todo ' + color.yellow(body.title) + ' due to ' + err);
			res.status(500).json({
				'message': 'Database error trying to sign up.  Please contact aljumaro@gmail.com.'
			});
		}
	});

	console.log('Successfully created new todo: ' + color.green(body.title));

	res.status(201).json({
		'message': 'Successfully created new todo',
		'client': newTodo
	});

	console.log('despues del res');

});

// GET /signup/info
router.get('/', function(req, res) {
	Todos.find({}, function (err, docs) {
        res.json(docs);
    });
});

router.put('/', function(req, res) {
	var body = req.body;
	res.json({'msg': 'PUT para el todo ' + body.title});
});

// etc...

module.exports = router;