const express = require('express');
const catchErrors = require('../lib/async-error');
const router = express.Router();
const aws = require('aws-sdk');
const uuidv4 = require('uuid/v4');
const KerasJS = require('keras-js')

/* GET home page. */
router.get('/', catchErrors( async( req, res, next ) => {
    res.render('index', { title: '똥땅이네'});
}));


// Keras model import
const model = new KerasJS.Model({
  filepath: '../opt_recipe.pb',
  filesystem: true
});

router.get('/recommend', catchErrors( async(req, res, next) => {
  try {
    await model.ready()
    const inputData = {
      input_1: new Float32Array(data)
    }
    const outputData = await model.predict(inputData)
  } catch (err) {
    // handle error
  }
  return outputData;
}));

// AWS 이미지 업로드
const S3_BUCKET = process.env.S3_BUCKET;
router.get('/s3', function(req, res, next) {
  const s3 = new aws.S3({region: 'ap-northeast-2'});
  const filename = req.query.filename;
  const type = req.query.type;
  const uuid = uuidv4();
  const params = {
    Bucket: S3_BUCKET,
    Key: uuid + '/' + filename,
    Expires: 900,
    ContentType: type,
    ACL: 'public-read'
  };
  console.log(params);
  s3.getSignedUrl('putObject', params, function(err, data) {
    if (err) {
      console.log(err);
      return res.json({err: err});
    }
    res.json({
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${uuid}/${filename}`
    });
  });
});

module.exports = router;