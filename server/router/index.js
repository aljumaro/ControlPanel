module.exports = function (app) {
    app.use('/api/todo', require('./routes/todo'));
};