module.exports = function (app) {
	
    app.use('/api/todo', require('./routes/todo'));
    app.use('/api/account', require('./routes/account'));
};