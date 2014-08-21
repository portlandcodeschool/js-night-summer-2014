var Todo = Backbone.Model.extend({});

var todo1 = new Todo({
  title: 'mow the lawn'
});

// CHALLENGE: Create a new todo instance

console.log(todo1.attributes);

// CHALLENGE: Log your new todo to see it's properties

var HomeView = Backbone.View.extend({
  el: '#my-app',
  render: function () {
    $(this.el).html('<h1><i class="fa fa-check-square-o"></i> Todos</h1>' + 
                    '<ol><li>' + todo1.get('title') + '</li>' + //QUESTION: add another li 
                    '</ol>');                             // with your new todo's title
  }
});

$(function () {
  var homeView = new HomeView();
  homeView.render();
});
