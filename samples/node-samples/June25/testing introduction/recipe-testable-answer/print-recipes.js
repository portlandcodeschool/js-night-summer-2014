var makeRecipeCard = require('./make-recipe-card');

module.exports = function (error, data) {
  var self = this;
  if (error) throw error;
  console.log('\nYOUR RECIPE COLLECTION\n');
  console.log(makeRecipeCard(data));
}
