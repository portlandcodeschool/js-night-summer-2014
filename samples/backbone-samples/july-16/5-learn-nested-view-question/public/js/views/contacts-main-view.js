var contactsMainTemplate = '<h2>Add a Contact</h2>' +
  '<div class="form-group">' +
    '<label for="first-name-input">First Name</label>' +
    '<input id="first-name-input" class="form-control" type="text">' +
    '<br>' +
    '<label for="last-name-input">Last Name</label>' +
    '<input id="last-name-input" class="form-control" type="text">' +
    '<br>' +
    '<label for="age-input">Age</label>' +
    '<input id="age-input" class="form-control" type="text">' +
    '<br><br>'+
    '<button id="add-contact" class="btn btn-success">Add Contact</button>' +
  '</div>' +
  '<br>' +
  '<h3>My Contacts</h3>' +
  '<div id="contacts-list">' +
  '</div>';

var ContactsMainView = Backbone.View.extend({
  el: '#my-app',
  initialize: function () {
    $(this.el).html(contactsMainTemplate);
    this.collection.on('add', this.render, this);
  },
  render: function () {
    var contactsListView = new ContactsListView({collection: contacts});
    contactsListView.render();
    $('#contacts-list').html(contactsListView.$el);

    var contactsInputView = new ContactsInputView({collection: contacts});
    
  }

});