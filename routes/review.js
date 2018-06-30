var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

var Building = require('../models/building');

const needAuth = require('../lib/need-auth');

// rent
router.get('/', catchErrors( async( req, res, next ) => {
  buildings = await Building.find();
  res.render('review/index',{building : building});
}));

// 방세부정보
router.get('/detail/:id', catchErrors( async( req, res, next) => {
  building = await Building.findById(req.params.id);
  console.log(building);
  res.render('review_detail/index', {building:building});
}));

// 방 올리기
router.get('/upload/:id',needAuth, catchErrors( async (req , res, next) => {
  building = new Building();
  res.render('review_upload/index' , {building : building});
}));

router.get('/review', function(req, res){
  Building.find(function(err, building){
      res.render('views/review', 
          { building : building }    
          //ProductModel의 products를 받아서
          //admin/products로 response를 보낸다.
      );
  });
});

var option = function(form , building){
  if(form.locate){
    building.locate=true;
  }

  if(form.building_name){
    building.building_name=true;
  }

  return building;
}

// 방 올리기 post
router.post('/upload/:id', needAuth ,catchErrors( async (req , res, next ) => {
  console.log(req.body);


  var building = new Building({
    author: req.user.id,
    locate: req.body.locate,
    building_name: req.body.building_name
  });


  building = option(req.body , building);

  console.log(building);

  await building.save();
  console.log("니방 올리기 성공");
  res.redirect('/review');
}));





var buildings = [
  {
    locate : '명지대정문',
    building_name : ['성현빌딩' ,'우영빌딩']
  },
  {
    locate : '덕곡마을',
    building_name : ['59빌', '명지시티']
  },
  {
    locate : '동진마을',
    building_name : ['꿈의도시텔','학사원룸']
  }
];

for (var i=0; i<buildings.length; i++){
  var building = new Building({
    locate : buildings[i].locate,
    building_name : buildings[i].building_name
  });
}


module.exports = router;