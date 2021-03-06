/* eslint-disable */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// Setup MongoDB.findMyTutor.
const setupDatabase = require('./models/setupDatabase');
setupDatabase().then();

// Routers
const accountsRouter = require('./routes/accounts');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Serve routes for backend.
app.use('/accounts', accountsRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

// Add middlewares for frontend.
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
