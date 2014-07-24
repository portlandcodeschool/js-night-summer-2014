var ContactsInputView = Backbone.View.extend({

  el: '.form-group',
  events: {
    'click #add-contact': 'addContact'
  },
  addContact: function () {
    var $firstName = $(this.el).find('#first-name-input');
    var $lastName = $(this.el).find('#last-name-input');
    var $age = $(this.el).find('#age-input');

    var firstNameInput = $firstName.val();
    var lastNameInput = $lastName.val();
    var ageInput = $age.val();
    var collectionFromInput = {
      firstName: firstNameInput,
      lastName: lastNameInput,
      age: ageInput,
      creationDate: Date.now()
    };
    // CHALLENGE: change this collection method call so that it persists data and
    // so that the creation of this new model in this collection will be validated
    // and rejected before the new model is even added to the collection
    // ANSWER #1: use collection.create instead of collection.add
    // ANSWER #2: pass an options object, with the property validate,
    // with the value true (boolean, defaults to false)
    this.collection.create( collectionFromInput, { validate: true } );

    $firstName.val('');
    $lastName.val('');
    $age.val('');
  }

});
