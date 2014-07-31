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
    this.collection.add({title: todoInput, description: descriptionInput});

    $description.val('');
    $todoInput.val('');
  }
});

var TodoListView = Backbone.View.extend({
  el: '#todo-list',
  initialize: function () {
    this.childViews = [];
    this.collection.on('add', this.render, this);
  },
  render: function () {
    var thisView = this;
    this.childViews.forEach(function (view){
      // for clarification, see: http://backbonejs.org/#View-remove
      view.remove();
    });

    this.childViews = [];

    this.collection.each(function (item){
      var todoItemView = new TodoItemView({model: item});
      todoItemView.render();
      thisView.childViews.push(todoItemView.$el);
    });

    this.childViews.forEach(function (item){
      $("#todo-list").append(item);
    });
  }
});

var TodoItemView = Backbone.View.extend({
  initialize: function () {
    this.model.on('change', this.render, this);
  },
  events: {
    'click #delete': 'deleteTodo'
  },
  deleteTodo: function () {
    this.remove();
  },
  render: function () {
    var outputHtml = '';
    outputHtml += '<li class="list-group-item"><strong>' + this.model.escape('title') + '</strong></li>';
    outputHtml += '<li class="list-group-item">&nbsp;&nbsp-' + this.model.escape('description') + '</li>';
    outputHtml += '<button class="btn btn-danger" id="delete">Delete Me</button><br><br>'
    this.$el.html(outputHtml);
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
