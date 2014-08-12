var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

window.TodoInputView = TodoInputView;

var TodoInputView = Backbone.View.extend({

  el: '.form-group',
  events: {
    'click #add-todo': 'addTodo'
  },
  addTodo: function () {
    var $todoInput = $(this.el).find('#todo-input');
    var $description = $(this.el).find('#description-input');

    var todoInput = $todoInput.val();
    var descriptionInput = $description.val();
    var date = Date.now();
    var collectionFromInput = {
      title: todoInput,
      description: descriptionInput,
      creationDate: date,
      id: 'todo' + date
    };
    this.collection.create( collectionFromInput, {validate: true});
    console.log(this.collection.models);
    $description.val('');
    $todoInput.val('');
  }
});

module.exports = TodoInputView;
