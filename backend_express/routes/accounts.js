/* eslint-disable */
var express = require('express');
var router = express.Router();
const Account = require('../models/account');

/* Register a new account. */
router.post('/register', function(req, res, next) {
  const newAccount = req.body;

  // TODO: respond with error message if any field of newAccount is invalid.
  let success = true;
  let error = "";
  if (newAccount.username.length < 6) {
    success = false;
    error = "Username must be greater than or equal to 6 characters."
  } else if (false) {

  }

  // Registration failed.
  if (!success) {
    res.send({
      success: success,
      error: error
    });
    return;
  }

  // Registration succeeded.
  Account.create(newAccount)
    .then((result) => {
      res.send({
        success: true,
        result: result
      });
    })
    .catch((err) => {
      console.log(err);
    });

  /////////////////////////////// Sample input and output ///////////////////////////////
  const input = {
    type: "tutor",
    username: "frankyfan",
    password: "123456",
    fname: "Franky",
    lname: "Fan",
    avatar: "https://i.redd.it/biw2bktiuur41.jpg"
  };
  const output = {
    success: true,
    result: {
      _id: "60e1090f824db57bc7fae1e3",
      type: "tutor",
      username: "frankyfan",
      password: "123456",
      fname: "Franky",
      lname: "Fan",
      avatar: "https://i.redd.it/biw2bktiuur41.jpg",
      createdAt: "2021-07-04T01:04:15.548Z",
      updatedAt: "2021-07-04T01:04:15.548Z",
      __v: 0
    }
  };
  const output1 = {
    success: false,
    error: "Username has already been registered."
  };
});

/* Login an account. */
router.post('/login', function(req, res, next) {
  const account = req.body;

  // Create a new account.
  Account.find(account)
    .then((result) => {
      res.send({
        success: true,
        result: result
      });
    })
    .catch((err) => {
      console.log(err);
    });

  /////////////////////////////// Sample input and output ///////////////////////////////
  const input = {
    username: "frankyfan",
    password: "123456"
  };
  const output = {
    success: true,
    result: {
      _id: "60e1090f824db57bc7fae1e3",
      type: "tutor",
      username: "frankyfan",
      password: "123456",
      fname: "Franky",
      lname: "Fan",
      avatar: "https://i.redd.it/biw2bktiuur41.jpg",
      createdAt: "2021-07-04T01:04:15.548Z",
      updatedAt: "2021-07-04T01:04:15.548Z",
      __v: 0
    }
  };
  const output1 = {
    success: false,
    error: "Unknown username."
  };
});

module.exports = router;
