var object = {};

_.extend(object, Backbone.Events);


object.on("alert", function(input) {
  $('#some-other-el').append("<h1>" + input.data + '</h1>' );
});


$().click(function () {
  object.trigger("alert", {data: 'mah data'});
})

var myView = Backbone.View.extend({
  method: function (arg) {

  }
})