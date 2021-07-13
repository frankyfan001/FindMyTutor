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
      avatar: "https://cdn.shopify.com/s/files/1/2123/8425/products/76678823-LRG_e1939e5f-7238-46e4-a7c7-eb6d0d26b6d6_530x.jpg?v=1578663470"
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
      avatar: "https://www.kozzi.com/wp-content/uploads/2020/11/Adorable-Golden-Retriever-puppy-isolated-on-white-background.jpg"
    },
    {
      type: "student",
      username: "callyfan",
      password: "123456",
      fname: "Cally",
      lname: "Fan",
      avatar: "https://vetstreet.brightspotcdn.com/dims4/default/7eaec8d/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F67%2Fb51540a27c11e087a80050568d634f%2Ffile%2FAmerican-Shorthair-2-645mk062311.jpg"
    }
  ])
}

const initializePosts = async function() {
  await Post.collection.drop().catch((err) => {});
  const tutors = await Account.find({type: "tutor"});
  await Post.insertMany([
    {
      availableDays: [false, false, false, false, false, true, true],
      school: "UBC",
      course: "CPSC 455",
      wage: 30,
      contact: "604-999-8407",
      thumbUp: 1,
      thumbDown: 1,
      description: "Hi, my name is Franky, majoring Computer Science from UBC.",
      account_ref: tutors[0]._id,
      createdAt: new Date("2021-07-04T10:03:23.308Z")
    },
    {
      availableDays: [false, false, false, false, false, true, true],
      school: "UBC",
      course: "ECON 311",
      wage: 20,
      contact: "604-999-8407",
      thumbUp: 1,
      thumbDown: 1,
      description: "Hi, my name is Franky, and I'm good at Economics.",
      account_ref: tutors[0]._id,
      createdAt: new Date("2021-07-03T10:03:23.308Z")
    },
    {
      availableDays: [false, true, false, true, false, false, false],
      school: "SFU",
      course: "CMPT 225",
      wage: 25,
      contact: "604-123-456",
      thumbUp: 0,
      thumbDown: 0,
      description: "I can teach CMPT 225.",
      account_ref: tutors[1]._id,
      createdAt: new Date("2021-07-02T10:03:23.308Z")
    },
    {
      availableDays: [false, true, false, true, false, false, false],
      school: "SFU",
      course: "BIOL 100",
      wage: 15,
      contact: "604-123-456",
      thumbUp: 0,
      thumbDown: 0,
      description: "I can teach BIOL 110.",
      account_ref: tutors[1]._id,
      createdAt: new Date("2021-07-01T10:03:23.308Z")
    },
  ])
}

const initializeComments = async function() {
  await Comment.collection.drop().catch((err) => {});
  const students = await Account.find({type: "student"});
  const posts = await Post.find({});
  await Comment.insertMany([
    {
      isThumbUp: true,
      description: "Franky is the best tutor for CPSC 455!!!!! Franky is the best tutor for CPSC 455!!!!! Franky is the best tutor for CPSC 455!!!!! Franky is the best tutor for CPSC 455!!!!! Franky is the best tutor for CPSC 455!!!!! Franky is the best tutor for CPSC 455!!!!!",
      account_ref: students[0]._id,
      post_ref: posts[0]._id,
      createdAt: new Date("2021-07-04T10:03:23.308Z")
    },
    {
      isThumbUp: false,
      description: "Franky is the worse tutor for CPSC 455!!!!! Franky is the worse tutor for CPSC 455!!!!! Franky is the worse tutor for CPSC 455!!!!! Franky is the worse tutor for CPSC 455!!!!! Franky is the worse tutor for CPSC 455!!!!!",
      account_ref: students[1]._id,
      post_ref: posts[0]._id,
      createdAt: new Date("2021-07-03T10:03:23.308Z")
    },
    {
      isThumbUp: true,
      description: "Franky is the best tutor for ECON 311!!!!!",
      account_ref: students[0]._id,
      post_ref: posts[1]._id,
      createdAt: new Date("2021-07-02T10:03:23.308Z")
    },
    {
      isThumbUp: false,
      description: "Franky is the worse tutor for ECON 311!!!!!",
      account_ref: students[1]._id,
      post_ref: posts[1]._id,
      createdAt: new Date("2021-07-01T10:03:23.308Z")
    },
  ])
}

module.exports = setupDatabase;
