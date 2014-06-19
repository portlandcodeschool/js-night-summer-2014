var http = require('http');

var server = http.createServer(function (req, res) {
  console.log(req.method + ' ' + req.url);

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('hey there client, how are you doing?');
  res.end();
});

console.log('listening on port # 3000, have a nice day');
server.listen(3000);