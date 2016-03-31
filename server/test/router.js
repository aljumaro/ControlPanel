var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../config/configuration.js');

var dbUrl = config.db.url;

describe('Routing', function() {
	var url = 'http://localhost:3000/api';

	describe('Account', function() {

		var testmail = 'email@email.com';
		var password = 'test';
		var login = 'usuario';

		var newAccount = {
			username: login,
			email: testmail,
			password: password
		};

		var newAccountDup = newAccount;

		var userLogin = {
			username: testmail,
			password: password
		};

		it('should return 200 status trying to save user', function(done) {

			request(url)
				.post('/account/register')
				.send(newAccount)
				.end(function(err, res) {
					if (err) {
						throw err;
					}

					res.status.should.be.equal(200);
					done();
				});
		});

		it('should return 409 error trying to save duplicate user and return UserExistsError', function(done) {

			request(url)
				.post('/account/register')
				.send(newAccountDup)
				.end(function(err, res) {
					if (err) {
						throw err;
					}

					res.status.should.be.equal(409);
					res.body.should.have.property('err');
					var err = res.body.err;
					err.should.have.property('name');
					var errName = err.name;
					errName.should.be.equal('UserExistsError');
					done();
				});
		});

		it('should return 200 trying to authenticate user and return authenticated user', function(done) {

			request(url)
				.post('/account/login')
				.send(userLogin)
				.end(function(err, res) {
					if (err) {
						throw err;
					}

					res.status.should.be.equal(200);
					res.body.should.have.property('user');
					var user = res.body.user;
					user.should.have.property('email');
					var mail = user.email;
					mail.should.be.equal(testmail);
					done();
				});
		});

		it('should return 401 trying to authenticate user', function(done) {

			request(url)
				.post('/account/login')
				.send({username: 'otro@test.com', password: 'otra'})
				.end(function(err, res) {
					if (err) {
						throw err;
					}

					res.status.should.be.equal(401);
					done();
				});
		});

		it('should return 200 trying to logout user', function(done) {
			request(url)
				.get('/account/logout')
				.end(function(err, res) {
					if (err) {
						throw err;
					}

					res.status.should.be.equal(200);
					done();
				});
		});

		it('should return 200 trying to delete user', function(done) {
			request(url)
				.delete('/account/email@email.com')
				.end(function(err, res) {
					if (err) {
						throw err;
					}

					res.status.should.be.equal(200);
					done();
				});
		});
	});

});