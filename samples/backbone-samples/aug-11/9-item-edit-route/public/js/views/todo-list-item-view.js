var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;


var listItemTemplate = require('../../templates/todo-list-item.hbs');
var TodoListItemView = Backbone.View.extend({
  tagName: 'a',
  className: 'list-group-item',
  initialize: function () {
    window.myModel = this.model;
    console.log('initializing an item view');
    this.render();
    this.listenTo(this.model,'all', this.render);
    this.model.on('destroy', this.remove, this);
  },
  events: {
    'click #delete': 'deleteTodo',
  },
  deleteTodo: function () {
    this.model.destroy();
  },
  render: function () {
    var data = {  title: this.model.escape('title'), 
                  description: this.model.escape('description'),
                  id: this.model.get('id') };

    this.$el.html(listItemTemplate(data));
  }
});

module.exports = TodoListItemView;