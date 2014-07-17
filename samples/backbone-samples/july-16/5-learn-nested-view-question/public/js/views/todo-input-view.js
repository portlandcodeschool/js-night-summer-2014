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

    this.collection.add({title: todoInput, description: descriptionInput});

    $description.val(''); 
    $todoInput.val('');
  }
  
});
