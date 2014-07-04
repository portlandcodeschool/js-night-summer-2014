var contactsHandler = require('./handlers/contacts');
var router = require('express').Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.route('/') // routes in each router start at '/' 
                  //and are defined more specifially when "use.d"
  .get(contactsHandler.get)
  .post(contactsHandler.post);

router.delete('/:id', contactsHandler.del);

module.exports = router;


