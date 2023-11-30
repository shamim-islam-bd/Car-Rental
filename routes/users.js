var express = require('express');
var router = express.Router();
// var database = require('../DBConnection.js');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send({ title: 'respond with a resource', session: req.session });
});




module.exports = router;








