var http = require('http');
var url = require('url');

var items = ["mow the lawn", "do the dishes", "scoop the litter box"];

var server = http.createServer(function (req, res) {

  var pathRequested = url.parse(req.url, true).pathname;

  if (req.method === 'POST') {

    var item = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
      item += chunk;
    });
    req.on('end', function () {
      items.push(item);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('OK: Added your todo\n');
    });

  } else if (req.method === 'GET') {

    var responseBody = items.map(function (item, index) {
      return (index + ')' + item + '\n' );
    }).join('\n');
    res.writeHead(200,{'Content-Type': 'text/plain'});
    res.end(responseBody);

  } else if (req.method === 'DELETE') {

    var requestedId = parseInt(pathRequested.slice(1), 10);

    if (isNaN(requestedId)) {
      res.statusCode = 400; //bad request
      res.end('Invalid item id');
    } else if (!items[requestedId]) {
      res.statusCode = 404; // not found
      res.end('Item not found');
    } else {
      items.splice(requestedId, 1);
      res.end('OK: We deleted todo # ' + requestedId);
    }

  }
  
});

console.log("listening on localhost, port 3000");
server.listen(3000);