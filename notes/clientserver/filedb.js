
var fs = require('fs');

var filename = "posts.dat"

function writeData (newPost) {
    fs.appendFileSync(filename,newPost+'\n');
}

function readData (){
    var str = fs.readFileSync(filename).toString();
    var temp = str.split('\n');
    temp.pop();
    return temp;
}

module.exports.writeData = writeData;
module.exports.readData = readData;
