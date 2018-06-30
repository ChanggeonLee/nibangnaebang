const express = require('express');
const catchErrors = require('../../lib/async-error');
const Rent = require('../../models/rent');
const LikeLog = require('../../models/like-log');
const router = express.Router();

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

router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: err.status,
    msg: err.msg || err
  });
});

module.exports = router;