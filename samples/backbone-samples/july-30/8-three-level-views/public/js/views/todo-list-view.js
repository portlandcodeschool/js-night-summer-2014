var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var ListItemView = require('./list-item-view');
var myTemplate = require('../../templates/todo-list.hbs'); 

var TodoListView = Backbone.View.extend({
  tagName: 'div',
  className: 'list-group',
  initialize: function () {
    this.childViews = [];
    this.listenTo(this.collection,'all', this.render);
  },
  render: function () {

    var self = this;
    this.childViews.forEach(function (view){
      view.remove();
    });
    this.childViews = [];


    this.collection.each(function (item){
      var listItemView = new ListItemView({model: item});
      listItemView.render();
      self.childViews.push(listItemView.$el);
    });

    this.childViews.forEach(function (item){
      self.$el.append(item);
    });


    // var data = [];

    // this.collection.models.forEach(function (item) {
    //   data.push({title: item.escape('title'), description: item.escape('description') });
    // });

    // this.$el.html(myTemplate({todoData:data}));
  }
});

module.exports = TodoListView;
