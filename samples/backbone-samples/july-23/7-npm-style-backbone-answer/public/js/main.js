var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

// CHALLENGE: bring in the missing dependency for this file
var TodoMainView = require('./views/todo-main-view'); //answer

var Router = Backbone.Router.extend({
  routes: {
    '': 'todos'
  },
  todos: function () {
    this.todoMainView = new TodoMainView();
    // CHALLENGE: render the main todo view
    this.todoMainView.render(); //answer
  }
});

$(function () {
  window.app = new Router();
  Backbone.history.start();
});
