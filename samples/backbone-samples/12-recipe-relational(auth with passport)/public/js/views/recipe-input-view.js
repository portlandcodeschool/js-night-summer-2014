var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var RecipeInputView = Backbone.View.extend({

  el: '.form-group',
  events: {
    'click #add-recipe': 'addRecipe'
  },
  addRecipe: function () {
    var $titleInput = $(this.el).find('#title-input');
    var $description = $(this.el).find('#description-input');

    var titleInput = $titleInput.val();
    var descriptionInput = $description.val();
    var date = Date.now();
    var collectionFromInput = {
      title: titleInput,
      description: descriptionInput,
      creationDate: date,
      id: 'recipe' + date
    };
    this.collection.create( collectionFromInput, {validate: true});
    console.log(this.collection.models);
    $description.val('');
    $titleInput.val('');
  }
});

module.exports = RecipeInputView;
