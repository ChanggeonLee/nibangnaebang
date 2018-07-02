const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var schema = new Schema({
   // 건물 이름
   building_name: {type: String},
   img: {type: String},
   numLikes: {type: Number, default: 0},
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

schema.plugin(mongoosePaginate);
var building_detail = mongoose.model('building_detail', schema);

module.exports = building_detail;

