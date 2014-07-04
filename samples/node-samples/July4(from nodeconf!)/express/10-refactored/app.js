// dependencies
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var consolidate = require('consolidate');

// start express
var app = express();

// bring in route handler functions 
var indexHandler = require('./routes');
var todosHandler = require('./routes/todos');
var contactsHandler = require('./routes/contacts');

// template configuration
app.engine('html', consolidate.hogan);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// app.set('env', 'production'); 

// express middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

// express routes

app.route('/')
  .get(indexHandler);

app.route('/todos')
  .get(todosHandler.get)
  .post(todosHandler.post);

app.del('/todos/:id', todosHandler.del);

app.route('/contacts')
  .get(contactsHandler.get)
  .post(contactsHandler.post);

app.del('/contacts/:id', contactsHandler.del);

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
