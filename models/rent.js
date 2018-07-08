const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var schema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    // 이미지
    img: [String],
    //지역
    locate: {type: String, required: true, trim: true},
    //건물이름, 호수
    detail_address: {type: String, trim: false},
    // 기간
    start_time: {type: String , required: true},
    end_time: {type: String , required: true},
    // 적정 인원
    suitable_person: {type: String},  
    // 상세 설명
    info: {type: String, required: true, trim: false},
    // 옵션
    tv: {type: Boolean , default: false},
    elevator: {type: Boolean , default: false},
    bed: {type: Boolean , default: false},
    wardrobe: {type: Boolean , default: false},
    washer: {type: Boolean , default: false},
    gaslens: {type: Boolean , default: false},
    internet: {type: Boolean , default: false},
    water: {type: Boolean , default: false},
    // 판매자만
    sell : {type: Boolean, required: true, default: false},
    // 좋아요 수
    numLikes: {type: Number, default: 0},
    // 금액
    amount: {type: String , required: true},
    createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

schema.plugin(mongoosePaginate);
var Rent = mongoose.model('Rent', schema);

module.exports = Rent;

