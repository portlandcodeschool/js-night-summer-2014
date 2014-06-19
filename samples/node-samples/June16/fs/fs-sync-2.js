var fs = require('fs');

console.log('hello')

var myFile = fs.readFileSync('myFile.txt', {encoding: 'utf8'});

console.log('is my file ready yet?');

console.log(myFile);

console.log('goodbye');