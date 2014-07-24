var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;


//CHALLENGE: "bring in" the appropriate template for this view

var TodoListView = Backbone.View.extend({
  tagName: 'div',
  className: 'list-group',
  initialize: function () {
    this.listenTo(this.collection,'all', this.render);
  },
  render: function () {

    var data = [];

    this.collection.models.forEach(function (item) {
      data.push({title: item.escape('title'), description: item.escape('description') });
    });

    this.$el.html(myTemplate({todoData:data}));
  }
});

module.exports = TodoListView;
