var TodoListView = Backbone.View.extend({
  tagName: 'div',
  className: 'list-group',
  initialize: function () {
    this.collection.on('add', this.render, this);
  },
  render: function () {

    var outputHtml = '';

    this.collection.models.forEach(function (item) {
      outputHtml += '<a href="#" class="list-group-item">';
      //escape instead of get will prevent scripting attacks
      outputHtml += '<h4 class="list-group-item-heading">' + item.escape('title') + '</h4>';
      outputHtml += '<p class="list-group-item-text">' + item.escape('description') + '</p>';
      outputHtml += '<a/>';
    });

    $(this.el).html(outputHtml);
  }
});
