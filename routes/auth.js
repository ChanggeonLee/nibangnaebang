var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

/* GET home page. */
router.get('/', catchErrors( async( req, res, next ) => {
<<<<<<< HEAD
  res.render('index');
=======
    res.render('signin/index');
>>>>>>> 94ef1196262f18cee678518a8a25ecf563f2cbe7
}));

/* GET home page. */
router.get('/signin', catchErrors( async( req, res, next ) => {
  res.render('index');
}));

// mypage
router.get('/mypage', catchErrors( async( req, res, next ) => {
  res.render('index');
}));
module.exports = router;
