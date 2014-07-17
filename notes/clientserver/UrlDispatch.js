
var http = require('http');
var url = require('url');

http.createServer(function (req,res) {
    var urlObj = url.parse(req.url,true);
    var urlPaths = urlObj.path.slice(1).split('/');
    if (urlPaths[0] === "thing") {
        res.end("That was a thing");
    }
    else if(urlPaths[0] === "stuff") {
        res.end("Here's some stuff")
    }
}).listen(3000, function () {
    console.log("Listening on port 3000\n")
});
