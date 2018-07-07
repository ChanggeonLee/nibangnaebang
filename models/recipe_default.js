const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var schema = new Schema({
  DET_URL: String, 
  IRDNT_CODE: String, 
  IMG_URL: String,
  NATION_CODE: String,
  SUMRY: String,
  CALORIE: String,
  TY_CODE: String,
  RECIPE_NM_KO: String,
  RN: Number,
  QNT: String,
  PC_NM: String,
  TY_NM: String,
  LEVE_NM: String,
  RECIPE_ID: Number,
  NATION_NM: String,
  COOKING_TIME: String
}, {
    toJSON: { virtuals: true},
    toObject: {virtuals: true}
});

schema.plugin(mongoosePaginate);
var recipe_default = mongoose.model('default', schema);

module.exports = recipe_default;