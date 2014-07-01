module.exports = function (req, res) {
  res.render('index', 
    {partials: { header: '../views/partials/_header', footer: '../views/partials/_footer'}}
  );
};