var Backbone = require('backbone');
var Recipe = require('../models/recipe');

var Recipes = Backbone.Collection.extend({
  model: Recipe,
  url: '/api/recipes',
  comparator: 'creationDate'
});

module.exports = Recipes;
