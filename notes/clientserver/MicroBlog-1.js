
var http = require('http');
var url = require('url');

var posts = ["stuff","more stuff", "many tiny posts"];

http.createServer(function (req,res){
    var method = req.method;
    var urlObj = url.parse(req.url,true);
    var urlPath = urlObj.path.slice(1).split('/')[0];
    if (method === "GET" && urlPath==="") {
        res.writeHead(200,{"Content-Type" : "text/html"})
        res.write("<ul>");
        for(var p = 0; p < posts.length; p++){
            res.write("<li>" + posts[p] + "</li>");
        }
        res.write("</ul>");
        res.end();
    }
    else {
        res.end("Not a supported request");
    }
}).listen(3000, function () {
    console.log("Listening on port 3000\n");
});
