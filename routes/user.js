var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

// 필요한 디비 require
var User = require('../models/user');
var LikeLog = require('../models/like-log');
var Rent =require('../models/rent');

// 로그인 확인
const needAuth = require('../lib/need-auth');

// 회원 가입 폼을 검사하는 함수 만들어야됨
function validateSignupform (form){
  var name = form.name || "";
  var email = form.email || "";
  var password = form.password || "";
  var Reconfirmpassword = form.Reconfirmpassword || "";
  
  name = name.trim();
  email = email.trim();
  password = password.trim();
  Reconfirmpassword = Reconfirmpassword.trim();

  if( !name ){
    return "유효한 이름을 입력하세요";
  }

  if( !email ){
    return "유효한 이메일을 입력하세요";
  }

  if( !password ){
    return "유효한 비밀번호를 입력하세요";
  }

  if( password != Reconfirmpassword){
    return "비밀번호가 불일치 합니다.";
  }

  return null;
}

// signup
router.get('/signup', catchErrors( async( req, res, next ) => {
  res.render('signup/index');
}));

// signup
router.post('/signup' , catchErrors( async( req , res , next) => {
  // 데이터가 잘넘어오는지 확인을 위해서
  console.log(req.body);
  // 회원 가입 폼 검사하고 req.body로 넘어옴
  var err = validateSignupform(req.body , {needpw: true});
  if(err){
    // flash 설정은 나중에
    req.flash('danger', err);
    return res.redirect('back');
  }

  // 가입된 유저인지 환인
  var user = await User.findOne({email:req.body.email});
  // 에러처리는 알아서 잘하자
  if(user){
    req.flash('danger', "중복된 사용자가 있습니다.");
    return res.redirect('back');
  }

  // 스키마에 저장하고
  user = new User({
    email:req.body.email,
    name:req.body.name
  });

  // 비밀번호는 hash해서 저장하자
  user.password = await user.generateHash(req.body.password);
  // 새로운 디비를 저장하자
  await user.save();
  req.flash('success', "회원가입 성공~!!!");
  // 홈화면으로 리다이렉션 해주자.
  return res.redirect('/');

}));


// 회원 정보 변경
router.put('/:id' ,needAuth , catchErrors( async( req , res , next ) => {
  var user = await User.findById(req.params.id);
  if(!user){
    req.flash('danger' , '등록된 회원이 아닙니다.');
    return res.redirect('/');
  }

  if(req.body.email){
    console.log(await User.findOne({email : req.body.email}));
    // email 설정
    if( await User.findOne({email : req.body.email})!=null){
      req.flash('danger' , '사용중 email 입니다.');
      return res.redirect('back');
    }else{
      user.email = req.body.email;
    }

  }

  // 비밀 번호 설정
  if(req.body.new_password){

    if(!user.password){
      req.flash('danger' , '카카오톡 , 페이스북 , 구글 사용자는 비밀번호를 변경 할수 없습니다.');
      return res.redirect('back');
    }
  
    if(req.body.new_password != req.body.new_password_confirmation){
      req.flash('danger' , '비밀번호가 일치 하지 않아요~~!!');
      return res.redirect('back');
    }
    user.password = await user.generateHash(req.body.new_password);
  }

  await user.save();
  req.flash('success', '회원 정보 수정 완료');
  res.redirect('back');
}));

router.delete('/:id' ,needAuth , catchErrors( async(req,res,next) => {
  var user = await User.findById(req.params.id);
  // 다른거 지울거 있으면 같이 지우자~!
  await user.remove();
  req.flash('danger', '회원탈퇴 완료~!');
  res.redirect('/signout');
}));

// mypage
router.get('/mypage/:id',needAuth, catchErrors( async( req, res, next ) => {
  var user = await User.findById(req.params.id);
  var like_logs = await LikeLog.find({author : req.params.id}).populate('rent');
  // console.log(like_log);
  res.render('./mypage/index' , {user:user , like_logs:like_logs});
}));

module.exports = router;
