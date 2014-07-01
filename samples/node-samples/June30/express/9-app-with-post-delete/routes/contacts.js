var contacts = [{name: "Ben", age: 31}, {name: "Steve", age: 29}];

module.exports = {
  get: function (req, res) {
    res.render('contacts', 
      { contacts:contacts, 
        partials: { header: '../views/partials/_header', footer: '../views/partials/_footer'}
    });
  },
  post: function (req, res) {
    req.accepts('application/json');
    contacts.push(req.body);
    res.send(200, 'we received your request');
  },
  del: function (req, res) {
    var requestedId = req.params.id;

    if (isNaN(requestedId)) {
      res.send(400, 'Invalid item id');
    } else if (!contacts[requestedId]) {
      res.send(404, 'Item not found');
    } else {
      contacts.splice(requestedId, 1);
      res.send(200, "OK: We deleted contact # " + requestedId);
    }
  }
}

