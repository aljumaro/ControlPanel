var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    email: { type: String, required: true },
    profile: {
        firstname: { type: String },
        lastname: { type: String },
        position: { type: String },
        since: {type: Date},
        pic: {
            mime: { type: String },
            content: { type: Buffer }
        }
    }
});

var options = {
    usernameField: 'email',
    usernameLowerCase: true
};

Account.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('Account', Account);
