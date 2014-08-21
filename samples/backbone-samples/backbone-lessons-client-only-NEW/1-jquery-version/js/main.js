$(function () {
  var todo = {
    title: 'mow the lawn'
  };

  $('#my-app').html('<h1><i class="fa fa-check-square-o"></i> Todos</h1>' + 
                      '<ol><li>' + todo.title + '</li></ol>');
                               
});