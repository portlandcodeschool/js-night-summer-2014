// CHALLENGE: make sure you have installed browserify globally
// npm install -g browserify
// many of you will instead need:   sudo npm install -g browserify

// CHALLENGE: Go to package.json, and take a look around.
//            Notice whether or not there are dependencies listed

// CHALLENGE: go to the terminal, and type:  npm install jquery --save
//            then go look at package.json again. What has changed? 

// CHALLENGE: Bring in jQuery as a dependency, using the node-style module importing method
//            make sure this is assigned to the $ variable

// CHALLENGE: Bring in the function from the double.js file and 
//            assign it to a variable called "doubler"

$(function () {
  var promptAnswer = prompt('what number do you want to double?');

  var doubledPrompt = doubler(promptAnswer);

  alert(promptAnswer + " when doubled equals " + doubledPrompt);
});


// CHALLENGE: Go to index.html and complete the challenge there

// CHALLENGE: go to the terminal and type the following: browserify main.js -o bundle.js
//            Be sure to do this while within the root project directory

// CHALLENGE: go to the terminal and type:   open index.html   
//            Be sure you type this command while in the root project directory.
//            Is everything working? 

