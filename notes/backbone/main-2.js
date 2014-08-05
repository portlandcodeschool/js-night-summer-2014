
var CounterModel = Backbone.Model.extend({
    defaults: {
        counter: 0
    }
});

var CounterView = Backbone.View.extend({
    el: 'div',
    render: function () {
        $(this.el).html("<p>" + this.model.get("counter") + "</p>");
    },
    initialize: function () {
        this.model.on('change',this.render,this);
        var model = this.model;
        $("button").on("click", function () {
            var num = model.get("counter");
            model.set("counter",num+1);
        });
    }
});

var Router = Backbone.Router.extend({
    routes: {
        '': 'home'
        },
    home: function () {
        var counter = new CounterModel();
        var counterView = new CounterView({model : counter});
        counterView.render();
    }
});

$(function () {
    window.app = new Router();
    Backbone.history.start();
})
