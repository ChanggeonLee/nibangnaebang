var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

// D.B
var Building = require('../models/building');
var Building_detail = require('../models/building_detail');
var Comment = require('../models/comment');
var LikeLog = require('../models/like-log');

const needAuth = require('../lib/need-auth');

// review
router.get('/', catchErrors( async( req, res, next ) => {
  building = await Building.find();
  res.render('review/index' , {building : building});
}));

// review detail
router.get('/detail/:id',catchErrors( async( req, res , next) => {
  building_detail = await Building_detail.findOne({ building_name : req.params.id });
  comments = await Comment.find({building_detail : building_detail._id}).populate('author');

  if(!building_detail){
    req.flash('danger','방이 아직 없어용');
    return res.redirect('back');
  }

  if(req.user){
    var likelog = await LikeLog.findOne({building_detail : building_detail._id , author : req.user.id});
    if (likelog){
      var flag = true;
    }else{
      var flag = false;
    }
  }

  res.render('review_detail/index', {building_detail:building_detail , comments:comments, flag:flag});
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