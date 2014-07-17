// EXERCISE 3

var Todo = Backbone.Model.extend({});

var todo1 = new Todo({
  title: 'mow the lawn',
  description: 'fill the gasoline tank, start the engine, cut all the grass, bag grass'
});

console.log(todo1.attributes);

var Router = Backbone.Router.extend({
  routes: {
    '': 'home'
  },
  home: function () {
    console.log(this);
    this.todoInputView = new TodoInputView();
    this.todoListView = new TodoListView();
    // no need to render input view, since it doesn't create dom elements
    this.todoListView.render();
  }

}); 


var TodoInputView = Backbone.View.extend({
  el: '.form-group',
  model: todo1,
  events: {
    'click #add-todo': 'addTodo'
  },
  addTodo: function () {
    var $todoInput = $(this.el).find('#todo-input');
    var $description = $(this.el).find('#description-input'); // ANSWER
    console.log('button was clicked');
    var todoInput = $todoInput.val();
    var descriptionInput = $description.val(); // ANSWER
    this.model.set({title: todoInput, description: descriptionInput}); // ANSWER
    $description.val(''); // ANSWER
    $todoInput.val('');
  }
});

var TodoListView = Backbone.View.extend({
  el: '#todo-list',
  model: todo1,
  initialize: function () {
    this.model.on('change:title', this.render, this); //re-render only on title change of the model
    // this.model.on('change', this.render, this); // re-render on any change of the model
  },
  render: function () {
    $(this.el).html('<li class="list-group-item">' + this.model.get('title') + '</li>' +
      '<li class="list-group-item">' + this.model.get('description') + '</li>'); // ANSWER
  }
});

$(function () {
  window.app = new Router();
  Backbone.history.start();
}); 