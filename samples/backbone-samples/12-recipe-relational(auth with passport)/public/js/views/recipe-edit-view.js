var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var recipeEditTemplate = require('../../templates/recipe-edit.hbs');
var Recipe = require('../models/recipe');

var RecipeEditView = Backbone.View.extend({
  el: '#my-app',
  events: {
    'click #save-recipe': 'saveRecipe'
  },
  saveRecipe: function () {
    var titleVal = $('#title-input').val();
    var descriptionVal = $('#description-input').val();
    this.model.save({title: titleVal, description: descriptionVal});
    // this only works becuse we set a urlRoot on our model:  '/api/recipes'
    // the urlRoot gets combined with the id to create something like:
    // /api/recipes/recipe123456789
  },
  initialize: function(options){
    var self = this;
    this.model = new Recipe({id: options.modelId});
    this.model.fetch({
      success: function () {
        console.log('fetched model');
      },
      error: function (e) {
        console.log(e);
      }
  });
    this.model.on('all', this.render, this);
  },
  render: function () {
    var data = {title: this.model.escape('title'), description: this.model.escape('description') };
    this.$el.html(recipeEditTemplate(data));
  }
});
module.exports = RecipeEditView;