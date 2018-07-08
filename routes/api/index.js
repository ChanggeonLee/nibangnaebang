const express = require('express');
const catchErrors = require('../../lib/async-error');
const router = express.Router();

// D.B
const LikeLog = require('../../models/like-log');
const Rent = require('../../models/rent');
const Building = require('../../models/building');
const Building_detail = require('../../models/building_detail');
const User = require('../../models/user');
const Recipe_default = require('../../models/recipe_default');

// Like for Rent
router.post('/rent/:id/like', catchErrors(async (req, res, next) => {
  const rent = await Rent.findById(req.params.id).populate('author');
  if (!rent) {
    return next({status: 404, msg: 'Not exist rent'});
  }
  var likeLog = await LikeLog.findOne({author: req.user._id, rent: rent._id});
  if (!likeLog) {
    rent.numLikes++;
    await Promise.all([
      rent.save(),
      LikeLog.create({
        author: req.user._id, 
        rent: rent._id,
        rent_name: rent.author.name
      })
    ]);
  }
  return res.json(rent);
}));


// Like for Rent
router.post('/rent/:id/dislike', catchErrors(async (req, res, next) => {
  const rent = await Rent.findById(req.params.id).populate('author');
  if (!rent) {
    return next({status: 404, msg: 'Not exist rent'});
  }
  var likeLog = await LikeLog.findOne({author: req.user._id, rent: rent._id});
  if (likeLog) {
    rent.numLikes--;
    await Promise.all([
      rent.save(),
      likeLog.remove()
    ]);
  }
  return res.json(rent);
}));

// Review for Rent
router.post('/review/:id/like', catchErrors(async (req, res, next) => {
  const building_detail = await Building_detail.findById(req.params.id);
  const user = await User.findById(req.user.id);
  
  if (!building_detail) {
    return next({status: 404, msg: 'Not exist review'});
  }

  var likeLog = await LikeLog.findOne({author: req.user._id, building_detail: building_detail._id});
  if (!likeLog) {
    building_detail.numLikes++;
    await Promise.all([
      building_detail.save(),
      LikeLog.create({
        author: req.user._id, 
        building_detail: building_detail._id,
        building_name: user.name
      })
    ]);
  }
  return res.json(building_detail);
}));

// recipe for Rent
router.post('/recipe/:id/like', catchErrors(async (req, res, next) => {
  const recipe_default = await Recipe_default.findById(req.params.id);
  const user = await User.findById(req.user.id);
  
  if (!recipe_default.id) {
    return next({status: 404, msg: 'Not exist review'});
  }

  var likeLog = await LikeLog.findOne({author: req.user.id, recipe_default: recipe_default._id});
  if (!likeLog) {
    await Promise.all([
      LikeLog.create({
        author: req.user._id, 
        recipe_default: recipe_default._id,
        recipe_name: user.name
      })
    ]);
  }
  return res.json();
}));


// review select
router.get('/review/select/:id', catchErrors(async (req, res, next) => {
  const building = await Building.findOne({locate : req.params.id});
  if (!building) {
    return next({status: 404, msg: 'Not exist rent'});
  }
  return res.json(building);
}));

// rent select
router.get('/rent/:id', catchErrors(async (req, res, next) => {
  if (req.params.id == "전체"){
    var rent = await Rent.find();
  }else{
    var rent = await Rent.find({locate : req.params.id});
  }

  // console.log(rent);
  return res.json(rent);
}));


// //send email
// router.get('/rent/:id/sendemail', catchErrors(async (req , res, next) => {
//   console.log(req.params.id);
// }));



router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: err.status,
    msg: err.msg || err
  });
});

module.exports = router;