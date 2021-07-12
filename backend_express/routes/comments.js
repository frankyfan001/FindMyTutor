/* eslint-disable */
var express = require('express');
var router = express.Router();
const Comment = require('../models/comment');
const Account = require("../models/account");

/* Get a post's all comments with its account info. */
router.get('/:postId', function(req, res, next) {
  const output = {
    success: true,
    result: [
      {
        _id: "60ea81d322acfb2be0baac53",
        description: "Franky is the best tutor for CPSC 455!!!!!",
        isThumbUp: true,
        account_ref: {
          _id: "60ea81d322acfb2be0baac46",
          type: "student",
          username: "lisawatanabe",
          password: "123456",
          fname: "Lisa",
          lname: "Watanabe",
          avatar: "https://www.kozzi.com/wp-content/uploads/2020/11/Adorable-Golden-Retriever-puppy-isolated-on-white-background.jpg",
          __v: 0,
          createdAt: "2021-07-11T05:29:55.486Z",
          updatedAt: "2021-07-11T05:29:55.486Z"
        },
        post_ref: "60ea81d322acfb2be0baac4b",
        createdAt: "2021-07-04T10:03:23.308Z",
        __v: 0,
        updatedAt: "2021-07-11T05:29:55.848Z"
      },
      {
        _id: "60ea81d322acfb2be0baac54",
        description: "Franky is the worse tutor for CPSC 455!!!!!",
        isThumbUp: false,
        account_ref: {
          _id: "60ea81d322acfb2be0baac47",
          type: "student",
          username: "callyfan",
          password: "123456",
          fname: "Cally",
          lname: "Fan",
          avatar: "https://vetstreet.brightspotcdn.com/dims4/default/7eaec8d/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F67%2Fb51540a27c11e087a80050568d634f%2Ffile%2FAmerican-Shorthair-2-645mk062311.jpg",
          __v: 0,
          createdAt: "2021-07-11T05:29:55.486Z",
          updatedAt: "2021-07-11T05:29:55.486Z"
        },
        post_ref: "60ea81d322acfb2be0baac4b",
        createdAt: "2021-07-04T10:03:23.308Z",
        __v: 0,
        updatedAt: "2021-07-11T05:29:55.849Z"
      }
    ]
  };
  const output1 = {
    success: false,
    error: "Getting the comments of the post with id 60ea7f3423b3fe2ba4f7c67e failed.."
  };
  ///////////////////////////// Above is examples of input and output /////////////////////////////

  const postId = req.params.postId;

  Comment.find({post_ref: postId})
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
      res.send({
        success: false,
        error: `Getting the comments of the post with id ${postId} failed.`
      });
    });
});

/* Add a new comment. */
router.post('/', function(req, res, next) {
  const input = {
    isThumbUp: true,
    description: "Franky is a good tutor for CPSC 455.",
    account_ref: "60ec136eb96e314af2cca9f1",
    post_ref: "60ec136eb96e314af2cca9f6"
  }
  const output = {
    success: true,
    result: {
      _id: "60ec2617f271554d263b2166",
      isThumbUp: true,
      description: 'Franky is a good tutor.',
      account_ref: "60ec25f9f271554d263b2148",
      post_ref: "60ec25f9f271554d263b214d",
      createdAt: "2021-07-12T11:23:03.154Z",
      updatedAt: "2021-07-12T11:23:03.154Z",
      __v: 0
    }
  };
  const output1 = {
    success: false,
    error: "A student cannot add more than 3 comments on a single post."
  };
  ///////////////////////////// Above is examples of input and output /////////////////////////////

  const newComment = req.body;

  if (newComment.description === "") {
    res.send({
      success: false,
      error: `The description is required.`
    });
    return;
  }

  Account.findById(newComment.account_ref)
    .then((result) => {
      if (!result) {
        res.send({
          success: false,
          error: `The account with id ${newComment.account_ref} does not exist.`
        });
      } else if (result.type !== "student") {
        res.send({
          success: false,
          error: "Only an account of student type can add a comment on a post."
        });
      } else {
        Comment.find({post_ref: newComment.post_ref, account_ref: newComment.account_ref})
          .then((result) => {
            if (result.length >= 3) {
              res.send({
                success: false,
                error: "A student cannot add more than 3 comments on a single post."
              });
            } else {
              Comment.create(newComment)
                .then((result) => {
                  res.send({
                    success: true,
                    result: result
                  });
                })
            }
          })
      }
    })
    .catch((err) => {
      res.send({
        success: true,
        result: "Adding the comment failed."
      });
    });
});

module.exports = router;
