var fs = require('fs');

fs.readFile('myFile.txt', {encoding: 'utf8'}, function (err, data) {
    console.log(data);
});
