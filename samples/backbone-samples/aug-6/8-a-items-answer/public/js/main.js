var TeamMate = Backbone.Model.extend({});

var TeamMates = Backbone.Collection.extend({
  model: TeamMate
});

var teamMates = new TeamMates();

teamMates.add([
  { name: 'Ben'},
  { name: 'Dan'},
  { name: 'Clarissa'}
]);

var ListView = Backbone.View.extend({
  el: '#team-list',
  initialize: function () {
    this.childViews = [];
    this.collection.on('add', this.render, this);
  },
  render: function () {
    var self = this;
    this.childViews.forEach(function (view){
      view.remove();
    });

    this.childViews = [];

    this.collection.each(function (item){
      var itemView = new ItemView({model: item});
      itemView.render();
      self.childViews.push(itemView.$el);
    });

    this.childViews.forEach(function (item){
      $("#team-list").append(item);
    });
  }
});

var ItemView = Backbone.View.extend({
  initialize: function () {
    this.model.on('change', this.render, this);
  },
  render: function () {
    var outputHtml = '<li class="list-group-item">' + this.model.escape('name') + '</li>';
    this.$el.html(outputHtml);
  }
});

var Router = Backbone.Router.extend({
  routes: {
    '': 'team'
  },
  team: function () {
    this.listView = new ListView({collection: teamMates});
    this.listView.render();
  }
});

$(function () {
  window.app = new Router();
  Backbone.history.start();
});
