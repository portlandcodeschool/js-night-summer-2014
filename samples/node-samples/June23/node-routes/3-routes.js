// from node.js in action

var http = require('http');
var url = require('url');

var server = http.createServer(function (req, res) {

  var pathRequested = url.parse(req.url, true).pathname;

  if (pathRequested === '/about') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('About us')
  } else if (pathRequested === '/') {
    res.writeHead(200,{'Content-Type': 'text/plain'});
    res.end('Homepage Here');
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Sorry, we don\'t have that document');
  }

});

console.log("listening on localhost, port 3000");
server.listen(3000);