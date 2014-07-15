// EXERCISE 2

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
  todoTitle1: todo1.get('title'),
  todoTitle2: todo2.get('title'),
  render: function () {
    $(this.el).html('<h1>Todos</h1>' + 
                    '<ol><li>' + this.todoTitle1 + '</li>' +
                    '<li>' + this.todoTitle2 + '</li>' +  //ANSWER: add another li 
                    '</ol>');                             // with your new todo's title
  }
});

$(function () {
  window.app = new Router();
  Backbone.history.start();
}); 