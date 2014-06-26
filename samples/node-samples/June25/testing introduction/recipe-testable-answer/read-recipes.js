var fs = require('fs');

module.exports = function (file, callback) {
  fs.readFile(file, {encoding: 'utf8'}, function (error, data) {
    var outputArray;
    if (error) throw error;
    outputArray = JSON.parse(data);

    callback(null, outputArray);
    return outputArray;
  });
}