
var http = require('http');
var url = require('url');

var items = ["mow the lawn", "do the dishes", "scoop the litter box"];
var contacts = [{name: "Ben", age: 31}, {name: "Steve", age: 29}];

var server = http.createServer(function (req, res) {

  var pathRequested = url.parse(req.url, true).pathname;
  var queryParam = url.parse(req.url, true).query;
  var queryParamId = parseInt(queryParam.id, 10);

  console.log(url.parse(req.url, true));

  if (pathRequested.slice(0,6) === '/todos') {

    if (req.method === 'POST') {

      var item = '';
      req.setEncoding('utf8');
      req.on('data', function (chunk) {
        item += chunk;
      });
      req.on('end', function () {
        items.push(item);
        res.writeHead({'Content-Type': 'text/plain'});
        res.end('OK: Added your todo\n');
      });

    } else if (req.method === 'GET') {

      var responseBody = items.map(function (item, index) {
        return (index + ')' + item + '\n' );
      }).join('\n');
      res.writeHead({'Content-Type': 'text/plain'});
      res.end(responseBody);

    } else if (req.method === 'DELETE') {

      if (isNaN(queryParamId)) {
        res.statusCode = 400; //bad request
        res.end('Invalid todo id');
      } else if (!items[queryParamId]) {
        res.statusCode = 404; // not found
        res.end('Todo not found');
      } else {
        items.splice(queryParamId, 1);
        res.statusCode = 200;
        res.end('OK: We deleted todo # ' + queryParamId);
      }
    } //end DELETE
  }

  if (pathRequested.slice(0,9) === '/contacts') {

    if (req.method === 'POST') {
      var person = '';
      req.setEncoding('utf8');
      req.on('data', function (chunk) {
        person += chunk;
      });
      req.on('end', function () {
        contacts.push(JSON.parse(person));
        res.writeHead({'Content-Type': 'text/plain'});
        res.end('OK: Added a new contact\n');
      });
    } else if (req.method === 'GET') {
      res.writeHead({'Content-Type': 'application/json'});
      res.end(JSON.stringify(contacts));
    } else if (req.method === 'DELETE') {
      if (isNaN(queryParamId)) {
        res.statusCode = 400;
        res.end('Invalid Contact ID');
      } else if (!items[queryParamId]){
        res.statusCode = 404;
        res.end('Contact not found');
      } else {
        contacts.splice(queryParamId, 1);
        res.statusCode = 200;
        res.end('OK: We deleted contact # ' + queryParamId);
      }
    }
  }



});

console.log("listening on localhost, port 3000");
server.listen(3000);