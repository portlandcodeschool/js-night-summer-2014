var Todo = Backbone.Model.extend({
  validate: function (attrs) {
    if (attrs.title.length < 1) {
      alert("no title provided");
      return "no title provided";
    }
    if (attrs.description.length < 1) {
      alert("no title provided");
      return "no description provided";  // need to return something for validation to stop bad inputs
                                        // don't return anything when things are good
    }
  }
});

var Todos = Backbone.Collection.extend({
  model: Todo,
  url: '/api/todos',
  comparator: 'creationDate'
});

var todos = new Todos();

var Contact = Backbone.Model.extend({
  validate: function (attrs) {
    if (attrs.firstName.length < 1) {
      alert("no first name provided");
      return "no first name provided";
    }
    if (attrs.lastName.length < 1) {
      alert("no last name provided");
      return "no last name provided";
    }
    if (attrs.age.length < 1) {
      alert("no age provided");
      return "no age provided";
    }
  }
});

var Contacts = Backbone.Collection.extend({
  model: Contact,
  url: '/api/contacts',
  comparator: 'age'
});

var contacts = new Contacts();

var Router = Backbone.Router.extend({
  routes: {
    '': 'todos',
    'contacts': 'contacts'
  },
  todos: function () {
    this.todoMainView = new TodoMainView({collection: todos});
    this.todoMainView.render();
  },
  contacts: function () {
    this.contacstMainView = new ContactsMainView({collection: contacts});
    this.contacstMainView.render();
  }

});

$(function () {
  window.app = new Router();
  Backbone.history.start();
});
