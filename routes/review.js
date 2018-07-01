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

module.exports = router;