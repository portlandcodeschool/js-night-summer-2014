var test = require('express').Router();

test.get('/', function (req, res) {
    //res.render('test');
    res.send(200,'this is only a test');
});


module.exports = test;