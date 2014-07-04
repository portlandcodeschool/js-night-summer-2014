var todosHandler = require('./handlers/todos');
var router = require('express').Router();
var getRawBody = require('raw-body');

router.use(function (req, res, next) {
  getRawBody(req, {
    length: req.headers['content-length'],
    limit: '1mb'
  }, function (err, string) {
    if (err)
      return next(err)

    req.text = string
    next()
  })
})

router.route('/')
  .get(todosHandler.get)
  .post(todosHandler.post);

router.delete('/:id', todosHandler.del);

module.exports = router;


