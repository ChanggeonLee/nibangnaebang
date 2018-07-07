var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

const Recipe_default = require('../models/recipe_default');

/* GET home page. */
router.get('/', catchErrors( async( req, res, next ) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  var recipe_default = await Recipe_default.paginate({ 
    sort: {RECIPE_ID:1}, 
    page: page, limit: limit
  });

  // console.log(recipe_default.data);
  res.render('recipe/index' , {recipe_default:recipe_default });
}));
module.exports = router;
