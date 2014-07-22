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
    var collectionFromInput = {
      title: todoInput,
      description: descriptionInput,
      creationDate: Date.now()
    };
    this.collection.create( collectionFromInput, {validate: true});
    $description.val('');
    $todoInput.val('');
  }
});
