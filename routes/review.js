var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

var Building = require('../models/building');

const needAuth = require('../lib/need-auth');

// review
router.get('/', catchErrors( async( req, res, next ) => {
  // var building = new Building({
  //   locate : "덕곡마을",
  //   building_name : ["59빌" , "명지시티"]
  // });
  // await building.save();
  building = await Building.find();
  console.log(building);
  res.render('review/index' , {building : building});
}));



module.exports = router;