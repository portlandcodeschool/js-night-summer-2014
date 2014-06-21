var fs = require('fs');

function funAsync (file, callback) {
  fs.readFile(file, {encoding: 'utf8'}, function(err, data){
    if (err) throw err; 
    callback(data.split('\n').length-1);
  });
}

funAsync('./hipster.txt', console.log);