// EXERCISE 3
// now that we have a description property for our todo app, 
// lets create a form with two inputs that accepts both properties.
// be sure you maintain all of the current functionality.
// the inputs have been provied in the html
// the view logic for the title input has already been done for you.

var Todo = Backbone.Model.extend({});

var todo1 = new Todo({
  title: 'mow the lawn',
  description: ''
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
    // CHALLENGE: you will add several lines of code in this function 
    var $todoInput = $(this.el).find('#todo-input');
    console.log('button was clicked');
    var todoInput = $todoInput.val();
    this.model.set({title: todoInput});
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
    // CHALLENGE: the following line will need to be updated too
    $(this.el).html('<li class="list-group-item">' + this.model.get('title') + '</li>');
  }
});

$(function () {
  window.app = new Router();
  Backbone.history.start();
}); 
