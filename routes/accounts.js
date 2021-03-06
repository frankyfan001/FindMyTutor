/* eslint-disable */
var express = require('express');
var router = express.Router();
const Account = require('../models/account');

/* Register a new account. */
router.post('/register', function (req, res, next) {
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

  if (!newAccount.fname.match("^[a-zA-Z]+$") || newAccount.fname.length < 2) {
    res.send({
      success: false,
      error: "First Name must contains only letters with a length >= 2."
    });
    return;
  }

  if (!newAccount.lname.match("^[a-zA-Z]+$") || newAccount.lname.length < 2) {
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
    })
    .catch((err) => {
      res.send({
        success: false,
        error: err.message
      });
    });
});

/* Login an account. */
router.post('/login', function (req, res, next) {
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

  Account.findOne(account)
    .then((result) => {
      if (result) {
        // Login succeeded.
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
      res.send({
        success: false,
        error: err.message
      });
    });
});

/* Update an account. */
router.put('/:accountId', function (req, res, next) {
  const accountId = req.params.accountId;
  const updatedInfo = req.body;

  Account.findByIdAndUpdate(accountId, updatedInfo)
    .then((result) => {
      if (result) {
        res.send({
          success: true,
          result: result
        });
      } else {
        res.send({
          success: false,
          error: `Updating the account with id ${accountId} failed.`
        });
      }
    })
    .catch((err) => {
      res.send({
        success: false,
        error: `Updating the account with id ${accountId} failed.`
      });
    });
});

/* Get favorites of an account. */
router.get('/:accountId/favorites', function (req, res, next) {
  const accountId = req.params.accountId;

  Account.findById(accountId)
    .populate({
      path: 'favorites',
      model: 'Post',
      populate: {
        path: 'account_ref',
        model: 'Account'
      }
    })
    .exec()
    .then((account) => {
      res.send({
        success: true,
        result: account.favorites,
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        error: `Getting the favorites of the account with id ${accountId} failed.`
      });
    });
});

/* Add a favorite to an account. */
router.put('/:accountId/favorites/:postId', function (req, res, next) {
  const accountId = req.params.accountId;
  const postId = req.params.postId;

  Account.findById(accountId).then((account) => {
    if (!account.favorites) {
      account.favorites = [];
    }
    if (!account.favorites.includes(postId)) {
      account.favorites.push(postId);
    }
    Account.findByIdAndUpdate(accountId, {favorites: account.favorites})
      .then((result) => {
        if (result) {
          res.send({
            success: true,
            result: account.favorites
          });
        } else {
          res.send({
            success: false,
            error: `Adding favorites post ${postId} to account ${accountId} failed.`
          });
        }
      })
      .catch((err) => {
        res.send({
          success: false,
          error: `Adding favorites post ${postId} to account ${accountId} failed.`
        });
      });
  }).catch((err) => {
    res.send({
      success: false,
      error: `Adding favorites post ${postId} to account ${accountId} failed.`
    });
  })
});

/* Remove a favorite from an account. */
router.delete('/:accountId/favorites/:postId', function (req, res, next) {
  const accountId = req.params.accountId;
  const postId = req.params.postId;

  Account.findById(accountId).then((account) => {
    if (!account.favorites) {
      account.favorites = [];
    }
    if (account.favorites.includes(postId)) {
      account.favorites = account.favorites.filter((id) => id != postId);
    }
    Account.findByIdAndUpdate(accountId, {favorites: account.favorites})
      .then((result) => {
        if (result) {
          res.send({
            success: true,
            result: account.favorites
          });
        } else {
          res.send({
            success: false,
            error: `Deleting favorites post ${postId} to account ${accountId} failed.`
          });
        }
      })
      .catch((err) => {
        res.send({
          success: false,
          error: `Deleting favorites post ${postId} to account ${accountId} failed.`
        });
      });
  }).catch((err) => {
    res.send({
      success: false,
      error: `Deleting favorites post ${postId} to account ${accountId} failed.`
    });
  })
});

module.exports = router;
