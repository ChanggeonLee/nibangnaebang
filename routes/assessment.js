var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

/* GET home page. */
router.get('/', catchErrors( async( req, res, next ) => {
  res.send('respond with a resource');
}));
module.exports = router;
