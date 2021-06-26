/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import queryString from 'query-string';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { ThumbDown } from '@material-ui/icons';
import { mockPost } from './mocks/mockPost';
import FormDialog from './CommentForm';
import usePosts from '../hooks/usePosts';
import useComments from '../hooks/useComment';
import usePost from '../hooks/usePost';

const useRootStyle = makeStyles(() => ({
  root: {
    maxWidth: '80%',
  },
}));

const useRating = (updateFunc, updateObject) => {
  const [isCancel, setCancel] = useState(false);
  const handleClick = (e) => {
    const name = e.currentTarget.id;
    console.log(updateObject[name]);
    const rate = isCancel ? updateObject[name] - 1 : updateObject[name] + 1;
    console.log(rate);
    const newObject = {
      ...updateObject,
      [name]: rate,
    };
    console.log(newObject);
    setCancel(!isCancel);
    updateFunc(newObject);
  };

  return { handleClick, isCancel };
};
export const Post = ({ accountHook }) => {
  const classes = useRootStyle();
  // const [post, setSinglePost] = useState(mockPost);

  const params = queryString.parse(useLocation().search);
  const { id } = params;
  // const { getSinglePost, updatePost } = usePosts();

  const {
    post, setPost, getPost, updatePost,
  } = usePost();
  // useEffect(() => {
  //   setPost(getPost(id));
  // }, []);

  console.log(post);
  const { handleClick } = useRating(updatePost, post);
  return (
    <>
      <CssBaseline />
      <Paper variant="outlined" className={classes.root}>
        <Container>
          <Grid container spacing={5} alignContent="center">
            <Grid item>
              <Grid container spacing={5} alignContent="center" direction="row">
                <Grid item>
                  <PostInfo profile={post.profile} content={mockPost.content} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <RatingArea up={post.thumbsUp} down={post.thumbsDown} handleClick={handleClick} />
            </Grid>
            <Grid item style={{ width: '100%' }}>
              <CommentList comments={post.comments} isLogin={accountHook.isLogin} />
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
};

const useStyles = makeStyles(() => ({
  media: {
    paddingTop: '56.29%',
  },
  root: {
    height: '100%',
    width: '100%',
  },
}));

const Profile = ({ profile }) => {
  const classes = useStyles();
  return (
    <Grid container alignItems="space-around" className={classes.root}>
      <Paper variant="outlined" style={{ width: '100%' }}>
        <Grid item xs={6} className={classes.root}>
          <CardMedia className={classes.media} image={profile.img} title="profile img" />
        </Grid>
        <Grid item xs={6}>
          <Typography variat="body2" color="textSecondary" component="p">
            {profile.name}
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

const PostContent = ({ content }) => (
  <Paper variant="outlined">
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item md={9}>
        <Box pt={3} pr={3} pl={3} pb={2}>
          <Typography variant="h6">{content.title}</Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box pt={2}>{content.text}</Box>
      </Grid>
    </Grid>
  </Paper>
);

const PostInfo = ({ profile, content }) => (
  <Grid container alignItems="stretch" direction="row">
    <Grid item xs={12} ssm={6}>
      <Profile profile={profile} />
    </Grid>
    <Grid item xs={12} sm={6}>
      <PostContent content={content} />
    </Grid>
  </Grid>
);

const useDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [width, setWidth] = React.useState((window.innerHeight * 0.8));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleResize = () => setWidth((window.innerHeight * 0.8));

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    open, handleClickOpen, handleClose, width,
  };
};

const CommentList = ({ comments, isLogin }) => {
  const classes = useStyles();
  const dialogHooks = useDialog();
  return (
    <Grid container alignItems="flex-end" direction="column" spacing={5}>
      <Grid item>
        {isLogin
          ? (
            <Button variant="contained" color="primary" onClick={dialogHooks.handleClickOpen}>
              Add new comment
            </Button>
          )
          : (
            <Button variant="contained" color="primary" component={<Link to="/" />}>
              Add new comment
            </Button>
          )}

        <FormDialog dialogHooks={dialogHooks} />
      </Grid>
      <Grid item className={classes.root}>
        <Grid container alignItems="stretch">
          {comments.map((comment, idx) => (
            <Grid item key={idx.toString()} xs={12} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <Comment comment={comment} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

const Comment = ({ comment }) => {
  const { updateComment } = useComments();
  console.log(comment);
  const { handleClick } = useRating(updateComment, comment);
  return (
    <Grid container wrap="nowrap" spacing={2} xs={12} alignContent="space-between">
      <Grid item xs={1}>
        <Avatar alt={comment.user.name} src={comment.user.img} />
      </Grid>
      <Grid item xs={12}>
        <h4 style={{ margin: 0, textAlign: 'left' }}>
          {comment.user.name}
        </h4>
        <Typography style={{ textAlign: 'left' }}>
          {comment.content}
        </Typography>
        <p style={{ textAlign: 'left', color: 'grey' }}>
          posted at
          {' '}
          {new Date().toLocaleDateString()}
        </p>
      </Grid>
      <Grid item align="right" justify="space-between" xs={3}>
        <RatingArea up={comment.thumbsUp} down={comment.thumbsDown} handleClick={handleClick} />
      </Grid>
    </Grid>
  );
};

const useRatingStyles = ((theme) => ({
  hover: {
    '&:hover': {
      backgroundColor: 'blue',
    },
  },
}));
const RatingArea = ({ up, down, handleClick }) => {
  const classes = useRatingStyles();
  return (
    <Grid container direction="row" spacing={3}>
      <Grid item className={classes.hover}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<ThumbUpIcon />}
          onClick={handleClick}
          id="thumbsUp"
        >
          {up}
        </Button>
      </Grid>
      <Grid item className={classes.hover}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<ThumbDown />}
          id="thumbsDown"
          onClick={handleClick}
        >
          {down}
        </Button>
      </Grid>

    </Grid>
  );
};
