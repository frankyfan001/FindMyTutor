/* eslint-disable */
var express = require('express');
var router = express.Router();
const Account = require('../models/account');

/* Register a new account. */
router.post('/register', function(req, res, next) {
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
  ///////////////////////////// Above is examples of input and output /////////////////////////////

  const newAccount = req.body;

  // Registration failed.
  if (!newAccount.username.match("^[a-z0-9A-Z]+$") || newAccount.username.length < 6) {
    res.send({
      success: false,
      error: "Username must contains only letters/digits with a length >= 6."
    });
    return;
  }

  if (!newAccount.password.match("^[a-z0-9A-Z]+$") || newAccount.password.length < 6) {
    res.send({
      success: false,
      error: "Password must contains only letters/digits with a length >= 6."
    });
    return;
  }

  if (!newAccount.fname.match("^[a-zA-Z]+$") || newAccount.fname.length < 3) {
    res.send({
      success: false,
      error: "First Name must contains only letters with a length >= 2."
    });
    return;
  }

  if (!newAccount.lname.match("^[a-zA-Z]+$") || newAccount.lname.length < 3) {
    res.send({
      success: false,
      error: "Last Name must contains only letters with a length >= 2."
    });
    return;
  }

  Account.findOne({username: newAccount.username})
    .then((result) => {
      if (result) {
        res.send({
          success: false,
          error: "Username has already been registered."
        });
      } else {
        // Registration succeeded.
        Account.create(newAccount).then((result) => {
          res.send({
            success: true,
            result: result
          });
        })
      }
    }).catch((err) => {
      console.log(err);
    });
});

/* Login an account. */
router.post('/login', function(req, res, next) {
  const input = {
    type: "tutor",
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
    error: "Username/Password is incorrect as a tutor."
  };
  ///////////////////////////// Above is examples of input and output /////////////////////////////

  const account = req.body;

  // Login failed.
  if (!account.username.match("^[a-z0-9A-Z]+$") || account.username.length < 6) {
    res.send({
      success: false,
      error: "Username must contains only letters/digits with a length >= 6."
    });
    return;
  }

  if (!account.password.match("^[a-z0-9A-Z]+$") || account.password.length < 6) {
    res.send({
      success: false,
      error: "Password must contains only letters/digits with a length >= 6."
    });
    return;
  }

  // Login succeeded.
  Account.findOne(account)
    .then((result) => {
      if (result) {
        res.send({
          success: true,
          result: result
        });
      } else {
        res.send({
          success: false,
          error: `Username/Password is incorrect as a ${account.type}.`
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
