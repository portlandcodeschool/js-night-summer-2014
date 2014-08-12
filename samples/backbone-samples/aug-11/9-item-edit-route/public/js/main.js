var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var TodoMainView = require('./views/todo-main-view');
var TodoEditView = require('./views/todo-edit-view');
var Todos = require('./collections/todos');
var todos = new Todos();
var Todo = require('./models/todo');

var Router = Backbone.Router.extend({
  routes: {
    '': 'todos',
    'edit/:id': 'todoEdit'
  },
  todos: function () {
    this.todoMainView = new TodoMainView({collection:todos});
    this.todoMainView.render();
  },
  todoEditTest: function () {
    this.todoEditView = new TodoEditView();
    this.todoEditView.render();
  },
  todoEdit: function (id) {
    this.todoEditView = new TodoEditView({modelId: id});
    this.todoEditView.render();
  }

});

$(function () {
  window.app = new Router();
  Backbone.history.start();
});
