var formatDirections = require('./format-directions');
var formatIngredients = require('./format-ingredients');

module.exports = function (data) {
  var output; 
  data.forEach(function (recipeCard) {
    var ingredients = formatIngredients(recipeCard);
    var directions = formatDirections(recipeCard);
    var recipe = ingredients + directions; 
    output += recipe;
  });
  return output;
}
