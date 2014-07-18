
var express = require('express');
var bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.text());

app.post('/', function (req, res) {
    console.log(req);
    res.send(200, req.body);
}).listen(3000, function () {
    console.log("Listening on port 3000\n");
});
