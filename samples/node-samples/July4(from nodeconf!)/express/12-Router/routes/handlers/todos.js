var items = ["mow the lawn", "do the dishes", "paint the fence", "wax on, wax off"];

module.exports = {
  get: function (req, res) {
    res.render('todos', 
      { items:items,
        partials: { header: '../views/partials/_header', footer: '../views/partials/_footer'}
    });
  }, 
  post: function (req, res) {
    req.accepts('application/json');
    console.log(req.text); // see raw-body body parser
    items.push(req.text); 
    res.send(200, 'We added your todo');
  },
  del:  function (req, res) {
    var requestedId = req.params.id;

    if (isNaN(requestedId)) {
      res.send(400, 'Invalid item id');
    } else if (!items[requestedId]) {
      res.send(404, 'Item not found');
    } else {
      items.splice(requestedId, 1);
      res.send(200, "OK: We deleted todo # " + requestedId);
    }
  }
};
