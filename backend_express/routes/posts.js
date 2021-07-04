/* eslint-disable */
var express = require('express');
var router = express.Router();

/* Mock Database for posts. */
const posts = [
  {
    id: 1,
    tutor: 'Super Oligei',
    date: "6/26/2021",
    description: 'best tutor ever',
    school: 'UBC',
    course: 'CPSC 455',
    price: '$5',
    thumbsUp: 1,
    thumbsDown: 0,
  },
  {
    id: 2,
    tutor: 'Bob',
    date: (new Date()).toLocaleDateString(),
    description: 'best tutor ever',
    school: 'SFU',
    course: 'CPSC 102',
    price: '$5',
    thumbsUp: 1,
    thumbsDown: 0,
  }
];

module.exports = router;
