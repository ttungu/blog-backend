const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: "User"},
    title: {type: String, required: true, maxLength: 100},
    text: {type: String, required: true, maxLength: 1000},
    date: {type: Date, required: true, default: Date.now()},
    published: {type: Boolean, required: true}
})

module.exports = mongoose.model('Post', PostSchema);