var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var TodoMainView = require('./views/todo-main-view');

var Router = Backbone.Router.extend({
  routes: {
    '': 'todos'
  },
  todos: function () {
    this.todoMainView = new TodoMainView();
    this.todoMainView.render();
  }
});

$(function () {
  window.app = new Router();
  Backbone.history.start();
});
