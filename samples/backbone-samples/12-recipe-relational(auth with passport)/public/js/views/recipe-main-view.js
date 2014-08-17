var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var RecipeListView = require('./recipe-list-view');
var RecipeInputView = require('./recipe-input-view');

var recipeMainTemplate = require('../../templates/recipe-main.hbs');

var RecipeMainView = Backbone.View.extend({
  el: '#my-app',
  initialize: function () {
    this.collection.fetch();
    $(this.el).html(recipeMainTemplate);

  },
  render: function () {
    var recipeListView = new RecipeListView({collection: this.collection});
    recipeListView.render();
    $('#recipe-list').html(recipeListView.$el);

    var recipeInputView = new RecipeInputView({collection: this.collection});
  }
});

module.exports = RecipeMainView;
