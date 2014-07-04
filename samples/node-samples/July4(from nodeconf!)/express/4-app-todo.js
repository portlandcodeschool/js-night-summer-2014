var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

var headerPartial =  '<body><head><title>Todos</title></head><h1>My Todos</h1><ol>';
var footerPartial =  '</ol></body><footer>Portland Code School Rules, yo!</footer></html>';


app.use(logger());

var items = ["mow the lawn", "do the dishes", "paint the fence", "wax on, wax off"];


app.get('/', function (req, res) {
  var responseBody = '';
  responseBody += headerPartial;
  responseBody += items.map(function (item, index) {
    return '<li>' + item + '</li>';
  }).join('');
  responseBody += footerPartial;
  res.send(200, responseBody);
});

app.listen(3000, function () {
  console.log('server started on localhost: port 3000');
});
