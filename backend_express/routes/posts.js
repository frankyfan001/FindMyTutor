/* eslint-disable */
var express = require('express');
var router = express.Router();
const Post = require('../models/post');

/* Get all posts with its account info. */
router.get('/', function(req, res, next) {
  const output = {
    success: true,
    result: [
      {
        _id: "60e2b19d8dcb2cb1c8208b3e",
        school: "UBC",
        course: "CPSC 455",
        wage: 30,
        thumbUp: 20,
        phone: "604-999-8407",
        email: "frankyfan003@gmail.com",
        description: "Hi, my name is Franky, majoring Computer Science from UBC.",
        account_ref: {
          _id: "60e2b19d8dcb2cb1c8208b37",
          type: "tutor",
          username: "frankyfan",
          password: "123456",
          fname: "Franky",
          lname: "Fan",
          avatar: "https://i.redd.it/biw2bktiuur41.jpg",
          __v: 0,
          createdAt: "2021-07-05T07:15:41.784Z",
          updatedAt: "2021-07-05T07:15:41.784Z"
        },
        __v: 0,
        createdAt: "2021-07-05T07:15:41.939Z",
        updatedAt: "2021-07-05T07:15:41.939Z"
      },
      {
        _id: "60e2b19d8dcb2cb1c8208b3f",
        school: "UBC",
        course: "ECON 311",
        wage: 20,
        thumbUp: 10,
        phone: "604-999-8407",
        email: "frankyfan@gmail.com",
        description: "Hi, my name is Franky, and I'm good at Economics.",
        account_ref: {
          _id: "60e2b19d8dcb2cb1c8208b37",
          type: "tutor",
          username: "frankyfan",
          password: "123456",
          fname: "Franky",
          lname: "Fan",
          avatar: "https://i.redd.it/biw2bktiuur41.jpg",
          __v: 0,
          createdAt: "2021-07-05T07:15:41.784Z",
          updatedAt: "2021-07-05T07:15:41.784Z"
        },
        __v: 0,
        createdAt: "2021-07-05T07:15:41.939Z",
        updatedAt: "2021-07-05T07:15:41.939Z"
      },
      {
        _id: "60e2b19d8dcb2cb1c8208b40",
        school: "SFU",
        course: "CMPT 225",
        wage: 25,
        thumbUp: 15,
        phone: "604-123-456",
        email: "brookxiao@gmail.com",
        description: "I can teach CMPT 225.",
        account_ref: {
          _id: "60e2b19d8dcb2cb1c8208b38",
          type: "tutor",
          username: "brookxiao",
          password: "123456",
          fname: "Brook",
          lname: "Xiao",
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_sWz-dVuWRkPuUbY9_660qV8YPKIjD8_PoQ&usqp=CAU",
          __v: 0,
          createdAt: "2021-07-05T07:15:41.785Z",
          updatedAt: "2021-07-05T07:15:41.785Z"
        },
        __v: 0,
        createdAt: "2021-07-05T07:15:41.939Z",
        updatedAt: "2021-07-05T07:15:41.939Z"
      },
      {
        _id: "60e2b19d8dcb2cb1c8208b41",
        school: "SFU",
        course: "BIOL 100",
        wage: 15,
        thumbUp: 5,
        phone: "604-123-456",
        email: "brookxiao@gmail.com",
        description: "I can teach BIOL 110.",
        account_ref: {
          _id: "60e2b19d8dcb2cb1c8208b38",
          type: "tutor",
          username: "brookxiao",
          password: "123456",
          fname: "Brook",
          lname: "Xiao",
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_sWz-dVuWRkPuUbY9_660qV8YPKIjD8_PoQ&usqp=CAU",
          __v: 0,
          createdAt: "2021-07-05T07:15:41.785Z",
          updatedAt: "2021-07-05T07:15:41.785Z"
        },
        __v: 0,
        createdAt: "2021-07-05T07:15:41.939Z",
        updatedAt: "2021-07-05T07:15:41.939Z"
      }
    ]
  };
  const output1 = {
    success: false,
    error: "Getting all posts failed."
  };
  ///////////////////////////// Above is examples of input and output /////////////////////////////

  Post.find({})
    .populate('account_ref')
    .sort({createdAt: -1})
    .exec()
    .then((result) => {
      res.send({
        success: true,
        result: result
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
