var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var TodoModel = require('./schemas/todo');
var AccountModel = require('./schemas/account');
var config = require('./../config/configuration.js');

var dbUrl = config.db.url;

mongoose.connect(dbUrl);

// get an instance of our connection to our database
var db = mongoose.connection;

// Logs that the connection has successfully been opened
db.on('error', console.error.bind(console, 'connection error:'));
// Open the connection
db.once('open', function callback () {
  console.log('Database Connection Successfully Opened at ' + dbUrl);
});

passport.use(new LocalStrategy(AccountModel.authenticate()));
passport.serializeUser(AccountModel.serializeUser());
passport.deserializeUser(AccountModel.deserializeUser());

exports.Todo = TodoModel;
exports.Account = AccountModel;