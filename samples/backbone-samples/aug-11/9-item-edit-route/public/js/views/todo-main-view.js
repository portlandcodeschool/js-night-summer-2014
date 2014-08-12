var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var TodoListView = require('./todo-list-view');
var TodoInputView = require('./todo-input-view');

var todoMainTemplate = require('../../templates/todo-main.hbs');

var Todos = require('../collections/todos');

var TodoMainView = Backbone.View.extend({
  el: '#my-app',
  initialize: function () {
    window.todoCollection = this.collection;
    this.collection.fetch();
    $(this.el).html(todoMainTemplate);
  },
  render: function () {
    var todoListView = new TodoListView({collection: this.collection});
    todoListView.render();
    $('#todo-list').html(todoListView.$el);

    var todoInputView = new TodoInputView({collection: this.collection});

  }

});

module.exports = TodoMainView;
