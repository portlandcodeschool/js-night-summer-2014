
var fs = require('fs');

var filename = "posts.dat"

function writeData (newPost) {
    fs.appendFileSync(filename,newPost+'\n');
}

function readData (){
    var str = fs.readFileSync(filename).toString();
    return str.split('\n');
}

module.exports.writeData = writeData;
module.exports.readData = readData;
