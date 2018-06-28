var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

router.get('/', catchErrors( async( req, res, next ) => {
  res.render('rent/index');
}));

router.get('/detail', catchErrors( async( req, res, next) => {
  res.render('rent_detail/index');
}));

router.get('/upload', catchErrors( async (req , res, next) => {
  res.render('rent_upload/index');
}));
module.exports = router;