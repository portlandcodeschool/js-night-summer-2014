var ContactsListView = Backbone.View.extend({
  tagName: 'div',
  className: 'list-group',
  initialize: function () {
    this.collection.on('add', this.render, this);
  },
  render: function () {

    var outputHtml = '';
    this.collection.models.forEach(function (item) {
      // CHALLENGE:
      // Change the model property getters to be the kind that will *escape* html

      outputHtml += '<a href="#" class="list-group-item">'
      outputHtml += '<h4 class="list-group-item-heading">' + item.get('firstName') + '</h4>';
      outputHtml += '<p class="list-group-item-text">' + item.get('lastName') + '</p>';
      outputHtml += '<p class="list-group-item-text">' + item.get('age') + '</p>';
      outputHtml += '<a/>'
    });

    $(this.el).html(outputHtml);
  }
});
