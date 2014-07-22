// dependencies
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config.js');
var consolidate = require('consolidate');

var db = require('orchestrate')(config.dbKey);

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('html', consolidate.hogan);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');

// express routes

app.get('/', function (req, res) {
  res.render('./index.html');
});

//db.deleteCollection('bb-todos');

app.get('/api/todos', function (req, res) {
  var todos = [];
  db.list('bb-todos')
  .then(function (result) {
    result.body.results.forEach(function (item){
      todos.push(item.value);
    });
    res.json(todos);
    console.log(todos);
  })
  .fail(function (err) {
    console.error(err);
  });
});

app.post('/api/todos', function (req, res){
  req.accepts('application/json');
  console.log(req.body);
  db.put('bb-todos', ('todo' + req.body.creationDate), req.body)
  .then(function (){
    console.log(req.body);
    res.send(200, 'ok, we added your todo, here is what you added');
  })
  .fail(function (err) {
    console.error(err);
  });
});

app.get('/api/contacts', function (req, res) {
  var contacts = [];
  db.list('bb-contacts')
  .then(function (result) {
    result.body.results.forEach(function (item){
      contacts.push(item.value);
    });
    console.log(contacts);
    res.json(contacts);
  })
  .fail(function (err) {
    console.error(err);
  })
});

app.post('/api/contacts', function (req, res){
  req.accepts('application/json');
  console.log(req.body);
  db.put('bb-contacts', ('contact' + req.body.creationDate), req.body)
  .then(function (result){
    res.send(200, 'ok, we added your contact');
  })
  .fail(function (err) {
    console.error(err);
  });
});


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

function genRandomId () {
  return Math.floor((Math.random())*1000000);
}
