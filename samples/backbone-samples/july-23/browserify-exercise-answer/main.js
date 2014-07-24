var $ = require('jquery');

var doubler = require('./double.js');

$(function () {
  var promptAnswer = prompt('what number do you want to double?');

  var doubledPrompt = doubler(promptAnswer);

  alert(promptAnswer + " when doubled equals " + doubledPrompt);
});
