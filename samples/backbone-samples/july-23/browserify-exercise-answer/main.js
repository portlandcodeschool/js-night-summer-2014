// first install browserify globally
// npm install -g browserify

// run this in the root of the project before you load anything in the browswer
// browserify main.js -o bundle.js

var $ = require('jquery');

var doubler = require('./double.js');

$(function () {
  var promptAnswer = prompt('what number do you want to double?');

  var doubledPrompt = doubler(promptAnswer);

  alert(promptAnswer + " when doubled equals " + doubledPrompt);
});
