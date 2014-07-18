
var http = require('http');
var url = require('url');
var fs = require('fs');
var hogan = require('hogan.js');
var db = require('./filedb');
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
        posts = db.readData();
        var html = template.render({posts : posts});
        res.writeHead(200,{"Content-Type" : "text/html"});
        res.end(html);
    }
    else if (method === "POST" && urlPath ==="addpost") {
        var tempPost = "";
        req.on("data", function (chunk) {
            tempPost = tempPost + chunk.toString();
        });
        req.on("end", function () {
            var html ='<a href="/">Go Back</a>'
            db.writeData(extractValue(tempPost));
            res.writeHead(200,{"Content-Type" : "text/html"});
            res.end(html);
        });
    }
}).listen(3000, function () {
    console.log("Listening on port 3000\n")
});
