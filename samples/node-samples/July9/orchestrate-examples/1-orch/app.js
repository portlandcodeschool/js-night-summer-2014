

// dependencies
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var consolidate = require('consolidate');
var Q = require('q');
var config = require('./config.js');
var db = require('orchestrate')(config.dbKey); // you need to use your own api key
// add a file in this same directory called config.js
// export an object from the file with the property called dbKey
// add your own orchestrate app key 

// "data"
// var items = {items: ["mow the lawn", "do the dishes", "paint the fence", "wax on, wax off"]};
var items = [];


// start express
var app = express();

// template configuration
app.engine('html', consolidate.hogan);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');

// app.set('env', 'production'); 

// express middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));


var dbFunctions = {};

dbFunctions.addFakeTodo = function () {
  db.put('todos', 'todo1', {
    "todo": "mow the lawn"
  })
  .fail(function (err) {
    console.error(err);
  });
}

dbFunctions.addFakeTodo();

// express routes
app.get('/', function (req, res) {
  db.get('todos', 'todo1')
  .then(function (result) {
    items.push(result.body.todo);
    res.render('todos', {items:items});
  })
  .fail(function (err) {
    console.error(err);
  })
});

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
