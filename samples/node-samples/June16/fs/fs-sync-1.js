var fs = require('fs');

var myFile = fs.readFileSync('myFile.txt', {encoding: 'utf8'});

console.log(myFile);