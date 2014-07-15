// EXERCISE 2

var Todo = Backbone.Model.extend({});

var todo1 = new Todo({
  title: 'mow the lawn'
});

// CHALLENGE: Create a new todo model instance

console.log(todo1.attributes);

// CHALLENGE: Log your new todo model to see it's properties

var Router = Backbone.Router.extend({
  routes: {
    '': 'home'
  },
  home: function () {
    this.homeView = new HomeView();
    this.homeView.render();
  }

}); 

var HomeView = Backbone.View.extend({
  el: 'body',
  todoTitle: todo1.get('title'),
  render: function () {
    $(this.el).html('<h1>Todos</h1>' + 
                    '<ol><li>' + this.todoTitle + '</li></ol>'); //CHALLENGE: add another li 
                                                                // with your new todo's title
  }
});

$(function () {
  window.app = new Router();
  Backbone.history.start();
}); 