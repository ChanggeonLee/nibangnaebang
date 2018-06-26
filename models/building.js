const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var schema = new Schema({
    //지역
    locate: {type: String, required: true, trim: true},
    //건물이름
    detail_address: {type: String, required: true, trim: false},

    


  
    // 평균별점
    star_avg: {type: Number, default: 0},
    img: [String],
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

schema.plugin(mongoosePaginate);
var building = mongoose.model('building', schema);

module.exports = building;

