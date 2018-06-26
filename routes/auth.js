var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');

/* GET home page. */
router.get('/', catchErrors( async( req, res, next ) => {
    res.render('index');
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
