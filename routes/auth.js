var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

/* GET home page. */
router.get('/', catchErrors( async( req, res, next ) => {
  res.render('index');
}));

// signin
router.get('/signin', catchErrors( async( req, res, next ) => {
  res.render('signin/index');
}));

// signup
router.get('/signup', catchErrors( async( req, res, next ) => {
  res.render('signup/index');
}));

// mypage
router.get('/mypage', catchErrors( async( req, res, next ) => {
    res.render('./users/index');
}));
module.exports = router;
