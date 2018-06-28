var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

// review
router.get('/', catchErrors( async( req, res, next ) => {
  res.render('review/index');
}));

// 방세부정보 / detail
router.get('/detail', catchErrors( async( req, res, next) => {
  res.render('review_detail/index');
}));
module.exports = router;