/* eslint-disable */
var express = require('express');
var router = express.Router();
const Post = require('../models/post');
const Account = require("../models/account");
const { ObjectId } = require("bson");

/* Get all posts with its account info. */
router.get('/', function (req, res, next) {
  let tutorId = req.query.tutorId;

  if (tutorId) {
    Post.find({ account_ref: new ObjectId(tutorId) })
      .populate('account_ref')
      .sort({ createdAt: -1 })
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
          error: "Getting all posts failed."
        });
      });
  } else {
    Post.find({}).populate('account_ref')
      .sort({ createdAt: -1 })
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
          error: "Getting all posts failed."
        });
      });
  }
});

/* Add a post. */
router.post('/', function (req, res, next) {
  const newPost = { ...req.body, thumbUp: 0, thumbDown: 0 };

  if (newPost.availableDays.filter(day => day === true).length === 0) {
    res.send({
      success: false,
      error: "At lease one available day is required."
    });
    return;
  }

  if (!Number.isInteger(newPost.wage) || newPost.wage >= 1000) {
    res.send({
      success: false,
      error: "Wage has to be an integer < 1000."
    });
    return;
  }

  Account.findById(newPost.account_ref)
    .then((result) => {
      if (!result) {
        res.send({
          success: false,
          error: `Adding the post failed because the account with id ${newPost.account_ref} does not exists.`
        });
      } else if (result.type !== "tutor") {
        res.send({
          success: false,
          error: "Adding a post requires a tutor login."
        });
      } else {
        Post.create(newPost)
          .then((result) => {
            res.send({
              success: true,
              result: result
            });
          })
      }
    })
    .catch((err) => {
      res.send({
        success: false,
        error: "Adding the post failed."
      });
    });
});

/* Get a post with its account info. */
router.get('/:postId', function (req, res, next) {
  const postId = req.params.postId;

  Post.findById(postId)
    .populate('account_ref')
    .exec()
    .then((result) => {

      if (result) {
        res.send({
          success: true,
          result: result
        });
      } else {
        res.send({
          success: false,
          error: `Getting the post with id ${postId} failed.`
        });
      }

    })
    .catch((err) => {
      res.send({
        success: false,
        error: `Getting the post with id ${postId} failed.`
      });
    });
});

/* Update a post. */
router.put('/:postId', function (req, res, next) {
  const postId = req.params.postId;
  const updatedInfo = req.body;

  Post.findByIdAndUpdate(postId, updatedInfo)
    .then((result) => {
      if (result) {
        res.send({
          success: true,
          result: result
        });
      } else {
        res.send({
          success: false,
          error: `Updating the post with id ${postId} failed.`
        });
      }
    })
    .catch((err) => {
      res.send({
        success: false,
        error: `Updating the post with id ${postId} failed.`
      });
    });
});

/* Delete a post. */
router.delete('/:postId', function (req, res, next) {
  const postId = req.params.postId;

  Post.findByIdAndRemove(postId)
    .then((result) => {
      res.send({
        success: true,
        result: result
      });
    })
    .catch(err => {
      res.send({
        success: false,
        error: `Deleting the post with id ${postId} failed.`
      })
    })
});

/* Query posts by a filter. */
router.post('/filter', function (req, res, next) {
  const filter = req.body;
  let filterKey = filter.filterKey;
  const filterValue = filter.filterValue;

  if (filterKey === "thumbup") {
    Post.find({ thumbUp: { $gte: filterValue } }).populate('account_ref').exec().then((result) => {
      if (result) {
        res.send({
          success: true,
          result: result
        });
      } else {
        res.send({
          success: false,
          error: `Fail to filter the posts with ${filterkey} : ${filterValue}.`
        });
      }
    }).catch((err) => {
      res.send({
        success: false,
        error: `Fail to filter the posts with ${filterkey} : ${filterValue}.`
      });
    })
  } else if (filterKey === "tutor") {
    Post.find().populate('account_ref').exec().then((result) => {
      if (result) {
        const filteredResult = result.filter((post) => {
          return post.account_ref.username.includes(filterValue);
        });
        res.send({
          success: true,
          result: filteredResult
        });
      } else {
        res.send({
          success: false,
          error: `Fail to filter the posts with ${filterkey} : ${filterValue}.`,
        });
      }
    })
  } else {
    let query = {};

    query[filterKey] = {
      "$regex": filterValue,
      "$options": "i"
    };
    Post.find(query).populate('account_ref').exec().then((result) => {
      if (result) {
        res.send({
          success: true,
          result: result
        });
      } else {
        res.send({
          success: false,
          error: `Fail to filter the posts with ${filterkey} : ${filterValue}.`
        });
      }
    }).catch((err) => {
      res.send({
        success: false,
        error: `Fail to filter the posts with ${filterkey} : ${filterValue}.`
      });
    });
  }
});

module.exports = router;
