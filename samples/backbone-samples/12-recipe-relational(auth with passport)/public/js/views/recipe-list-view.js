var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var ListItemView = require('./recipe-list-item-view');

var RecipeListView = Backbone.View.extend({
  tagName: 'div',
  className: 'list-group',
  initialize: function () {
    this.childViews = [];
    this.listenTo(this.collection,'all', this.render);
  },
  render: function () {
    console.log('rendering list');
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

  }
});

module.exports = RecipeListView;
