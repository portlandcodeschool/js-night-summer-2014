var fs = require('fs');

fs.readFile('myFile.txt', {encoding: 'utf8'}, function (err, data) {
    console.log(data);
});

console.log('is my file ready yet?')

// which data will print to the console first?

for (var i = 0; i < 1000; i++) {
  console.log(i);
}