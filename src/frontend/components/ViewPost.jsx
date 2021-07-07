/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Chip,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import queryString from 'query-string';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import {
  Bookmark, Email, Phone, SchoolOutlined, ThumbDown,
} from '@material-ui/icons';
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
  console.log('handling rating');
  const handleClick = (e) => {
    const name = e.currentTarget.id;
    console.log('handling click');
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
const usePostStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));
export const Post1 = () => {
  const classes = usePostStyles();

  return (
    <Grid container>
      <Grid item style={{ width: '100%' }}>
        <Grid container spacing={3} direction="row" justify="space-evenly" alignItems="center">
          <Grid item xs={4}>
            <Grid container direction="column" alignItems="center">
              <Grid item xs style={{ width: '80%', height: '80%' }}>
                <Paper>
                  <CardMedia image="https://api.jikipedia.com/upload/9eeb4f813648581bb4ae179643065ca9_75.jpg" className={classes.media} />
                </Paper>
              </Grid>
              <Grid item xs>
                user name
              </Grid>
              <Grid item xs>
                {new Date().toLocaleDateString()}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item>
                    <Typography>Available Days: </Typography>
                  </Grid>
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <Grid item>
                      <Chip
                        label={day}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justify="space-evenly">
                  <Grid item>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Chip color="secondary" icon={<SchoolOutlined />} label="School" />
                        {/* School */}
                      </Grid>
                      <Grid item>
                        <Chip color="secondary" icon={<Bookmark />} label="Course" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Chip color="secondary" icon={<AttachMoneyIcon />} label="Wage" />
                      </Grid>
                      <Grid item>
                        <Chip color="secondary" icon={<ThumbUpIcon />} label="ThumbsUp" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Chip color="secondary" icon={<Phone />} label="Phone" />
                      </Grid>
                      <Grid item>
                        <Chip color="secondary" icon={<Email />} label="Email" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{ width: '100%', height: '100%' }}>
                <Paper>
                  <Typography>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ width: '100%' }}>
        <CommentList comments={mockPost.comments} />
      </Grid>
    </Grid>
  );
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

  const { updateComment } = useComments(post.comments);
  // useEffect(() => {
  //   setPost(getPost(id));
  // }, []);

  console.log(post);
  const { handleClick: handlePostRatingClick } = useRating(updatePost, post);
  const { handleCommentRatingClick } = useRating(updateComment, post.comments);
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
              <RatingArea up={post.thumbsUp} down={post.thumbsDown} handleClick={handlePostRatingClick} />
            </Grid>
            <Grid item style={{ width: '100%' }}>
              <CommentList comments={post.comments} isLogin={accountHook.isLogin()} handleClick={handleCommentRatingClick} />
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

const CommentList = ({ comments, isLogin, handleClick }) => {
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
            <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
              <Button variant="contained" color="primary">
                Add new comment
              </Button>
            </Link>
          )}

        <FormDialog dialogHooks={dialogHooks} />
      </Grid>
      <Grid item className={classes.root}>
        <Grid container alignItems="stretch">
          {comments.map((comment, idx) => (
            <Grid item key={idx.toString()} xs={12} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <Comment comment={comment} handleClick={handleClick} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

const Comment = ({ comment, handleClick }) => (
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
