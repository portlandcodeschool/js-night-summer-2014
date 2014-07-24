
var express = require('express');
var bodyparser = require('body-parser');
var consolidate = require('consolidate');
var apiKey = require('./config');
var db = require('orchestrate')(apiKey);

var posts = [];

var app = express();
app.use(bodyparser.urlencoded());

app.engine('html', consolidate.hogan);
app.set('view engine', 'html');

app.set('views', __dirname);

app.get('/', function (req, res) {
    db.list('posts').then(function (results) {
        var prePosts = results.body.results;
        posts = prePosts.map(function (p) {
            return p.value.text;
        });     
        res.render('posts-1',{posts : posts});
    });
}).post('/addpost', function (req, res) {
    var newPost = req.body.post;
    var newKey = posts.length;
    var html = '<a href="/">Go Back</a>';
    var newKey = posts.length;
    db.put('posts', 
           newKey.toString(), 
           { "text" : newPost }).then( function (r) {
               res.writeHead(200,{"Content-Type" : "text/html"});
               res.end(html);
           });
}).listen(3000, function () {
    console.log("Listening on port 3000\n");
});
