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
    var ageInput = $age.val()

    this.collection.add({firstName: firstNameInput, lastName: lastNameInput, age: ageInput});

    $firstName.val('');
    $lastName.val('');
    $age.val('');
  }

});
