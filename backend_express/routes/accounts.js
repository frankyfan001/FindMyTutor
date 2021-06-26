/* eslint-disable */
var express = require('express');
var router = express.Router();

/* Mock Database for accounts. */
const accounts = [
  {
    username: "frankyfan",
    password: "123456",
    type: "tutor",
    fname: "Franky",
    lname: "Fan",
    avatar: "https://www.zhifure.com/upload/images/2018/7/16143327546.jpg",
  },
  {
    username: "lisawatanabe",
    password: "123456",
    type: "student",
    fname: "Lisa",
    lname: "Watanabe",
    avatar: null,
  }
];

// TODO: Register a new account.
/* Register a new account. */
router.post('/register', function(req, res, next) {
  // input samples:
  const input = {
    username: "jerryliu",
    password: "liu",
    type: "tutor",
    fname: "Jerry",
    lname: "Liu",
  };
  // output samples:
  const output1 = {
    status: "SUCCESS",
    data: {
      username: "jerryliu",
      password: "123456",
      type: "tutor",
      fname: "Jerry",
      lname: "Liu",
      avatar: null,
    },
    err: null,
  };
  const output2 = {
    status: "FAIL",
    data: null,
    err: "Some error message.",
  };



  res.send(output1);
});

// TODO: Login an account.
/* Login an account. */
router.post('/login', function(req, res, next) {
  // input samples:
  const input = {
    username: "frankyfan",
    password: "123456",
  };
  // output samples:
  const output1 = {
    status: "SUCCESS",
    data: {
      username: "frankyfan",
      password: "123456",
      type: "tutor",
      fname: "Franky",
      lname: "Fan",
      avatar: "https://www.zhifure.com/upload/images/2018/7/16143327546.jpg",
    },
    err: null,
  };
  const output2 = {
    status: "FAIL",
    data: null,
    err: "Some error message.",
  };



  res.send(output1);
});

module.exports = router;
