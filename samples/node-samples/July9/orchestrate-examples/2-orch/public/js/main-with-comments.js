$(function () { // shorthand for $(document).ready(function() {})
                // meaning, when the page has loaded, execute the following js
  $('#add-todo').click(function(){ // target the button, when it is clicked, do the function
    $newTodo = $('#todo-input'); //declare a var $newTodo, set it equal to 
                                // the object returned from a jQuery DOM query
                                // for the input field into which we put todo info
    console.log($newTodo);
    var newTodo = {}; //make a new, blank datastructure to send the todo info to the server
    newTodo.todo = $newTodo.val();  // make a property on newTodo to store the value of 
                                    // the input field
    console.log(newTodo);

    $newTodo.val(''); //clear the input field

    if (newTodo) {
      $.post('/addtodo', newTodo, function (response) { // use jquery ajax shorthand method "post"
                                                        // tell it to request the path "/addtodo"
                                                        // pass in the data to send as the second arg
                                                        // pass in a callback (3rd arg) to handle
                                                        // the response the server sends back
                                                        // in this case, we just log it
        console.log(response);
      });
    }  
  });
});