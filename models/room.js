const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var schema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    //지역
    locate: {type: String, required: true, trim: true},
    //건물이름, 호수
    detail_address: {type: String, required: true, trim: false},
    // 기간
    start_time: {
        date:{type: String, required: true, trim: true},
        time:{type: String, required: true, trim: true}
    },
    end_time: {
        date:{type: String, required: true, trim: true},
        time:{type: String, required: true, trim: true}
    },
    // 적정 인원
    suitable_person: {type: String, required: true, trim: true},
    option: {type: Boolean, required : true, default: false},
    info: {type: String, required: true, trim: false},
    sell : {type: Boolean, required: true, default: false},
    // 좋아요 수
    numLikes: {type: Number, default: 0},
    img: [String],
    createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

schema.plugin(mongoosePaginate);
var Room = mongoose.model('Room', schema);

module.exports = Room;

