
var http = require('http');

http.createServer(function (req,res) {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    var msg = "";
    req.on('data', function (chunk) {
        msg = msg + chunk.toString();
    }).on('end', function () {
        res.end("You said: " + msg);
    });
}).listen(3000, function () {
    console.log("Listening on port 3000\n");
});
