module.exports = function (recipeCard) {
  var output = '';
  output += '\n' + recipeCard.title + '\n';
  recipeCard.ingredients.forEach(function (item, index) {
    var unitPlural = item.unit + 's';

    if (item.amount > 0)
      output += '\t' + item.amount + ' ';

    if (item.amount > 1) {
      output += unitPlural;
    } else {
      output += item.unit;
    }

    output += ' of ';
    output += item.ingredient + '\n';

  });
  return output;
}
