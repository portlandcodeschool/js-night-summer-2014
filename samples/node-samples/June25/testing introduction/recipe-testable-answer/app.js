var readRecipes = require('./read-recipes');
var printRecipes = require('./print-recipes');

readRecipes('./recipes.json', printRecipes);