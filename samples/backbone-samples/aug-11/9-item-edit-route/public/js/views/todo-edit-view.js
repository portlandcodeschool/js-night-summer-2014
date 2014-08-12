var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var todoEditTemplate = require('../../templates/todo-edit.hbs');
var Todo = require('../models/todo');

var TodoEditView = Backbone.View.extend({
  el: '#my-app',
  events: {
    'click #save-todo': 'saveTodo'
  },
  saveTodo: function () {
    var titleVal = $('#title-input').val();
    var descriptionVal = $('#description-input').val();
    this.model.save({title: titleVal, description: descriptionVal});
    // this only works becuse we set a urlRoot on our model:  '/api/todos'
    // the urlRoot gets combined with the id to create something like:
    // /api/todos/todo123456789
  },
  initialize: function(options){
    var self = this;
    this.model = new Todo({id: options.modelId});
    this.model.fetch({
      success: function () {
        console.log('fetched model');
      },
      error: function (e) {
        console.log(e);
      }
  });
    this.model.on('all', this.render, this);
  },
  render: function () {
    var data = {title: this.model.escape('title'), description: this.model.escape('description') };
    this.$el.html(todoEditTemplate(data));
  }
});
module.exports = TodoEditView;