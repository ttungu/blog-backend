const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: {type: String, maxLength: 100, required: true},
    text: {type: String, maxLength: 500, required: true},
    date_created: {type: Date, required: true, default: Date.now()},
    date_edited: {type: Date, default: Date.now()},
    post: {type: Schema.Types.ObjectId, ref: "Post"}
})

module.exports = mongoose.model('Comment', CommentSchema)
