
var http = require('http');
var url = require('url');
var fs = require('fs');
var hogan = require('hogan.js');
// loading our API key from our config file
var apiKey = require('./config');

// loading our connection to 
var db = require('orchestrate')(apiKey);

var templateFile = fs.readFileSync('posts-1.html').toString();
var template = hogan.compile(templateFile);

var posts = [];

function extractValue(str){
    // this function is for splitting the data returned by a form
    // we need to split it across the = sign
    var index = str.indexOf('=');
    return str.slice(index+1);
}

http.createServer(function (req,res) {
    var method = req.method;
    var urlObj = url.parse(req.url,true);
    var urlPath = urlObj.path.slice(1).split('/')[0];
    
    if(method === "GET" && urlPath===""){
        db.list('posts').then(function (results) {
            var prePosts = results.body.results;
            posts = prePosts.map(function (p) {
                return p.value.text;
            });
            var html = template.render({posts : posts});
            res.writeHead(200,{"Content-Type" : "text/html"});
            res.end(html);
        }).fail(function (err) {
            console.log(err);
            res.end(err);
        });
    }
    else if (method === "POST" && urlPath ==="addpost") {
        var tempPost = "";
        req.on("data", function (chunk) {
            tempPost = tempPost + chunk.toString();
        });
        req.on("end", function () {
            var html ='<a href="/">Go Back</a>';
            var newKey = posts.length;
            db.put('posts',newKey.toString(), 
                   { "text" : extractValue(tempPost)}).then( function (r) {
                       res.writeHead(200,{"Content-Type" : "text/html"});
                       res.end(html);
                   });
        });
    }
}).listen(3000, function () {
    console.log("Listening on port 3000\n")
});
