$(function () {
  $('#add-todo').click(function(){
    $newTodo = $('#todo-input');
    console.log($newTodo);
    var newTodo = {};
    newTodo.todo = $newTodo.val();
    console.log(newTodo);

    $newTodo.val('');

    if (newTodo) {
      $.post('/addtodo', newTodo, function (response) {
        console.log(response);
      });
    }  
  });
});