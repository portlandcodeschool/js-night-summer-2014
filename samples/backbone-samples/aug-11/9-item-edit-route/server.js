var fs = require('fs');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config.js');
var consolidate = require('consolidate');
var Handlebars = require('handlebars');

var db = require('orchestrate')(config.dbKey);

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/server-templates');

var partials = "./server-templates/partials/";
fs.readdirSync(partials).forEach(function (file) {
  var source = fs.readFileSync(partials + file, "utf8"),
      partial = /(.+)\.html/.exec(file).pop();

  Handlebars.registerPartial(partial, source);
});

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

app.get('/api/todos/:id', function (req, res) {
  db.get('bb-todos', req.params.id)
  .then(function (result) {
    var todo = result.body;
    console.log(todo);
    res.json(todo);
  })
  .fail(function (err) {
    console.error(err);
  });
});


app.post('/api/todos', function (req, res){
  req.accepts('application/json');
  console.log(req.body);
  var todo = req.body;
  db.put('bb-todos', todo.id, todo)
  .then(function (){
    console.log(req.body);
    res.send(200, 'ok, we added your todo, here is what you added');
  })
  .fail(function (err) {
    console.error(err);
  });
});

app.put('/api/todos/:id', function (req, res){
  req.accepts('application/json');
  var todo = req.body;
  console.log(todo);
  db.put('bb-todos', todo.id, todo)
  .then(function (){
    console.log(req.body);
    res.send(200, 'ok, we added your todo, here is what you added');
  })
  .fail(function (err) {
    console.error(err);
  });
});

app.delete('/api/todos/:id', function (req, res) {
  db.remove('bb-todos', req.params.id)
  .then(function(){
    res.send(200, 'ok, deleted the todo' + req.params.id);
  })
  .fail(function(){
    console.error(err);
  })
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

app.set('port', process.env.PORT || 4444);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port # ' + app.get('port'));
});
