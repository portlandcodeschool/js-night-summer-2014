var express = require('express');
var logger = require('morgan');

var app = express();

app.use(logger());

app.get('/', function (req, res) {
  res.send('<h1>hello world</h1>');
});

app.listen(3000, function () {
  console.log('server started on localhost: port 3000');
});
