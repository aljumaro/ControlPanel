var express = require('express');
var passport = require('passport');
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

module.exports = router;
