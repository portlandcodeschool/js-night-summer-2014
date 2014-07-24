var Todo = Backbone.Model.extend({});

var Todos = Backbone.Collection.extend({
  model: Todo,
  comparator: 'cid'
});

var todos = new Todos();

todos.add([
  { title: 'mow the lawn',
    description: 'fill the gasoline tank, start the engine, cut all the grass, bag grass'},
  { title: 'paint the house',
    description: 'paint all the things'},
  { title: 'fix the leaky bathtub faucet',
    description: 'get the seat wrench, turn off water main, unscrew things, get new parts'}
]);

// todos.models.forEach(function (item, index){
//   console.log('item\'s cid :' + item.cid);
//   console.log(item);
//   console.log(item.toJSON());
// });

var Contact = Backbone.Model.extend({});

var Contacts = Backbone.Collection.extend({
  model: Contact,
  comparator: 'age'
});

var contacts = new Contacts();

contacts.add([
  { firstName: 'Ben',
    lastName: 'Verble',
    age: 31 },
  { firstName: 'Jon',
    lastName: 'Bon Jovi',
    age: 52 },
  { firstName: 'Ella',
    lastName: 'Marija Lani Yelich-O\'Connor (aka Lorde)',
    age: 18 }
]);

// contacts.models.forEach(function (item, index){
//   console.log('item\'s cid :' + item.cid);
//   console.log(item);
//   console.log(item.toJSON());
// });

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
    this.contactsMainView = new ContactsMainView({collection: contacts});
    this.contactsMainView.render();
  }

});

$(function () { // when the doc loads, do this stuff
  window.app = new Router();
  Backbone.history.start();
});
