var items = ["mow the lawn", "do the dishes", "paint the fence", "wax on, wax off"];

module.exports = function (req, res) {
  res.render('todos', 
    { items:items,
      partials: { header: '../views/partials/_header', footer: '../views/partials/_footer'}
  });
};
