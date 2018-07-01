var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

var Building = require('../models/building');

const needAuth = require('../lib/need-auth');

// review
router.get('/', catchErrors( async( req, res, next ) => {
  building = await Building.find();
  res.render('review/index' , {building : building});
}));

router.get('/detail/:id',catchErrors( async( req, res , next) => {
  res.render('review_detail/index');
}));

module.exports = router;