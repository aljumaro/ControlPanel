var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
	email: {type: String, required: true}
});

var options = {
	usernameField: 'email',
	usernameLowerCase: true
};

Account.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('Account', Account);