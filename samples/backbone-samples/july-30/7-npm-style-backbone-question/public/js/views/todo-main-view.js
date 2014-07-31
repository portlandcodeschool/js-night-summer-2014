var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var TodoListView = require('./todo-list-view');
var TodoInputView = require('./todo-input-view');

var todoMainTemplate = require('../../templates/todo-main.hbs');

var Todos = require('../collections/todos');

var TodoMainView = Backbone.View.extend({
  el: '#my-app',
  collection: new Todos(),
  initialize: function () {
    window.todoCollection = this.collection;
    this.collection.fetch();
    //CHALLENGE: attach todoMainTemplate to this element, replacing any html
    // already present
    // HINT: see previous examples
  },
  render: function () {
    var todoListView = new TodoListView({collection: this.collection});
    todoListView.render();
    $('#todo-list').html(todoListView.$el);

    var todoInputView = new TodoInputView({collection: this.collection});

  }

});

module.exports = TodoMainView;
