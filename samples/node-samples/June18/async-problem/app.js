// wrong way

var fs = require('fs');

var output;

fs.readFile('some-json.json', {encoding: 'utf8'}, function (err, data) {
  if (err) throw err;

  output = data;

});

console.log(data)

// right way
// var fs = require('fs');

// var output;

// fs.readFile('some-json.json', {encoding: 'utf8'}, function (err, data) {
//   if (err) throw err;

//   output = data;
//   console.log(data)
// });




// generalize the function to take any function 
// var fs = require('fs');


// function myFunction (callback) {
//   fs.readFile('some-json.json', {encoding: 'utf8'}, function (err, data) {

//     if (err) throw err;
//     callback(data);  
//   });
// }

// myFunction(console.log);

// JSON.parse() and JSON.stringify()

// var fs = require('fs');

// var output;

// fs.readFile('some-json.json', {encoding: 'utf8'}, function (err, data) {
//   if (err) throw err;

//   output = data;

//   var liveObject = JSON.parse(data);
  
//   console.log(JSON.stringify(liveObject));

// });
