const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  recipe: { type: Schema.Types.ObjectId, ref: 'Recipe' },
  content: {type: String, trim: false, required: true},
  star: {type: number, default: 0},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});
schema.plugin(mongoosePaginate);
var Comment = mongoose.model('Comment', schema);

module.exports = Comment;
