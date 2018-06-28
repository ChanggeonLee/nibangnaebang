var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

var Room = require('../models/room');

const needAuth = require('../lib/need-auth');

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
  var rent = new Room({
    author: req.user.id,
    locate: req.body.locate,
    detail_address: req.body.detail_address,
    suitable_person: req.body.suitable_person
  });
  await rent.save();
  console.log("니방 올리기 성공");
  res.redirect('/rent');
}));
module.exports = router;