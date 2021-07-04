/* eslint-disable */
const mongoose = require('mongoose');
const Account = require('./account');
const Post = require("./post");
const Comment = require("./comment");

const setupDatabase = async function() {
  await connectDatabase();
  await initializeDatabase();
}

// Connect MongoDB.findMyTutor.
const connectDatabase = async function() {
  const url = "mongodb://localhost:27017/findMyTutor";
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('MongoDB.findMyTutor is connected.');
}

// Initialize MongoDB.findMyTutor.
const initializeDatabase = async function() {
  await initializeAccounts();
  await initializePosts();
  await initializeComments();
  console.log('MongoDB.findMyTutor is initialized.')
}

const initializeAccounts = async function() {
  await Account.collection.drop();
  await Account.insertMany([
    {
      type: "tutor",
      username: "frankyfan",
      password: "123456",
      fname: "Franky",
      lname: "Fan",
      avatar: "https://i.redd.it/biw2bktiuur41.jpg"
    },
    {
      type: "student",
      username: "lisawatanabe",
      password: "123456",
      fname: "Lisa",
      lname: "Watanabe",
      avatar: "https://www.zhifure.com/upload/images/2018/7/16143327546.jpg"
    }
  ])
}

const initializePosts = async function() {
  // TODO:
}

const initializeComments = async function() {
  // TODO:
}

module.exports = setupDatabase;
