// dependencies
var express = require('express'); // our framework
var path = require('path'); // a node core module
var logger = require('morgan'); // our logger module 
var bodyParser = require('body-parser'); //middleware module for express from npm
var consolidate = require('consolidate'); //template engine for multiple engine types from npm
var config = require('./config.js'); //store our secrets here
var db = require('orchestrate')(config.dbKey); // you need to use your own api key
// add a file in this same directory called config.js
// export an object from the file with the property called dbKey
// add your own orchestrate app key 

var app = express(); // start express

// template configuration
app.engine('html', consolidate.hogan); // makes a new template engine, sets file type as .html with hogan (mustache) as the engine
app.set('view engine', 'html'); // tell express which template we want
app.set('views', __dirname + '/templates'); // tell express where to find our templates

// app.set('env', 'production'); 

// express middleware
app.use(logger('dev')); // use logging middleware, set to development mode
app.use(bodyParser.json()); // use json feature of bodyParser middleware. this allows us to understand
                            // http request bodies when they come to our server

app.use(bodyParser.urlencoded()); // same as above, different body format

app.use(express.static(path.join(__dirname, 'public'))); // allows use to serve "static resources"
                                  //this means we can add css, js, and other resources to our html files
                                  //when the browser finds css links, script tags and other resources
                                  // in our html, it will ask the server for them with an http request
                                  // this line of code allows us to respond to these requests with the right resources
                                  // all of these static resources, based on a path.
                                  // here we use path.join to concatenate the current directory (__dirname)
                                  // with the path public. in this case, this translates to './public'
                                  // because './' is our current directory. this is the root of our project.

var dbFunctions = {}; //create a place to put db functions

dbFunctions.addFakeTodo = function () { 
  db.put('my-todos', 'todo1', { // use orchestrate module, here represented by 'db'
                                // to do a put request to the orchestrate api 
                                // remember that this is a remote server with a database
    "todo": "mow the lawn"      //add a db entry. this could be any JSON data structure
  })                            
  .fail(function (err) { //if a failed/rejected promise is passed 
                        //call this function that logs the errors and a message
    console.error(err);
    console.error('could not add the todo. sorry :-(');
  });
}

dbFunctions.addTodo = function (id, description) { //create parameter/local-variables of 
                                                    //id of todo and description of todo
  db.put('my-todos', ('todo' + id), {             //do a put req to orchestrate
                                                  //first param is collection, second is the 
                                                  // orchestrate "key". This just means one db entry, 
                                                  // it is not the same as a JS object key or the api key for entry to 
                                                  // our orchestrate apps

    "todo": description                           // data for our entry
  })
  .fail(function (err) { // handle the error
    console.error(err);
    console.error('could not add the todo. sorry :-(');
  });
}

// dbFunctions.addFakeTodo();  //uncomment this if we want to add dummy data via this method

// express routes

var items = [];    //declare items array, a place to put the stuff I get from the db

app.get('/', function (req, res) { // when the home route is requested, do this function
  items = []; //empty the todos array so I can add the new list
  db.list('my-todos', {limit:100, startKey:'todo0'})  //request a list of db entries from orchestrate
                                                      // from the my-todos collection
  .then(function (result) {        //then, add the results to my array
    console.log(result.body.results);
    result.body.results.forEach(function (item, index) {
      var resultItem = item.value.todo;
      items.unshift(resultItem);
    }); 
  })
  .then(function(result) {
    res.render('todos', {items:items}); // then, add the stuff from items array to my todos tempalate
  })
  .fail(function (err) {
    console.error(err);
  })
});


// json from client: {"todo": "mow the lawn"}
app.post('/addtodo', function (req, res){
  req.accepts('application/json');
  var id = items.length;
  console.log(req.body);
  console.log('just added the todo: ' + req.body.todo);
  dbFunctions.addTodo(id, req.body.todo)
  res.send(200, 'ok, we added your todo');
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
