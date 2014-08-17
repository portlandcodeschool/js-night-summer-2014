var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var RecipeMainView = require('./views/recipe-main-view');
var RecipeEditView = require('./views/recipe-edit-view');
var Recipes = require('./collections/recipes');
var recipes = new Recipes();

var Router = Backbone.Router.extend({
  routes: {
    '': 'recipes',
    'edit/:id': 'recipeEdit'
  },
  recipes: function () {
    this.todoMainView = new RecipeMainView({collection:recipes});
    this.todoMainView.render();
  },
  recipeEdit: function (id) {
    this.recipeEditView = new RecipeEditView({modelId: id});
    this.recipeEditView.render();
  }

});

$(function () {
  window.app = new Router();
  Backbone.history.start();
});
