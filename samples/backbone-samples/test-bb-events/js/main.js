var view = Backbone.View.extend({
  el: '#my-app',
  hugCounter: 0,
  initialize: function () {
    var self = this;
    this.on("hug", function (hug){
      if (hug){
        this.hugCounter += 1;
        console.log(this.hugCounter);
        var hugGroup = '';
        for (var i = 0; i < this.hugCounter; i += 1) {
          hugGroup = '(' + hugGroup + ')';
          console.log(hugGroup);
        }
        $('#hug-displayer').html(hugGroup);
      }
    });
    $('#mah-button').on('click', function () {
      self.trigger("hug", true);
    });
  },
  render:function(){
    console.log('rendered');
  }
});


$(function () {
  var myView = new view();
  myView.render();
});
