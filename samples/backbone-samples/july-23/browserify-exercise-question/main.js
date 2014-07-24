// make sure you have installed browserify globally
// npm install -g browserify

// run this in the root of the project before you load anything in the browswer
// browserify main.js -o bundle.js

// CHALLENGE: Go to package.json, and take a look around.
//            Notice whether or not there are dependencies listed

// CHALLENGE: go to the terminal, and type:  npm install jquery --save
//            then go look at package.json again. What has changed? 

// CHALLENGE: Bring in jQuery as a dependency, using the node-style module importing method
//            make sure this is assigned to the $ variable

// CHALLENGE: Bring in the function from the double.js file and set it equal to the var doubler

$(function () {
  var promptAnswer = prompt('what number do you want to double?');

  var doubledPrompt = doubler(promptAnswer);

  alert(promptAnswer + " when doubled equals " + doubledPrompt);
});

// CHALLENGE: go to the terminal and type:   open index.html   
//            be sure you are typing that in while in the root project directory.
//            Is everything working? 

// CHALLENGE: Go to index.html and complete the challenge there