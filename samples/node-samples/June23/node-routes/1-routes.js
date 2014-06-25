var http = require('http');
var url = require('url');

var server = http.createServer(function (req, res){

  console.log(req.url);

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Thank you for your request');

});

console.log("listening on localhost, port 3000");
server.listen(3000);