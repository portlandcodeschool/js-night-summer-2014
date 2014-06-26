var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer(function (req, res) {
  switch (req.method) {
    case 'POST': 
      var item = '';
      req.setEncoding('utf8');
      req.on('data', function (chunk) {
        item += chunk;
      });
      req.on('end', function () {
        items.push(item);
        res.end('OK: Added your todo\n');
      });
      break;
    case 'GET':
      items.forEach(function (item, index) {
        res.write((index + 1) + ')' + item + '\n' );
      });
      res.end();
      break;
  }
});

console.log("listening on port 3000 on localhost");
server.listen(3000);