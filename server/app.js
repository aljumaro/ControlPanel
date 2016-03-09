require('dotenv').config();
var express = require('express');
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();


app.use(logger('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Configuracion de las cookies de la sesion
var sess = {
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    },
    store: new MongoStore({
        url: process.env.DB_URL,
    })
};

if (process.env.ENVIRONMENT === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));
app.use(flash());
//inicializacion de passport
app.use(passport.initialize());
app.use(passport.session());

/**
 * Development Settings
 */
if (process.env.ENVIRONMENT === 'development') {
    // This will change in production since we'll be using the dist folder
    app.use(express.static(path.join(__dirname, '../client')));
    // This covers serving up the index page
    app.use(express.static(path.join(__dirname, '../client/.tmp')));
    app.use(express.static(path.join(__dirname, '../client/app')));

    console.log('Arrancado el servidor en el entorno de desarrollo');
}

/**
 * Production Settings
 */
if (process.env.ENVIRONMENT === 'production') {
    // changes it to use the optimized version for production
    app.use(express.static(path.join(__dirname, '/dist')));

    console.log('Arrancado el servidor en el entorno de produccion');

}

var router = require('./router')(app);

// Error Handling
app.use(function(err, req, res, next) {
    console.log('Error handling');
    console.error(err.stack);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
