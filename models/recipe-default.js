const mongoose = require('mongoose');
//const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var schema = new Schema({
    rn,
    total_cnt,
    file_infos,
    regist_id,
    regist_nm,
    regist_dt,
    regist_date,
    updt_id,
    updt_nm,
    updt_dt,
    updt_date,
    title: [{type:String}],
    data: [{type: String}]
}, {
    toJSON: { virtuals: true},
    toObject: {virtuals: true}
});

//schema.plugin(mongoosePaginate);
var recipe_default = mongoose.model('recipe_default', schema);

module.exports = recipe_default;