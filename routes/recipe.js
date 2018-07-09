var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

const Recipe_default = require('../models/recipe_default');
const Recipe_process = require('../models/recipe_process');
const Recipe_material = require('../models/recipe_material');

/* GET home page. */
router.get('/', catchErrors( async( req, res, next ) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;

  var query = {};
  const term = req.query.term;
  if (term) {
    query = {$or: [
      {RECIPE_NM_KO: {'$regex': term, '$options': 'i'}}
    ]};
  }

  const recipe_default = await Recipe_default.paginate(query, {
    sort: {RECIPE_ID: 1}, 
    page: page, limit: limit
  });
  console.log(recipe_default);
  res.render('recipe/index',{recipe_default:recipe_default, term: term, query: req.query});
}));

router.get('/detail/:id', catchErrors( async(req,res,next) => {
  var recipe_default  = await Recipe_default.findById(req.params.id);
  var recipe_process  = await Recipe_process.find({RECIPE_ID:recipe_default.RECIPE_ID}).sort({'COOKING_NO': 1});
  var recipe_material_main = await Recipe_material.find({RECIPE_ID:recipe_default.RECIPE_ID , IRDNT_TY_NM:'주재료'});
  var recipe_material_sub = await Recipe_material.find({RECIPE_ID:recipe_default.RECIPE_ID , IRDNT_TY_NM:'부재료'});
  var recipe_material_sauce = await Recipe_material.find({RECIPE_ID:recipe_default.RECIPE_ID , IRDNT_TY_NM:'양념'});
  res.render('recipe_detail/index',{recipe_default:recipe_default , recipe_process:recipe_process , recipe_material_main:recipe_material_main , recipe_material_sub: recipe_material_sub , recipe_material_sauce:recipe_material_sauce});
}));
module.exports = router;
