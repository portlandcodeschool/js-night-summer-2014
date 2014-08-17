var fs = require('fs');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('./config.js'); //config file contains all tokens and other private info
var db = require('orchestrate')(config.dbKey);

var handlebars = require('handlebars');
var consolidate = require('consolidate');

var passport = require('passport');
var LocalStrategy = require('passport-local');

var myPassport = require('./my-passport.js');

var app = express();

//===============PASSPORT=================

// Passport session setup.
passport.serializeUser(function(user, done) {
  console.log("serializing " + user.username);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj);
  done(null, obj);
});

// Use the LocalStrategy within Passport to login users.
passport.use('local-signin', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    myPassport.localAuth(username, password)
    .then(function (user) {
      if (user) {
        console.log("LOGGED IN AS: " + user.username);
        req.session.success = 'You are successfully logged in ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT LOG IN");
        req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));

// Use the LocalStrategy within Passport to Register/"signup" users.
passport.use('local-signup', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    myPassport.localReg(username, password)
    .then(function (user) {
      if (user) {
        console.log("REGISTERED: " + user.username);
        req.session.success = 'You are successfully registered and logged in ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT REGISTER");
        req.session.error = 'That username is already in use, please try a different one.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));

// Simple route middleware to ensure user is authenticated.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.session.error = 'Please sign in!';
  res.redirect('/signin');
}


//===============EXPRESS=================

// Configure Express
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());
app.use(session({ secret: 'supernova', 
                  saveUninitialized: true,
                  resave: true }));
app.use(passport.initialize());
app.use(passport.session());

// Session-persisted message middleware
app.use(function(req, res, next){
  var err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});

app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/server-templates');

var partials = "./server-templates/partials/";
fs.readdirSync(partials).forEach(function (file) {
  var source = fs.readFileSync(partials + file, "utf8"),
      partial = /(.+)\.html/.exec(file).pop();

  handlebars.registerPartial(partial, source);
});



//===============ROUTES=================
//displays our homepage
app.get('/', function(req, res){
  res.render('home', {user: req.user});
});

//displays our signup page
app.get('/signin', function(req, res){
  res.render('signin');
});

//sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
app.post('/local-reg', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signin'
  })
);

//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
app.post('/login', passport.authenticate('local-signin', { 
  successRedirect: '/',
  failureRedirect: '/signin'
  })
);

//logs user out of site, deleting them from the session, and returns to homepage
app.get('/logout', function(req, res){
  var name = req.user.username;
  console.log("LOGGIN OUT " + req.user.username)
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
});

//===============API ROUTES============

//db.deleteCollection('recipes');
//db.deleteCollection('users');

app.get('/api/recipes', function (req, res) {

  // use req.user.username to make proper recipe requests that belong to that user
  if (req.user) {
    console.log(req.user.username);
  }


  var recipes = [];
  // db.list('recipes')
  db.newGraphReader()
    .get()
    .from('users', req.user.username)
    .related('likes')
  .then(function (result) {
    console.log(result.body);
    result.body.results.forEach(function (item){
      recipes.push(item.value);
    });
    res.json(recipes);
    console.log(recipes);
  })
  .fail(function (err) {
    console.error(err.body);
  });
});

app.get('/api/recipes/:id', function (req, res) {
  db.get('recipes', req.params.id)
  .then(function (result) {
    var recipe = result.body;
    console.log(recipe);
    res.json(recipe);
  })
  .fail(function (err) {
    console.error(err);
  });
});

app.post('/api/recipes', function (req, res){
  req.accepts('application/json');
  // console.log(req.body);
  var recipe = req.body;
  db.put('recipes', recipe.id, recipe)
    .then(function (result) {
      console.log('result of creating a recipe entry');
      console.log(result.body);
      db.newGraphBuilder(response)
        .create()
        .from('users', req.user.username)
        .related('saves')
        .to('recipes', recipe.id)
    })
    .then(function (){
      //console.log(req.body);
      res.send(200, 'ok, we added your recipe');
    })
    .fail(function (err) {
      console.error(err);
    });
});

app.put('/api/recipes/:id', function (req, res){
  req.accepts('application/json');
  var recipe = req.body;
  console.log(recipe);
  db.put('recipes', recipe.id, recipe)
  .then(function (){
    //console.log(req.body);
    db.newGraphBuilder()
      .create()
      .from('users', req.user.username)
      .related('likes')
      .to('recipes', recipe.id);
  })
  .then(function () {
    res.send(200, 'ok, we added your recipe');
  })
  .fail(function (err) {
    console.error(err);
  });
});

app.delete('/api/recipes/:id', function (req, res) {
  db.remove('recipes', req.params.id)
  .then(function(){
    res.send(200, 'ok, deleted the recipe' + req.params.id);
  })
  .fail(function(){
    console.error(err);
  })
});


//===============PORT=================
var port = process.env.PORT || 5000;
app.listen(port);
console.log("listening on " + port + "!");