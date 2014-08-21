var Todo = Backbone.Model.extend({});

var todo1 = new Todo({
  title: 'mow the lawn'
});

// ANSWER: Create a new todo instance
var todo2 = new Todo({
  title: 'pull all the weeds'
});

console.log(todo1.attributes);

// ANSWER: Log your new todo to see it's properties
console.log(todo2.attributes);

var HomeView = Backbone.View.extend({
  el: '#my-app',
  render: function () {
    $(this.el).html('<h1><i class="fa fa-check-square-o"></i> Todos</h1>' + 
                    '<ol><li>' + todo1.get('title') + '</li>' +
                    '<li>' + todo2.get('title') + '</li>' +  //ANSWER: add another li 
                    '</ol>');                             // with your new todo's title
  }
});

$(function () {
  var homeView = new HomeView();
  homeView.render();
});
