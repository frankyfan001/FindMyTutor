/* eslint-disable */
const mongoose = require('mongoose');

// Get the Schema constructor
const Schema = mongoose.Schema;

// Using Schema constructor, create a Schema
const AccountSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true,
  }
}, { timestamps: true });

// Create model from the schema
const Account = mongoose.model('Account', AccountSchema);

// Export model
module.exports = Account;
