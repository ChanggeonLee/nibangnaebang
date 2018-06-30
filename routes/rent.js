var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

// D.B
var Rent = require('../models/rent');
var Comment = require('../models/comment');

const needAuth = require('../lib/need-auth');

// rent
router.get('/', catchErrors( async( req, res, next ) => {
  rents = await Rent.find();
  res.render('rent/index',{rent : rents});
}));

// 방세부정보
router.get('/detail/:id', catchErrors( async( req, res, next) => {
  rent = await Rent.findById(req.params.id);
  comment = await Comment.find({rent : rent._id}).populate('author');
  res.render('rent_detail/index', {rent:rent , comments : comment});
}));

// 방 올리기
router.get('/upload/:id',needAuth, catchErrors( async (req , res, next) => {
  rent = new Rent();
  res.render('rent_upload/index' , {rent : rent});
}));

var option = function(form , rent){
  if(form.tv){
    rent.tv=true;
  }

  if(form.elevator){
    rent.elevator=true;
  }

  if(form.bed){
    rent.bed=true;
  }

  if(form.wardrobe){
    rent.wardrobe=true;
  }

  if(form.washer){
    rent.washer=true;
  }

  if(form.gaslens){
    rent.gaslens=true;
  }

  if(form.internet){
    rent.internet=true;
  }

  if(form.water){
    rent.water=true;
  }

  return rent;
}

// 방 올리기 post
router.post('/upload/:id', needAuth ,catchErrors( async (req , res, next ) => {
  var rent = new Rent({
    author: req.user.id,
    locate: req.body.locate,
    detail_address: req.body.detail_address,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    suitable_person: req.body.suitable_person,
    info: req.body.info,
    amount: req.body.amount
  });

  rent.img = req.body.img;

  rent = option(req.body , rent);

  await rent.save();
  
  res.redirect('/rent');
}));

// 방 댓글 달기
router.post('/detail/comment/:id', needAuth, catchErrors(async (req , res, next) => {
  // console.log(req.body);
  var rent = await Rent.findById(req.params.id).populate('author');
  var comment = new Comment({
    author : rent.author,
    rent : rent._id,
    content : req.body.content
  });
  console.log(comment);
  await comment.save();
  res.redirect('back');
}));
module.exports = router;


//방 댓글 삭제
router.delete('/detail/comment/:id/', needAuth , catchErrors(async (req, res, next) => {
  await Comment.findByIdAndRemove(req.params.id);
  res.redirect('back');
}));

