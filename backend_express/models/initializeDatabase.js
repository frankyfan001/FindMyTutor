/* eslint-disable */
const Account = require('./account');
const Post = require("./post");
const Comment = require("./comment");

const initializeDatabase = function() {
  initializeAccounts();
  initializePosts();
  initializeComments();

  console.log('MongoDB.findMyTutor is initialized.')
}

const initializeAccounts = function() {
  Account.collection.drop();

  Account.insertMany([
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
    .then((result) => {
      // console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

const initializePosts = function() {
  // TODO:
}

const initializeComments = function() {
  // TODO:
}

module.exports = initializeDatabase;
