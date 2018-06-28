var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

var Room = require('../models/room');

// 로그인 확인
function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', 'Please signin first.');
    res.redirect('/signin');
  }
}

// rent
router.get('/', catchErrors( async( req, res, next ) => {
  res.render('rent/index');
}));

// 방세부정보
router.get('/detail', catchErrors( async( req, res, next) => {
  res.render('rent_detail/index');
}));

// 방 올리기
router.get('/upload/:id',needAuth, catchErrors( async (req , res, next) => {
  rent = new Room();
  res.render('rent_upload/index' , {rent : rent});
}));

// 방 올리기 post
router.post('/upload/:id', needAuth ,catchErrors( async (req , res, next ) => {
  console.log(req.body);
}));
module.exports = router;