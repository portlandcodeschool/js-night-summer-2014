// dependencies
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var consolidate = require('consolidate');

// bring in route handler functions 
var todosRoute = require('./routes/todos');
var indexRoute = require('./routes/index');
var contactRoute = require('./routes/contacts');

// start express
var app = express();

// template configuration
app.engine('html', consolidate.hogan);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// app.set('env', 'production'); 

// express middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

// express routes

app.get('/', indexRoute);

app.get('/todos', todosRoute);

app.get('/contacts', contactRoute);

// express middleware for error handling
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace to browswer...awesome!
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
// no stacktraces leaked to user... also awesome!
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port # ' + app.get('port'));
});
