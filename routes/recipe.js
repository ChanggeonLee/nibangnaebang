var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

const recipe = require('../models/recipe_default');

/* GET home page. */
router.get('/', catchErrors( async( req, res, next ) => {
  res.render('recipe/index');
  console.log(recipe);
}));
module.exports = router;
