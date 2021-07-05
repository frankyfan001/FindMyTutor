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
  await Account.collection.drop().catch((err) => {});
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
      type: "tutor",
      username: "brookxiao",
      password: "123456",
      fname: "Brook",
      lname: "Xiao",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_sWz-dVuWRkPuUbY9_660qV8YPKIjD8_PoQ&usqp=CAU"
    },
    {
      type: "student",
      username: "lisawatanabe",
      password: "123456",
      fname: "Lisa",
      lname: "Watanabe",
      avatar: "https://www.zhifure.com/upload/images/2018/7/16143327546.jpg"
    },
    {
      type: "student",
      username: "callyfan",
      password: "123456",
      fname: "Cally",
      lname: "Fan",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqVCzf412ffJOfAw_8gJw9WiwpKMMSEaqQFQ&usqp=CAU"
    }
  ])
}

const initializePosts = async function() {
  await Post.collection.drop().catch((err) => {});
  const tutors = await Account.find({type: "tutor"});
  await Post.insertMany([
    {
      school: "UBC",
      course: "CPSC 455",
      wage: 30,
      thumbUp: 20,
      phone: "604-999-8407",
      email: "frankyfan003@gmail.com",
      description: "Hi, my name is Franky, majoring Computer Science from UBC.",
      account_ref: tutors[0]._id,
      createdAt: new Date("2021-07-04T10:03:23.308Z")
    },
    {
      school: "UBC",
      course: "ECON 311",
      wage: 20,
      thumbUp: 10,
      phone: "604-999-8407",
      email: "frankyfan@gmail.com",
      description: "Hi, my name is Franky, and I'm good at Economics.",
      account_ref: tutors[0]._id,
      createdAt: new Date("2021-07-03T10:03:23.308Z")
    },
    {
      school: "SFU",
      course: "CMPT 225",
      wage: 25,
      thumbUp: 15,
      phone: "604-123-456",
      email: "brookxiao@gmail.com",
      description: "I can teach CMPT 225.",
      account_ref: tutors[1]._id,
      createdAt: new Date("2021-07-02T10:03:23.308Z")
    },
    {
      school: "SFU",
      course: "BIOL 100",
      wage: 15,
      thumbUp: 5,
      phone: "604-123-456",
      email: "brookxiao@gmail.com",
      description: "I can teach BIOL 110.",
      account_ref: tutors[1]._id,
      createdAt: new Date("2021-07-01T10:03:23.308Z")
    },
  ])
}

const initializeComments = async function() {
  // TODO:
}

module.exports = setupDatabase;
