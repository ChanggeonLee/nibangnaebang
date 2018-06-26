const mongoose = require('mongoose');
//const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var schema = new Schema({
    rn: {type:Null},
    total_cnt: {type:Null},
    file_infos: {type:Null},
    regist_id: {type:Null},
    regist_nm: {type:Null},
    regist_dt: {type:Null},
    regist_date: {type:Null},
    updt_id: {type:Null},
    updt_nm: {type:Null},
    updt_dt: {type:Null},
    updt_date: {type:Null},
    title: [{type:String}],
    data: [{type: String}]
}, {
    toJSON: { virtuals: true},
    toObject: {virtuals: true}
});

schema.plugin(mongoosePaginate);
var Process = mongoose.model('recipe-default', schema);

module.exports = Process;