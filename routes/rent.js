var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

var Room = require('../models/room');

const needAuth = require('../lib/need-auth');

// rent
router.get('/', catchErrors( async( req, res, next ) => {
  rents = await Room.find();
  res.render('rent/index',{rent : rents});
}));

// 방세부정보
router.get('/detail/:id', catchErrors( async( req, res, next) => {
  rent = await Room.findById(req.params.id);
  console.log(rent);
  res.render('rent_detail/index', {rent:rent});
}));

// 방 올리기
router.get('/upload/:id',needAuth, catchErrors( async (req , res, next) => {
  rent = new Room();
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
  console.log(req.body);
  console.log(req.body.img);

  var rent = new Room({
    author: req.user.id,
    locate: req.body.locate,
    detail_address: req.body.detail_address,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    suitable_person: req.body.suitable_person,
    info: req.body.info
  });
  console.log(req.body.img);

  rent.img = req.body.img;

  rent = option(req.body , rent);

  console.log(rent);

  await rent.save();
  console.log("니방 올리기 성공");
  res.redirect('/rent');
}));
module.exports = router;