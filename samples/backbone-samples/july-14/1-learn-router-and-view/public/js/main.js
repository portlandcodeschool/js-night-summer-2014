// EXERCISE 1 CHALLENGE 
// Make a new route with a corresponding view

var Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'home': 'home'
  // CHALLENGE: define a route and a route handler function here
  },
  home: function () {
    this.homeView = new HomeView();
    this.homeView.render();
  }
  // CHALLENGE: add a new route handler function here

}); 

var HomeView = Backbone.View.extend({
  el: 'body',
  render: function () {
    $(this.el).html('<h1>Home page</h1>' + 
                    '<ul><li><a href = "/">Home</a></li></ul>' + 
                    '<ul><li><a href = "/#/about">About</a></li></ul>');
  }
});

// add a new view class here

$(function () {
  window.app = new Router();
  Backbone.history.start();
}); 