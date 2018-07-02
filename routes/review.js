var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

// D.B
var Building = require('../models/building');
var Building_detail = require('../models/building_detail');
var Comment = require('../models/comment');

const needAuth = require('../lib/need-auth');

// review
router.get('/', catchErrors( async( req, res, next ) => {
  building = await Building.find();
  res.render('review/index' , {building : building});
}));

router.get('/detail/:id',catchErrors( async( req, res , next) => {
  building_detail = await Building_detail.findOne({ building_name : req.params.id });
  comments = await Comment.find({building_detail : building_detail._id});

  res.render('review_detail/index', {building_detail:building_detail , comments:comments});
}));

module.exports = router;