var todoMainTemplate = '<h2>Add a Todo</h2>' +
  '<div class="form-group">' +
    '<label for="todo-input">Todo Title</label>' +
    '<input id="todo-input" class="form-control" type="text">' +
    '<br>' +
    '<label for="description-input">Todo Description</label>' +
    '<input id="description-input" class="form-control" type="text">' +
    '<br>' +
    '<button id="add-todo" class="btn btn-success">Add todo</button>' +
    '<br>' +
  '</div>' +
  '<br><br>' +
  '<h3>My Todos</h3>' +
  '<div id="todo-list">' +
  '</div>';

var TodoMainView = Backbone.View.extend({
  el: '#my-app',
  // collection: todos,
  initialize: function () {
    $(this.el).html(todoMainTemplate);
    //this.collection.on('add', this.render, this);
    this.listenTo(this.collection, 'change', this.render);
    //this.collection.on('change', this.render, this);
  },
  render: function () {
    var todoListView = new TodoListView({collection: this.collection});
    todoListView.render();
    // attach the contents of todoListView to the #todo-list id in the todoMainView
    $('#todo-list').html(todoListView.$el);

    var todoInputView = new TodoInputView({collection: todos});

  }
});
