var http = require('http');
var request = require('request');

request('http://localhost:3000', function (err, res, body) {
    if (!err && res.statusCode == 200) console.log(body);
});