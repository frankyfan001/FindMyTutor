/* eslint-disable */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// Connect to MongoDB.findMyTutor.
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/findMyTutor";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('MongoDB.findMyTutor is connected.');

    // Initialize MongoDB.findMyTutor.
    const initializeDatabase = require('./models/initializeDatabase');
    initializeDatabase();
    console.log('MongoDB.findMyTutor is initialized.')
  })
  .catch((err) => {
    console.log(err)
  });

// Routers
var indexRouter = require('./routes/index');
const accountsRouter = require('./routes/accounts');
var postsRouter = require('./routes/posts');
var commentsRouter = require('./routes/comments');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/accounts', accountsRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
