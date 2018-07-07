var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

const Recipe_default = require('../models/recipe_default');

/* GET home page. */
router.get('/', catchErrors( async( req, res, next ) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;

  var query = {};
  const term = req.query.term;
  if (term) {
    query = {$or: [
      // {title: {'$regex': term, '$options': 'i'}},
      // {locate: {'$regex': term, '$options': 'i'}},
      // {event_field: {'$regex': term, '$options': 'i'}}
    ]};
  }

  const recipe_default = await Recipe_default.paginate(query, {
    sort: {RECIPE_ID: 1}, 
    page: page, limit: limit
  });
  console.log(recipe_default);
  res.render('recipe/index',{recipe_default:recipe_default});
}));
module.exports = router;
