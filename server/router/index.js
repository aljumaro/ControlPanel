module.exports = function(app) {

    app.get('*', function(req, res, next) {
        if (req.session) {
        	console.log('Cookie originalMaxAge: ' + req.session.cookie.originalMaxAge);
            console.log('Cookie maxAge: ' + req.session.cookie.maxAge);
            console.log('Cookie expires: ' + req.session.cookie.expires);
        }
        next();
    });

    app.use('/api/todo', require('./routes/todo'));
    app.use('/api/account', require('./routes/account'));
};
