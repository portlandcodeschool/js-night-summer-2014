// EXERCISE 1 ANSWER 
// Make a new route with a corresponding view

var Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'home': 'home',
    'about': 'about' //answer
  },
  home: function () {
    this.homeView = new HomeView();
    this.homeView.render();
  },
  about: function () { //answer
    this.aboutView = new AboutView();
    this.aboutView.render();
  }
}); 

var HomeView = Backbone.View.extend({
  el: 'body',
  render: function () {
    $(this.el).html('<h1>Home page</h1>' + 
                    '<ul><li><a href = "/">Home</a></li></ul>' + 
                    '<ul><li><a href = "/#/about">About</a></li></ul>');
  }
});

var AboutView = Backbone.View.extend({ // answer
  el: 'body',
  render: function () {
    $(this.el).html('<h1>About Page</h1>' +
                    '<ul><li><a href = "/">Home</a></li></ul>' + 
                    '<ul><li><a href = "/#/about">About</a></li></ul>');
  }
});

$(function () {
  window.app = new Router();
  Backbone.history.start();
}); 