
var Router = Backbone.Router.extend({
    routes: {
        '': 'home'
        },
    home: function () {
        this.homeView = new HomeView();
        this.homeView.render();
    }
});

var HomeView = Backbone.View.extend({
    el: 'body',
    render: function () {
        $(this.el).html("<p>OMIGOSH IT'S A THING</p>");
    }
});

$(function () {
   window.app = new Router();
   Backbone.history.start();
});
