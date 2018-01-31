var express = require('express');                                                       //Declare
var path = require('path');                                                             //Libraries
var favicon = require('static-favicon');                                                //
var logger = require('morgan');                                                         //
var cookieParser = require('cookie-parser');                                            //
var bodyParser = require('body-parser');                                                //
var mongoose = require('mongoose');                                                     //
var passport = require('passport');
var config = require('./config/database');
var debug = require('debug')('myapi:server');
var routes = require('./routes/index');                                                 //Declare
var users = require('./routes/users');                                                  //Routes
var api  =require('./routes/api');                                                       //

try{
    mongoose.connect(config.database);
}
catch(err){
    console.log(err.message);
}

var app = express();                                                                    //Initialize app
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
  next();
})
app.use(passport.initialize());


app.set('views', path.join(__dirname, 'views'));                                        // view engine setup
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);
app.use('/api',api);
app.get('/',function(req,res){
    res.send('<h1>Page Under Construction</h1>');
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
