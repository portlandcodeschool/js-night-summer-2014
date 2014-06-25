// from node.js in action

var http = require('http');
var url = require('url');

var contentData = "Our challenge is to assertively network economically" +
                  "sound methods of empowerment so that we may continually" +
                  "negotiate performance-based infrastructures." +
                  "(Dilbert’s Automatic Mission Statement Generator)";

var server = http.createServer(function (req, res) {

  var pathRequested = url.parse(req.url, true).pathname;

  if (pathRequested === '/about') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<html><head><title>About</title></head' +
            '<body><h1>About Us:</h1>' +
            '<p>' + contentData + '</body></html>');
  } else if (pathRequested === '/contact') {
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.end('<html><head><title>Homepage</title></head' +
            '<body><form>Name Here:<input type="text"></input></body></html>');
  } else if (pathRequested === '/') {
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.end('<html><head><title>Homepage</title></head' +
            '<body><h1>Amazing Homepage! Such Web! Very wow!</h1></body></html>');
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Sorry, we don\'t have that document');
  }

});

console.log("listening on localhost, port 3000");
server.listen(3000);