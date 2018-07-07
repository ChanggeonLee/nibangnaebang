const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var schema = new Schema({
  STRE_STEP_IMAGE_URL: String,
  RN: Number,
  RECIPE_ID: Number,
  COOKING_DC: String,
  COOKING_NO: Number
}, {
    toJSON: { virtuals: true},
    toObject: {virtuals: true}
});

schema.plugin(mongoosePaginate);
var process = mongoose.model('process', schema);

module.exports = process;