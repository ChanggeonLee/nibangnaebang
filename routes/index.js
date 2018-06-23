const express = require('express');
const catchErrors = require('../lib/async-error');
const router = express.Router();

/* GET home page. */
router.get('/', catchErrors( async( req, res, next ) => {
    res.render('index', { title: '똥땅이네'});
}));

module.exports = router;
