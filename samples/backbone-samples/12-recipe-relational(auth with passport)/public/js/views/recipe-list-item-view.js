var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;


var listItemTemplate = require('../../templates/recipe-list-item.hbs');
var RecipeListItemView = Backbone.View.extend({
  tagName: 'a',
  className: 'list-group-item',
  initialize: function () {
    this.render();
    this.listenTo(this.model,'all', this.render);
    this.model.on('destroy', this.remove, this);
  },
  events: {
    'click #delete': 'deleteRecipe',
  },
  deleteRecipe: function () {
    this.model.destroy();
  },
  render: function () {
    console.log('rendering list item');
    var data = {  title: this.model.escape('title'), 
                  description: this.model.escape('description'),
                  id: this.model.get('id') };

    this.$el.html(listItemTemplate(data));
  }
});

module.exports = RecipeListItemView;