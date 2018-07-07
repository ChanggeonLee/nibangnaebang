const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var schema = new Schema({
  IRDNT_CPCTY: String,
  IRDNT_NM: String,
  IRDNT_SN: Number,
  RN: Number,
  IRDNT_TY_NM: String,
  RECIPE_ID: Number,
  IRDNT_TY_CODE: String
}, {
    toJSON: { virtuals: true},
    toObject: {virtuals: true}
});

schema.plugin(mongoosePaginate);
var material = mongoose.model('material', schema);

module.exports = material;