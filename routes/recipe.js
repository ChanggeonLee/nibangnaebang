var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

//const recipe = require('../models/recipe-default');

/* GET home page. */
router.get('/', catchErrors( async( req, res, next ) => {
  res.render('recipe/index', { title: '똥땅이네' ,recipes : recipe });
}));
module.exports = router;
