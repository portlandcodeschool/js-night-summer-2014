var Backbone = require('backbone');

var Todo = Backbone.Model.extend({
  urlRoot: '/api/todos',
  validate: function (attrs) {
    if (attrs.title.length < 1) {
      alert("no title provided");
      return "no title provided";
    }
    if (attrs.description.length < 1) {
      alert("no title provided");
      return "no description provided";
    }
  }
});

module.exports = Todo;
