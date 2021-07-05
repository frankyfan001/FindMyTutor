/* eslint-disable */
const mongoose = require('mongoose');

// Get the Schema constructor
const Schema = mongoose.Schema;

// Using Schema constructor, create a Schema
const PostSchema = new Schema({
  school: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  wage: {
    type: Number,
    required: true
  },
  thumbUp: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  account_ref: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  }
}, { timestamps: true });

// Create model from the schema
const Post = mongoose.model('Post', PostSchema);

// Export model
module.exports = Post;
