const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var schema = new Schema({
    //지역
    locate: {type: String, required: true, trim: true},
    //건물이름
    building_name: {type: String, required: true, trim: false}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

schema.plugin(mongoosePaginate);
var building = mongoose.model('building', schema);

module.exports = building;

