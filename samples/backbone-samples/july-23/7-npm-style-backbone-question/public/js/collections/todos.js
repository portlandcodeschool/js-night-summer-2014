var Backbone = require('backbone');
var Todo = require('../models/todo');

var Todos = Backbone.Collection.extend({
  model: Todo,
  url: '/api/todos',
  comparator: 'creationDate'
});

module.exports = Todos;
