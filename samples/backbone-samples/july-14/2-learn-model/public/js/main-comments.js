var Todo = Backbone.Model.extend({}); // create an empty Backbone model class
                                      // for properties of backbone model, see docs

var todo1 = new Todo({ // create an instance of the Todo model
  title: 'mow the lawn'
});

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
                    '<ol><li>' + this.todoTitle + '</li></ol>');
  }
});

$(function () {
  window.app = new Router();
  Backbone.history.start();
}); 