// dependencies
var express = require('express');
var path = require('path');
var logger = require('morgan');
var consolidate = require('consolidate');

// route files
var indexRoute = require('./routes');
var todosRoute = require('./routes/todos');
var contactsRoute = require('./routes/contacts');

// start express
var app = express();

// templates
app.engine('hjs', consolidate.hogan);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');

// app.set('env', 'production'); 

// middleware for all routes
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// routes

app.use('/test', require('./routes/test'));

app.use('/', indexRoute);
app.use('/todos', todosRoute);
app.use('/contacts', contactsRoute);

// error handlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

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
