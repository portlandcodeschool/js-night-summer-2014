// Backbone.js EXERCISE 4

var Todo = Backbone.Model.extend({});

var Todos = Backbone.Collection.extend({
  model: Todo,
  comparator: 'cid'
});

var todos = new Todos();

todos.add([
  { title: 'mow the lawn',
    description: 'fill the gasoline tank, start the engine, cut all the grass, bag grass'},
  { title: 'paint the house',
    description: 'paint all the things'},
  { title: 'fix the leaky bathtub faucet',
    description: 'get the seat wrench, turn off water main, unscrew things, get new parts'}
]);

console.log('get one item by it\'s cid :');
console.log(todos.get({cid:'c1'}));

todos.models.forEach(function (item, index){
  console.log('item\'s cid :' + item.cid);
  console.log(item);
  console.log(item.toJSON());
});

var TodoInputView = Backbone.View.extend({
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
    this.collection.add();  // assume that your model looks like this:
                            // { title: 'mow the lawn', description: 'description here'}
                            // CHALLENGE: add the appropriate data to the collection
                            // based on the inputs and the view logic already present
                            // HINT: you may need some of the variables close by
                            // http://backbonejs.org/#Collection-add

    $description.val('');
    $todoInput.val('');
  }
});

var TodoListView = Backbone.View.extend({
  el: '#todo-list',
  initialize: function () {
    this.collection.on('add', this.render, this);
  },
  render: function () {
    var outputHtml = '';

    this.collection.models.forEach(function (item) {
      // assume that your model looks like this:
      // { title: 'mow the lawn', description: 'description here'}
      // CHALLENGE:
      //   - combine the values for both model properties into their own html list items
      //   - concatenate your html strings and js values onto the string already present
      //     in the outputHtml variable in the render function
      // For extra fanciness, used bootstrap list-group-items
      // http://getbootstrap.com/components/#list-group

      // HINT #1: What does item represent?
      // HINT #2: If item represents _____, how do we get properties out of that thing?
      // see previous examples
      // HINT #3: http://backbonejs.org/#Model-get
    });

    $(this.el).html(outputHtml);
  }
});

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

$(function () {
  window.app = new Router();
  Backbone.history.start();
});
