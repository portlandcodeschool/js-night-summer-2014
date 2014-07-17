// Backbone.js EXERCISE 4
// - Create a contacts Collection class and instance
// - add some entries to your collection instance

var Todo = Backbone.Model.extend({});

var Todos = Backbone.Collection.extend({
  model: Todo,
  comparator: 'cid' // or perhaps sort by 'title'
});

var todos = new Todos();

// we can add multiple items to our collection, our collection will instantiate
// them with the appropriate model class, since we told the Collection class which model it uses
todos.add([
  { title: 'mow the lawn',
    description: 'fill the gasoline tank, start the engine, cut all the grass, bag grass'},
  { title: 'paint the house',
    description: 'paint all the things'},
  { title: 'fix the leaky bathtub faucet',
    description: 'get the seat wrench, turn off water main, unscrew things, get new parts'}
]);

// TEST OUR COLLECTIONS BY LOGGING COLLECTION ITEMS TO THE CONSOLE

console.log('get one item by it\'s cid :');
console.log(todos.get({cid:'c1'}));
// or console.log(todos.get('cid', 'c1'));
// we can git the get "getter function" a pair of string parameters instead of passing an object
// in other words, ('key', 'value') instead of ({key: 'value'})

// loop over all the items in the collection, log them and some info about them
todos.models.forEach(function (item, index){
  console.log('item\'s cid :' + item.cid);
  console.log(item);
  console.log(item.toJSON());
});

//VIEW CLASS
var TodoInputView = Backbone.View.extend({
  //no more need for model property, collection handles that now
  el: '.form-group',
  events: {
    'click #add-todo': 'addTodo'
  },
  addTodo: function () {
    var $todoInput = $(this.el).find('#todo-input');
    var $description = $(this.el).find('#description-input');
    console.log('button was clicked');
    var todoInput = $todoInput.val();
    var descriptionInput = $description.val();
    // add a new item to the collection
    this.collection.add({title: todoInput, description: descriptionInput}); // ANSWER

    $description.val('');
    $todoInput.val('');
  }
});

//ANOTHER VIEW CLASS ON THE SAME PAGE
var TodoListView = Backbone.View.extend({
  el: '#todo-list',
  initialize: function () {
    this.collection.on('add', this.render, this); // re-render on any change of the model
  },
  render: function () {
    // completely new render function
    var outputHtml = '';

    this.collection.models.forEach(function (item) { // ANSWER
      outputHtml += '<li class="list-group-item"><strong>' + item.get('title') + '</strong></li>';
      outputHtml += '<li class="list-group-item">&nbsp;&nbsp-' + item.get('description') + '</li>';
    });

    $(this.el).html(outputHtml);
  }
});

// ROUTER CLASS
var Router = Backbone.Router.extend({
  routes: {
    '': 'todos'
  },
  todos: function () {
    this.todoInputView = new TodoInputView({collection: todos});
    this.todoListView = new TodoListView({collection: todos});
    this.todoListView.render();
  }
});

// START THE APP
$(function () {
  window.app = new Router();
  Backbone.history.start();
});
