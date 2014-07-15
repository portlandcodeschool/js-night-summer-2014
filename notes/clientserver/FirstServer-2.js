
var http = require('http');

http.createServer(function (req,res) {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    var msg = "";
    req.on('data', function (chunk) {
        msg = msg + chunk.toString();
    });
    req.on('end', function () {
        res.write("You said: " + msg);
        res.end();
    });
}).listen(3000);

console.log("Listening on port 3000\n");
