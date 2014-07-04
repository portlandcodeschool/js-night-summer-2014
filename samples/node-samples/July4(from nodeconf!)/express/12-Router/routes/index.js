var indexHandler = require('./handlers/index');
var router = require('express').Router();

router.get('/', indexHandler);

module.exports = router;