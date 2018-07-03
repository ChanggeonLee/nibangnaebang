const mongoose = require('mongoose');
//const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var schema = new Schema({
    title: [{type:String}],
    data: [{type: String}]
}, {
    toJSON: { virtuals: true},
    toObject: {virtuals: true}
});

//schema.plugin(mongoosePaginate);
var recipe_default = mongoose.model('default', schema);

module.exports = recipe_default;