var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

// D.B
var Rent = require('../models/rent');
var Comment = require('../models/comment');
var LikeLog = require('../models/like-log');
var User = require('../models/user');

const needAuth = require('../lib/need-auth');

var nodemail = require('../lib/node-mail');


router.get('/', catchErrors( async(req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  var query = {};
  const term = req.query.term;
  if (term) {
    query = {$or: [
      {locate: {'$regex': term, '$options': 'i'}},
      {detail_address: {'$regex': term, '$options': 'i'}}
    ]};
  }
  const rents = await Rent.paginate(query, {
    sort: {createdAt: -1}, 
    populate: 'author', 
    page: page, limit: limit
  });
  res.render('rent/index', {rents: rents, term: term, query: req.query});
  
}));

// 방세부정보
router.get('/detail/:id', catchErrors( async( req, res, next) => {
  var rent = await Rent.findById(req.params.id).populate('author');
  var comment = await Comment.find({rent : rent._id}).populate('author');
  if(req.user){
    var likelog = await LikeLog.findOne({rent : rent._id , author : req.user.id});
    if (likelog){
      var flag = true;
    }else{
      var flag = false;
    }
  }
  res.render('rent_detail/index', {rent:rent , comments : comment , flag : flag});
 
}));

// 방 올리기
router.get('/:id',needAuth, catchErrors( async (req , res, next) => {
  rent = new Rent();
  res.render('rent/upload' , {rent : rent});
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

// 니방올리기 폼을 검사하는 함수 만들어야됨
function validateRentform (form){
  var detail_address = form.detail_address || "";
  var start_time = form.start_time || "";
  var end_time = form.end_time || "";
  var amount = form.amount || "";
  //var suitable_person = form.sutiable_person || "";

  detail_address = detail_address.trim();
  start_time = start_time.trim();
  end_time = end_time.trim();
  amount = amount.trim();
  //suitable_person = suitable_person.trim();

  if( !detail_address){
    return "건물이름과 호수를 입력하세요";
  }

  if( !start_time ){
    return "시작 날짜를 입력하세요";
  }

  if( !end_time ){
    return "종료 날짜를 입력하세요";
  }

  if( !amount ){
    return "가격을 입력하세요";
  }

  //if( !suitable_person ){
    //return "적정 인원을 입력하세요";
  //}

  return null;
}

// 방 올리기 post
router.post('/:id/', needAuth ,catchErrors( async (req , res, next ) => {

  var err = validateRentform(req.body);
  if(err){
    req.flash('danger',err);
    return res.redirect('back');
  }
  var rent = new Rent({
    author: req.params.id,
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
  console.log('방올리기 성공~!~!~!~!');
}));

// 방 댓글 달기
router.post('/detail/comment/:id', needAuth, catchErrors(async (req , res, next) => {

  var rent = await Rent.findById(req.params.id).populate('author');
  var comment = new Comment({
    author : req.user.id,
    rent : rent._id,
    content : req.body.content
  });

  await comment.save();
  res.redirect('back');
}));


// email 보내기
router.post('/:id/:cid/email', needAuth, catchErrors(async (req, res , next) => {
  rent = await Rent.findById(req.params.id).populate('author');
  user = await User.findById(req.params.cid);
  if(user.email=='no-email'){
    req.flash('danger','이메일을 설정해 주세요~!');
    return res.redirect('/');
  }
  
  nodemail.test(rent.author.email, user.email , rent.detail_address);
  
  req.flash('success' , "이메일 전송 완료~!");
  res.redirect('back');  
}));

//방 댓글 삭제
router.delete('/detail/comment/:id/', needAuth , catchErrors(async (req, res, next) => {
  await Comment.findByIdAndRemove(req.params.id);
  res.redirect('back');
}));


//방 삭제
router.delete('/:id/', catchErrors(async (req, res, next)=> {
  const rent = await Rent.findById(req.params.id);
  await LikeLog.findOneAndRemove({rent : rent._id});
  await Comment.findOneAndRemove({rent : rent._id});
  await rent.remove();

  res.redirect('/rent');
}));


// 방 판매
router.put('/:id/sell', catchErrors(async (req, res, next)=>{
  var rent = await Rent.findById(req.params.id);
  if(!rent){
    req.flash('success','방이 존재 하지 않아요');
    return res.redirect('/');
  }
  rent.sell = true;

  await rent.save();

  req.flash('success', '방 판매 완료~');
  res.redirect('/rent');
}));


//방 수정
router.get('/:id/edit' , catchErrors(async (req , res, next)=> {
  const rent = await Rent.findById(req.params.id);
  res.render('rent/edit' ,{ rent : rent});
}));

//방정보 변경
router.put('/:id/', catchErrors(async (req, res, next)=>{
  
  var err = validateRentform(req.body);
  if(err){
    req.flash('danger',err);
    return res.redirect('back');
  }
  var rent = await Rent.findById(req.params.id);
  
  rent.locate = req.body.locate;
  rent.detail_address = req.body.detail_address;
  rent.start_time = req.body.start_time;
  rent.end_time = req.body.end_time;
  rent.suitable_person = req.body.suitable_person;
  rent.info = req.body.info;
  rent.amount = req.body.amount;

  await rent.save();

  req.flash('success', '방 수정 완료~!~!');

  res.redirect('/rent/');
 
}));



// event index page

module.exports = router;