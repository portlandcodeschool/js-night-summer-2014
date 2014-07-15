// EXERCISE 1
// Make a new route with a corresponding view

var Router = Backbone.Router.extend({
  routes: {
    '': 'home',     // '/' route calls the home method in this object
    'home': 'home'  // '/#/home' calls the home method also: explanation below
                    // annotated source notes:
                    // "Routers map faux-URLs to actions, and fire events 
                    // when routes are matched."

    // CHALLENGE: define a route and a route handler function here
  },
  home: function () {
    this.homeView = new HomeView(); // make an instance of this view class
                                    // this is placed on this so we can view it from window.app
    this.homeView.render();         // call the render method of this view instance
                                  
  }
  // CHALLENGE: add a new route handler function here
}); 

var HomeView = Backbone.View.extend({
  el: 'body', //tell this View class which element it attaches to 
  render: function () { //a function that adds some html to this el
    $(this.el).html('<h1>Home page</h1>' + 
                    '<ul><li><a href = "/">Home</a></li></ul>' + 
                    '<ul><li><a href = "/#/about">About</a></li></ul>');
  }
});

// add a new view class here

$(function () {  // when the document has loaded, execute the following
  window.app = new Router(); // add our router to a global so we can inspect it in the browser
  Backbone.history.start(); // start history so we can use the back and forward browser buttons
}); 


// END OF APP ////////////////////////////


// explanation of Backbone.someClass.extend (where someClass is Router, View, Model, etc.)

//http://underscorejs.org/#extend
// _.extend(destination, *sources) 
// Copy all of the properties in the source objects over to the destination object, 
// and return the destination object. It's in-order, so the last source will override 
// properties of the same name in previous arguments.

var myInfo = {  name: 'Ben', age: 31};
var aboutMe = { tellAboutMe: function () {
                  return "My name is " + name + " and I am " + age + " years old";
                }
              };
_.extend(myInfo, aboutMe); // adds properties of aboutMe to myInfo

console.log(myInfo);
