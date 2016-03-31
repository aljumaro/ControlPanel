var express = require('express');
var passport = require('passport');
var multiparty = require('multiparty');
var fs = require('fs');
var router = express.Router();

var db = require('../../database');
var Account = db.Account;

router.post('/register', function(req, res) {
    var newUser = {
        email: req.body.email,
        profile: {
            since: new Date()
        }
    };

    Account.register(new Account(newUser), req.body.password, function(err, account) {
        if (err) {
            return res.status(409).json({
                'message': 'Error trying to register user',
                'err': err
            });
        }

        res.status(200).json({
            'message': 'User registered successfully'
        });
    });
});

router.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        console.log(req.user);
        res.status(200).json({
            'message': 'User authenticated successfully',
            'user': req.user
        });
    });

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        'message': 'User logged out successfully'
    })
});

router.delete('/:email', function(req, res) {
    Account.remove({
        email: req.params.email
    }, function(err, todo) {
        if (err) {
            res.status(500).json({
                'message': 'Database error trying to delete ' + req.params.email
            });
        }

        res.status(200).json({
            'message': 'Successfully deleted user' + req.params.email
        });

    });
});

router.get('/status', function(req, res) {
    if (!req.isAuthenticated()) {
        return res.status(200).json({ logged: false });
    }

    res.status(200).json({ logged: true, email: req.user.email });
});

router.put('/profile/:user_id', function(req, res) {
    var profile = req.body;

    var _id = req.params.user_id;

    Account.findByIdAndUpdate(_id, { 'profile': profile }, function(err, user) {
        if (err) {
            console.log('Problem saving the profile ' + _id + ' due to ' + err);
            res.status(500).json({
                'message': 'Database error trying to update profile.'
            });
        }

        console.log(JSON.stringify(user));

        res.status(200).json({
            'message': 'Successfully modified user ' + _id,
            'profile': user.profile
        });
    });
});

router.post('/profile/pic/:user_id', function(req, res) {
    var _id = req.params.user_id;

    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {

        var file = files.file[0];

        fs.readFile(file.path, function(err, data) {

            var pic = {
                contentType: file.headers["content-type"],
                content: data
            }

            Account.findByIdAndUpdate(_id, { 'profile.pic': pic }, function(err, user) {

                if (err) {
                    console.log('Problem saving the profile pic ' + _id + ' due to ' + err);
                    res.status(500).json({
                        'message': 'Database error trying to update profile pic.'
                    });
                }

            });

            fs.unlink(file.path, function(err) {
                if (err) {
                    console.log('Error deleting image temp', err, _id);
                }
            });

        });
    })


    res.status(200).json({
        'message': 'Successfully uploaded user pic ' + _id
    });
});

router.get('/profile/pic/:user_id', function(req, res) {

    var qId = req.params.user_id;

    Account.findOne({_id : qId}, { profile: 1 }, function(err, doc) {
        if (doc.profile.pic.contentType) {
            res.writeHead(200, { 'Content-Type': doc.profile.pic.contentType });
            res.end(doc.profile.pic.content, 'binary');
        } else {
            res.status(404).json({
                'message': 'Picture could not be found'
            });
        }
    })
});

module.exports = router;
