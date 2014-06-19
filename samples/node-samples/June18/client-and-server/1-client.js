var http = require('http');

http.get( 'http://localhost:3000', function (res) {

  res.on('data', function (chunk) {
    console.log(chunk.toString());
  });

  res.on('error', function (err) {
    console.error(err);
  });

});


// remember how with forEach the parameters of
// the callback function are predetermined, 
// but we can call them anything we want.
// This is the "api" design
// How do I learn this? Documentation. 

// var myArray = [1,2,3,4];

// myArray.forEach(function (item, index, array) {
//   item += 1;
// });