var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

router.get('/', catchErrors( async( req, res, next ) => {
  res.render('./room/index');
}));

module.exports = router;