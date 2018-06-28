var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

// 필요한 디비 require
var User = require('../models/user');

// 회원 가입 폼을 검사하는 함수 만들어야됨
function validateSignupform (form){
  var id = form.id || "";
  var name = form.name || "";
  var email = form.email || "";
  var password = form.password || "";
  var Reconfirmpassword = form.Reconfirmpassword || "";
  
  name = name.trim();
  email = email.trim();
  id = id.trim();
  password = password.trim();
  Reconfirmpassword = Reconfirmpassword.trim();

  if( !name ){
    return "유효한 이름을 입력하세요";
  }

  if( !email ){
    return "유효한 이메일을 입력하세요";
  }

  if( !id ){
    return "유효한 아이디를 입력하세요";
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

// 회원가입
router.post('/signup' , catchErrors( async( req , res , next) => {
// 데이터가 잘넘어오는지 확인을 위해서
console.log(req.body);
// 회원 가입 폼 검사하고 req.body로 넘어옴
var err = validateSignupform(req.body , {needpw: true});
if(err){
  // flash 설정은 나중에
  //req.flash('danger', err);
  console.log(err);
  return res.redirect('back');
}

// 가입된 유저인지 환인
var user = await User.findOne({email:req.body.email});
// 에러처리는 알아서 잘하자
if(user){
  console.log("중복된 사용자가 있습니다.");
  return res.redirect('back');
}

// 스키마에 저장하고
user = new User({
  id:req.body.id,
  email:req.body.email,
  name:req.body.name
});

// 비밀번호는 hash해서 저장하자
user.password = await user.generateHash(req.body.password);
console.log(user);
// 새로운 디비를 저장하자
await user.save();
// req.flash('success', 'Registered successfully. Please sign in.');
console.log("회원 가입 완료");
// 홈화면으로 리다이렉션 해주자.
return res.redirect('/');
}));

// mypage
router.get('/mypage', catchErrors( async( req, res, next ) => {
    res.render('./users/index');
}));


module.exports = router;
