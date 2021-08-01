/* eslint-disable */
const mongoose = require('mongoose');

// Get the Schema constructor
const Schema = mongoose.Schema;

// Using Schema constructor, create a Schema
const CommentSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  isThumbUp: {
    type: Boolean,
    required: true
  },
  account_ref: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  post_ref: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  }
}, { timestamps: true });

// Create model from the schema
const Comment = mongoose.model('Comment', CommentSchema);

// Export model
module.exports = Comment;
