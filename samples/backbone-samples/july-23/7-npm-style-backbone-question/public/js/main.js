var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

// CHALLENGE: bring in the missing dependency for this file

var Router = Backbone.Router.extend({
  routes: {
    '': 'todos'
  },
  todos: function () {
    this.todoMainView = new TodoMainView();
    // CHALLENGE: render the main todo view
  }
});

$(function () {
  window.app = new Router();
  Backbone.history.start();
});
