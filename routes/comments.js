/* eslint-disable */
var express = require('express');
var router = express.Router();
const Comment = require('../models/comment');
const Account = require("../models/account");

/* Get a post's all comments with its account info. */
router.get('/:postId', function (req, res, next) {
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
router.post('/', function (req, res, next) {
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
        success: false,
        error: "Adding the comment failed."
      });
    });
});

module.exports = router;
