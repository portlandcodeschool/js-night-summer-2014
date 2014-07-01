var contacts = [{name: "Ben", age: 31}, {name: "Steve", age: 29}];

module.exports = function (req, res) {
  res.render('contacts', {contacts:contacts});
};