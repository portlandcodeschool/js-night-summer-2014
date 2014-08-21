// now that we have a description property for our todo app, 
// lets create a form with two inputs that accepts both properties.
// be sure you maintain all of the current functionality.
// the inputs have been provied in the html
// the view logic for the title input has already been done for you.

var Todo = Backbone.Model.extend({});

var todo1 = new Todo({
  title: 'mow the lawn',
  description: 'fill the gasoline tank, start the engine, cut all the grass, bag grass'
});

console.log(todo1.attributes);


var TodoInputView = Backbone.View.extend({
  el: '#todo-form',
  model: todo1,
  events: {
    'click #add-todo': 'addTodo'
  },
  addTodo: function (event) {
    // CHALLENGE: you will add several lines of code in this function 
    event.preventDefault();
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
    $(this.el).html('<li>' + this.model.get('title') + '</li>');
  }
});

$(function () {
  var todoInputView = new TodoInputView();
  todoListView = new TodoListView();
  // no need to render input view, since it doesn't create dom elements
  todoListView.render();
});
