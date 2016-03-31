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
            contentType: { type: String, select: false },
            content: { type: Buffer, select: false }
        }
    }
});

var options = {
    usernameField: 'email',
    usernameLowerCase: true
};

Account.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('Account', Account);
