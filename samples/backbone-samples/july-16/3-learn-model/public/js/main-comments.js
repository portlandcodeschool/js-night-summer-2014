// EXERCISE 3

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
    this.todoInputView = new TodoInputView(); // create 2 new view instances
    this.todoListView = new TodoListView();
    this.todoInputView.render(); // render each of our 2 view instances on the page
    this.todoListView.render();
  }

}); 


var TodoInputView = Backbone.View.extend({
  el: '.form-group',
  model: todo1,
  events: {
    'click #add-todo': 'addTodo' // something like this is going on "under the hood": $('#add-todo').click(addTodo);
  },
  addTodo: function () {
    var $todoInput = $(this.el).find('#todo-input'); // store results of a jquery query and traversal (e.g. "find") in a var 
    console.log('button was clicked');
    var todoInput = $todoInput.val(); // get the value of this jquery object, store in a var
    this.model.set({title: todoInput}); // set the title property of the model
    $todoInput.val(''); // set the value of this jquery object to be a blank string, thus clearing the input field
  }
});

var TodoListView = Backbone.View.extend({
  el: '#todo-list',
  model: todo1,
  initialize: function () {
    this.model.on('change:title', this.render, this); // set up an event listener so that 
                                                      // when the title property changes
                                                      // the render method of this view will 
                                                      // be called in this context
  },
  render: function () {
    // insert some html into the DOM, with our model property of title added in
    $(this.el).html('<li class="list-group-item">' + this.model.get('title') + '</li>');
  }
});

$(function () {
  window.app = new Router();
  Backbone.history.start();
}); 
