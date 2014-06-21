var http = require('http');

var urlToFetch = 'http://localhost:3000';

http.get(urlToFetch, function (res) {
  var output = '';

  res.on('data', function (chunk) {
    output += chunk.toString();
  });

  res.on('end', function () {
      console.log(output);
  })

  res.on('error', function (err) {
    console.error(err);
  });

});

