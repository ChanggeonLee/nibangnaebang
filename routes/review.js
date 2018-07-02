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

// review detail
router.get('/detail/:id',catchErrors( async( req, res , next) => {
  building_detail = await Building_detail.findOne({ building_name : req.params.id });
  comments = await Comment.find({building_detail : building_detail._id});

  res.render('review_detail/index', {building_detail:building_detail , comments:comments});
}));

// review comment post
router.post('/detail/comment/:id', needAuth, catchErrors(async (req , res, next) => {
  // console.log(req.body);
  var building_detail = await Building_detail.findById(req.params.id);
  var comment = new Comment({
    author : req.user.id,
    building_detail : building_detail._id,
    content : req.body.content
  });
  console.log(comment);
  await comment.save();
  res.redirect('back');
}));

// review comment delete
router.delete('/detail/comment/:id/', needAuth , catchErrors(async (req, res, next) => {
  await Comment.findByIdAndRemove(req.params.id);
  res.redirect('back');
}));
module.exports = router;