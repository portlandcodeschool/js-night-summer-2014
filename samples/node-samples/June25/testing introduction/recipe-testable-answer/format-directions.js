module.exports = function (recipeCard) {
  var output = '';
  recipeCard.directions.forEach(function (item, index) {

    timeUnitPlural = item.unit + 's';

    output += '\n' + (index + 1).toString() + '. ' + item.direction;

    if (item.duration > 0) {
      output += ' for ' + item.duration + ' ' + item.unit;
    } else if (item.duration > 1) {
      output += ' for ' + item.duration + ' ' + item.unitPlural;
    }

  });

  output += '\n\n';

  return output; 

}
